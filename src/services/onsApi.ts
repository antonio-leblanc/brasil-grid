import { useState, useEffect, useCallback } from 'react';
import { referenceGridSnapshot } from '../data/gridData';

export type SubsystemCode = 'SECO' | 'S' | 'NE' | 'N';

export interface OnsRawRecord {
  cod_areacarga: string;
  dat_referencia: string;
  din_referenciautc: string;
  val_cargaglobal: number;
  val_cargasupervisionada?: number;
  val_cargammgd?: number;
  val_carganaosupervisionada?: number;
  din_atualizacao?: string;
}

export interface CurvePoint {
  timestampUtc: string;
  timeLabel: string; // "HH:MM" no horário de Brasília (UTC-3)
  totalLoadMW: number;
  scadaLoadMW: number;
  solarMmgdMW: number;
}

export interface SubsystemTelemetry {
  code: SubsystemCode;
  key: 'SE_CO' | 'S' | 'NE' | 'N';
  name: string;
  shortName: string;
  currentLoadMW: number;
  scadaLoadMW: number;
  solarMmgdMW: number;
  peakLoadMW: number;
  peakTime: string;
  minLoadMW: number;
  minTime: string;
  points: CurvePoint[];
}

export interface NationalTelemetrySnapshot {
  source: 'ONS_LIVE' | 'REF_SNAPSHOT';
  fetchedAt: string; // ISO string
  referenceDate: string; // "YYYY-MM-DD"
  latestTimestampUtc: string;
  latestTimeLabel: string; // "HH:MM" (Brasília)
  currentSinLoadMW: number;
  peakSinLoadMW: number;
  peakSinTime: string;
  minSinLoadMW: number;
  minSinTime: string;
  currentSolarMmgdMW: number;
  peakSolarMmgdMW: number;
  peakSolarTime: string;
  subsystems: {
    SE_CO: SubsystemTelemetry;
    S: SubsystemTelemetry;
    NE: SubsystemTelemetry;
    N: SubsystemTelemetry;
  };
  sinCurve: CurvePoint[];
}

export interface UseOnsTelemetryReturn {
  telemetry: NationalTelemetrySnapshot;
  isLoading: boolean;
  isLive: boolean;
  lastUpdated: string | null;
  error: string | null;
  refresh: () => Promise<void>;
}

const CACHE_STORAGE_KEY = 'brasil_grid_ons_telemetry_cache_v1';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutos

const SUBSYSTEMS_META: { code: SubsystemCode; key: 'SE_CO' | 'S' | 'NE' | 'N'; name: string; shortName: string; shareRatio: number }[] = [
  { code: 'SECO', key: 'SE_CO', name: 'Sudeste / Centro-Oeste', shortName: 'SE/CO', shareRatio: 0.584 },
  { code: 'S', key: 'S', name: 'Sul', shortName: 'S', shareRatio: 0.172 },
  { code: 'NE', key: 'NE', name: 'Nordeste', shortName: 'NE', shareRatio: 0.168 },
  { code: 'N', key: 'N', name: 'Norte', shortName: 'N', shareRatio: 0.076 }
];

/**
 * Retorna a data no fuso horário oficial de Brasília (America/Sao_Paulo) no formato YYYY-MM-DD.
 * Evita o bug de virada de dia às 21h BRT (00h UTC), quando toISOString() gerava a data de amanhã.
 */
export function getBrasiliaDateStr(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(date);
}

/**
 * Constrói um snapshot de fallback técnico baseado no referenceGridSnapshot.
 * Usado se a API do ONS estiver inacessível, com CORS bloqueado ou usuário offline.
 */
