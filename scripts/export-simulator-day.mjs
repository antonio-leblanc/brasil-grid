// Gera src/data/simulatorDayData.ts a partir do Balanço de Energia nos Subsistemas (ONS, base horária).
// Uso: node scripts/export-simulator-day.mjs 2026-08-31
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const date = process.argv[2] ?? '2026-08-31';
const year = date.slice(0, 4);
const csvUrl = `https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/balanco_energia_subsistema_ho/BALANCO_ENERGIA_SUBSISTEMA_${year}.csv`;
const dictionaryUrl =
  'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/balanco_energia_subsistema_ho/DicionarioDados_Balanco_Energia_Subsistema.pdf';

const response = await fetch(csvUrl);
if (!response.ok) throw new Error(`ONS respondeu ${response.status} para ${csvUrl}`);
const [header, ...rows] = (await response.text()).trim().split(/\r?\n/);
const columns = header.split(';');
const col = (name) => {
  const index = columns.indexOf(name);
  if (index < 0) throw new Error(`Coluna ${name} ausente no CSV do ONS`);
  return index;
};

const hours = rows
  .map((line) => line.split(';'))
  .filter((cells) => cells[col('id_subsistema')].trim() === 'SIN' && cells[col('din_instante')].startsWith(date))
  .map((cells) => ({
    hour: Number(cells[col('din_instante')].slice(11, 13)),
    hydroMW: Math.round(Number(cells[col('val_gerhidraulica')])),
    thermalMW: Math.round(Number(cells[col('val_gertermica')])),
    windMW: Math.round(Number(cells[col('val_gereolica')])),
    solarMW: Math.round(Number(cells[col('val_gersolar')])),
    loadMW: Math.round(Number(cells[col('val_carga')]))
  }))
  .sort((a, b) => a.hour - b.hour);

if (hours.length !== 24) throw new Error(`Esperava 24 horas do SIN em ${date}, veio ${hours.length}`);

const loadAreas = ['SECO', 'S', 'NE', 'N'];
const loadApiUrl = (area) =>
  `https://apicarga.ons.org.br/prd/cargaverificada?dat_inicio=${date}&dat_fim=${date}&cod_areacarga=${area}`;
const mmgdHalfHours = new Map();
for (const area of loadAreas) {
  const res = await fetch(loadApiUrl(area));
  if (!res.ok) throw new Error(`ONS respondeu ${res.status} para ${loadApiUrl(area)}`);
  for (const record of await res.json()) {
    const stamp = record.din_referenciautc;
    mmgdHalfHours.set(stamp, (mmgdHalfHours.get(stamp) ?? 0) + (record.val_cargammgd ?? 0));
  }
}
if (mmgdHalfHours.size !== 48) throw new Error(`Esperava 48 meias horas de MMGD em ${date}, veio ${mmgdHalfHours.size}`);

// The load API stamps each half hour at its end (00:30 ... 24:00 BRT), so hour h averages h:30 and h+1:00.
const mmgdByHour = Array.from({ length: 24 }, () => []);
for (const [stamp, mw] of mmgdHalfHours) {
  const periodStartBrt = new Date(Date.parse(stamp) - 3 * 3600_000 - 1800_000);
  mmgdByHour[periodStartBrt.getUTCHours()].push(mw);
}
// The Balanço solar already includes the MMGD estimate (its val_carga tracks the API's carga global within
// ~2 GW, day and night). The clamp drops the ~200 MW night floor of the ONS estimate where solar is zero.
for (const h of hours) {
  const samples = mmgdByHour[h.hour];
  const mean = samples.reduce((sum, mw) => sum + mw, 0) / samples.length;
  h.mmgdMW = Math.min(h.solarMW, Math.round(mean));
}

const [y, m, d] = date.split('-');
const accessedAt = new Date().toISOString().slice(0, 10);
const body = `import type { SourceRef } from './sources';

// Gerado por scripts/export-simulator-day.mjs. Não editar à mão.

export interface SimulatorDayHour {
  hour: number;
  hydroMW: number;
  thermalMW: number;
  windMW: number;
  solarMW: number;
  /** Parcela de solarMW que é micro e minigeração distribuída (estimativa do ONS). */
  mmgdMW: number;
  loadMW: number;
}

export interface SimulatorDay {
  id: string;
  dateLabel: string;
  hours: SimulatorDayHour[];
  sources: SourceRef[];
}

export const simulatorDay: SimulatorDay = {
  id: '${date}',
  dateLabel: '${d}/${m}/${y}',
  hours: [
${hours.map((h) => `    { ${Object.entries(h).map(([k, v]) => `${k}: ${v}`).join(', ')} }`).join(',\n')}
  ],
  sources: [
    {
      label: 'ONS — Balanço de Energia nos Subsistemas, base horária ${y} (CSV)',
      url: '${csvUrl}',
      accessedAt: '${accessedAt}'
    },
    {
      label: 'ONS — Dicionário de dados do Balanço de Energia nos Subsistemas',
      url: '${dictionaryUrl}',
      accessedAt: '${accessedAt}'
    },
    {
      label: 'ONS — API de Carga Verificada, MMGD estimada (SE/CO, S, NE, N) em ${d}/${m}/${y}',
      url: '${loadApiUrl('SECO')}',
      accessedAt: '${accessedAt}'
    }
  ]
};
`;

const target = fileURLToPath(new URL('../src/data/simulatorDayData.ts', import.meta.url));
writeFileSync(target, body);
console.log(`${target}: ${hours.length} horas do SIN em ${date}`);