export function createFallbackSnapshot(): NationalTelemetrySnapshot {
  const baseLoad = referenceGridSnapshot.instantaneousLoadMW;
  const now = new Date();
  const dateStr = getBrasiliaDateStr(now);

  // Gera uma curva diária de referência sintética de 48 pontos semi-horários
  const sinCurve: CurvePoint[] = [];
  const subCurves: Record<'SE_CO' | 'S' | 'NE' | 'N', CurvePoint[]> = {
    SE_CO: [],
    S: [],
    NE: [],
    N: []
  };

  for (let i = 0; i < 48; i++) {
    const totalMinutes = i * 30;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const timeLabel = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    // Perfil típico do SIN: vale de madrugada (~0.72x), pico no início da noite (~1.12x)
    const factor = 0.72 + 0.40 * Math.sin(((hour - 4) / 24) * 2 * Math.PI);
    const pointTotal = Math.round(baseLoad * Math.max(0.70, Math.min(1.15, factor)));

    // Perfil solar de telhado (MMGD): pico entre 11h e 14h
    let solarFactor = 0;
    if (hour >= 6 && hour <= 18) {
      solarFactor = Math.sin(((hour - 6) / 12) * Math.PI);
    }
    const pointSolar = Math.round(22000 * Math.max(0, solarFactor));
    const pointScada = pointTotal - pointSolar;

    sinCurve.push({
      timestampUtc: `${dateStr}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00.000Z`,
      timeLabel,
      totalLoadMW: pointTotal,
      scadaLoadMW: pointScada,
      solarMmgdMW: pointSolar
    });

    SUBSYSTEMS_META.forEach(sub => {
      subCurves[sub.key].push({
        timestampUtc: `${dateStr}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00.000Z`,
        timeLabel,
        totalLoadMW: Math.round(pointTotal * sub.shareRatio),
        scadaLoadMW: Math.round(pointScada * sub.shareRatio),
        solarMmgdMW: Math.round(pointSolar * sub.shareRatio)
      });
    });
  }

  const latestIndex = 28; // ~14h referência
  const latestPoint = sinCurve[latestIndex];

  function buildSubFallback(subKey: 'SE_CO' | 'S' | 'NE' | 'N'): SubsystemTelemetry {
    const meta = SUBSYSTEMS_META.find(m => m.key === subKey)!;
    const points = subCurves[subKey];
    const peak = points.reduce((m, p) => p.totalLoadMW > m.totalLoadMW ? p : m, points[0]);
    const min = points.reduce((m, p) => p.totalLoadMW < m.totalLoadMW ? p : m, points[0]);
    return {
      code: meta.code,
      key: meta.key,
      name: meta.name,
      shortName: meta.shortName,
      currentLoadMW: points[latestIndex].totalLoadMW,
      scadaLoadMW: points[latestIndex].scadaLoadMW,
      solarMmgdMW: points[latestIndex].solarMmgdMW,
      peakLoadMW: peak.totalLoadMW,
      peakTime: peak.timeLabel,
      minLoadMW: min.totalLoadMW,
      minTime: min.timeLabel,
      points
    };
  }

  return {
    source: 'REF_SNAPSHOT',
    fetchedAt: new Date().toISOString(),
    referenceDate: dateStr,
    latestTimestampUtc: latestPoint.timestampUtc,
    latestTimeLabel: latestPoint.timeLabel,
    currentSinLoadMW: latestPoint.totalLoadMW,
    peakSinLoadMW: Math.round(baseLoad * 1.12),
    peakSinTime: '19:00',
    minSinLoadMW: Math.round(baseLoad * 0.72),
    minSinTime: '04:00',
    currentSolarMmgdMW: latestPoint.solarMmgdMW,
    peakSolarMmgdMW: 22000,
    peakSolarTime: '12:30',
    subsystems: {
      SE_CO: buildSubFallback('SE_CO'),
      S: buildSubFallback('S'),
      NE: buildSubFallback('NE'),
      N: buildSubFallback('N')
    },
    sinCurve
  };
}

/**
 * Consulta a API de Carga Verificada do ONS para os 4 subsistemas em paralelo.
 */
async function fetchSubsystemsForDate(targetDate: string): Promise<Record<SubsystemCode, OnsRawRecord[]>> {
  const results: Partial<Record<SubsystemCode, OnsRawRecord[]>> = {};

  await Promise.all(
    SUBSYSTEMS_META.map(async (sub) => {
      const url = `https://apicarga.ons.org.br/prd/cargaverificada?dat_inicio=${targetDate}&dat_fim=${targetDate}&cod_areacarga=${sub.code}`;
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(9000)
      });
      if (!res.ok) {
        throw new Error(`ONS API retornou status ${res.status} para subsistema ${sub.code}`);
      }
      const data = await res.json();
      results[sub.code] = Array.isArray(data) ? data : [];
    })
  );

  return results as Record<SubsystemCode, OnsRawRecord[]>;
}

/**
 * Processa as séries dos 4 subsistemas calculando a curva nacional e os indicadores vitais.
 */
function parseOnsTelemetryData(
  rawData: Record<SubsystemCode, OnsRawRecord[]>,
  referenceDate: string
): NationalTelemetrySnapshot {
  const secoList = rawData['SECO'] || [];
  const sList = rawData['S'] || [];
  const neList = rawData['NE'] || [];
  const nList = rawData['N'] || [];

  const sinCurve: CurvePoint[] = [];
  const subCurves: Record<'SE_CO' | 'S' | 'NE' | 'N', CurvePoint[]> = {
    SE_CO: [],
    S: [],
    NE: [],
    N: []
  };

  for (let i = 0; i < secoList.length; i++) {
    const pSE = secoList[i];
    const pS = sList[i];
    const pNE = neList[i];
    const pN = nList[i];

    if (!pSE || pSE.val_cargaglobal <= 0) continue;

    const dUtc = new Date(pSE.din_referenciautc);
    // Converte para fuso de Brasília (UTC - 3)
    const brtHours = (dUtc.getUTCHours() - 3 + 24) % 24;
    const brtMins = dUtc.getUTCMinutes().toString().padStart(2, '0');
    const timeLabel = `${brtHours.toString().padStart(2, '0')}:${brtMins}`;

    const seLoad = pSE.val_cargaglobal;
    const sLoad = pS?.val_cargaglobal || 0;
    const neLoad = pNE?.val_cargaglobal || 0;
    const nLoad = pN?.val_cargaglobal || 0;

    const seScada = pSE.val_cargasupervisionada ?? seLoad;
    const sScada = pS?.val_cargasupervisionada ?? sLoad;
    const neScada = pNE?.val_cargasupervisionada ?? neLoad;
    const nScada = pN?.val_cargasupervisionada ?? nLoad;

    const seMmgd = pSE.val_cargammgd ?? 0;
    const sMmgd = pS?.val_cargammgd ?? 0;
    const neMmgd = pNE?.val_cargammgd ?? 0;
    const nMmgd = pN?.val_cargammgd ?? 0;

    const totalSin = seLoad + sLoad + neLoad + nLoad;
    const totalScada = seScada + sScada + neScada + nScada;
    const totalMmgd = seMmgd + sMmgd + neMmgd + nMmgd;

    sinCurve.push({
      timestampUtc: pSE.din_referenciautc,
      timeLabel,
      totalLoadMW: Math.round(totalSin),
      scadaLoadMW: Math.round(totalScada),
      solarMmgdMW: Math.round(totalMmgd)
    });

    subCurves.SE_CO.push({ timestampUtc: pSE.din_referenciautc, timeLabel, totalLoadMW: Math.round(seLoad), scadaLoadMW: Math.round(seScada), solarMmgdMW: Math.round(seMmgd) });
    subCurves.S.push({ timestampUtc: pS?.din_referenciautc || pSE.din_referenciautc, timeLabel, totalLoadMW: Math.round(sLoad), scadaLoadMW: Math.round(sScada), solarMmgdMW: Math.round(sMmgd) });
    subCurves.NE.push({ timestampUtc: pNE?.din_referenciautc || pSE.din_referenciautc, timeLabel, totalLoadMW: Math.round(neLoad), scadaLoadMW: Math.round(neScada), solarMmgdMW: Math.round(neMmgd) });
    subCurves.N.push({ timestampUtc: pN?.din_referenciautc || pSE.din_referenciautc, timeLabel, totalLoadMW: Math.round(nLoad), scadaLoadMW: Math.round(nScada), solarMmgdMW: Math.round(nMmgd) });
  }

  if (sinCurve.length === 0) {
    return createFallbackSnapshot();
  }

  const latestSin = sinCurve[sinCurve.length - 1];
  const peakSin = sinCurve.reduce((max, p) => p.totalLoadMW > max.totalLoadMW ? p : max, sinCurve[0]);
  const minSin = sinCurve.reduce((min, p) => p.totalLoadMW < min.totalLoadMW ? p : min, sinCurve[0]);
  const peakSolar = sinCurve.reduce((max, p) => p.solarMmgdMW > max.solarMmgdMW ? p : max, sinCurve[0]);

  function buildSubTelemetry(subKey: 'SE_CO' | 'S' | 'NE' | 'N'): SubsystemTelemetry {
    const meta = SUBSYSTEMS_META.find(m => m.key === subKey)!;
    const points = subCurves[subKey];
    if (points.length === 0) {
      return createFallbackSnapshot().subsystems[subKey];
    }
    const latest = points[points.length - 1];
    const peak = points.reduce((m, p) => p.totalLoadMW > m.totalLoadMW ? p : m, points[0]);
    const min = points.reduce((m, p) => p.totalLoadMW < m.totalLoadMW ? p : m, points[0]);
    return {
      code: meta.code,
      key: meta.key,
      name: meta.name,
      shortName: meta.shortName,
      currentLoadMW: latest.totalLoadMW,
      scadaLoadMW: latest.scadaLoadMW,
      solarMmgdMW: latest.solarMmgdMW,
      peakLoadMW: peak.totalLoadMW,
      peakTime: peak.timeLabel,
      minLoadMW: min.totalLoadMW,
      minTime: min.timeLabel,
      points
    };
  }

  return {
    source: 'ONS_LIVE',
    fetchedAt: new Date().toISOString(),
    referenceDate,
    latestTimestampUtc: latestSin.timestampUtc,
    latestTimeLabel: latestSin.timeLabel,
    currentSinLoadMW: latestSin.totalLoadMW,
    peakSinLoadMW: peakSin.totalLoadMW,
    peakSinTime: peakSin.timeLabel,
    minSinLoadMW: minSin.totalLoadMW,
    minSinTime: minSin.timeLabel,
    currentSolarMmgdMW: latestSin.solarMmgdMW,
    peakSolarMmgdMW: peakSolar.solarMmgdMW,
    peakSolarTime: peakSolar.timeLabel,
    subsystems: {
      SE_CO: buildSubTelemetry('SE_CO'),
      S: buildSubTelemetry('S'),
      NE: buildSubTelemetry('NE'),
      N: buildSubTelemetry('N')
    },
    sinCurve
  };
}

/**
 * Busca a telemetria do ONS com lógica de cache em localStorage e fallback automático.
 */
export async function fetchOnsTelemetry(forceRefresh = false): Promise<NationalTelemetrySnapshot> {
  // 1. Tentar ler cache local se não for forceRefresh
  if (typeof window !== 'undefined' && !forceRefresh) {
    try {
      const rawCache = localStorage.getItem(CACHE_STORAGE_KEY);
      if (rawCache) {
        const parsed = JSON.parse(rawCache);
        const age = Date.now() - new Date(parsed.fetchedAt).getTime();
        if (age < CACHE_TTL_MS && parsed.telemetry && parsed.telemetry.source === 'ONS_LIVE') {
          return parsed.telemetry as NationalTelemetrySnapshot;
        }
      }
    } catch {
      // Ignora erro de parse de cache
    }
  }

  // 2. Determinar datas alvo no fuso de Brasília (hoje e ontem como fallback de transição noturna)
  const now = new Date();
  const todayStr = getBrasiliaDateStr(now);
  const yesterdayStr = getBrasiliaDateStr(new Date(now.getTime() - 24 * 60 * 60 * 1000));

  try {
    let dateUsed = todayStr;
    let rawData = await fetchSubsystemsForDate(todayStr);

    // Se hoje ainda tiver menos de 4 pontos apurados (madrugada inicial), tenta ontem
    const validPoints = (rawData.SECO || []).filter(r => r.val_cargaglobal > 0).length;
    if (validPoints < 4) {
      dateUsed = yesterdayStr;
      rawData = await fetchSubsystemsForDate(yesterdayStr);
    }

    const snapshot = parseOnsTelemetryData(rawData, dateUsed);

    // 3. Salva no cache local
    if (typeof window !== 'undefined' && snapshot.source === 'ONS_LIVE') {
      try {
        localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify({
          fetchedAt: snapshot.fetchedAt,
          telemetry: snapshot
        }));
      } catch {
        // Ignora erro de quota no localStorage
      }
    }

    return snapshot;
  } catch {
    // 4. Fallback resiliente: tenta recuperar cache antigo ou gera snapshot de referência técnica
    if (typeof window !== 'undefined') {
      try {
        const rawCache = localStorage.getItem(CACHE_STORAGE_KEY);
        if (rawCache) {
          const parsed = JSON.parse(rawCache);
          if (parsed.telemetry) return parsed.telemetry;
        }
      } catch {
        // falha silenciosa
      }
    }

    return createFallbackSnapshot();
  }
}

/**
 * Hook React para consumir telemetria viva do ONS com estado reativo e auto-atualização periódica.
 */
export function useOnsTelemetry(): UseOnsTelemetryReturn {
  const [telemetry, setTelemetry] = useState<NationalTelemetrySnapshot>(() => {
    // Inicialização síncrona instantânea via cache ou fallback
    if (typeof window !== 'undefined') {
      try {
        const rawCache = localStorage.getItem(CACHE_STORAGE_KEY);
        if (rawCache) {
          const parsed = JSON.parse(rawCache);
          if (parsed.telemetry) return parsed.telemetry;
        }
      } catch {
        // Fallback síncrono
      }
    }
    return createFallbackSnapshot();
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (force = false) => {
    setIsLoading(true);
    try {
      const data = await fetchOnsTelemetry(force);
      setTelemetry(data);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao consultar API do ONS';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Busca assíncrona em background
    fetchOnsTelemetry(false)
      .then((data) => {
        if (!cancelled) {
          setTelemetry(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro ao consultar API do ONS');
        }
      });

    // Auto-atualização suave a cada 15 minutos
    const interval = setInterval(() => {
      loadData(true);
    }, 15 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [loadData]);

  return {
    telemetry,
    isLoading,
    isLive: telemetry.source === 'ONS_LIVE',
    lastUpdated: telemetry.latestTimeLabel,
    error,
    refresh: () => loadData(true)
  };
}
