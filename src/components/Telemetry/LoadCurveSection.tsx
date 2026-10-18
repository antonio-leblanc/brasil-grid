import React, { useState, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import type { NationalTelemetrySnapshot, CurvePoint } from '../../services/onsApi';
import { SegmentedControl, type SegmentOption } from '../Controls/SegmentedControl';
import { formatDecimal } from '../../utils/format';

interface LoadCurveSectionProps {
  telemetry: NationalTelemetrySnapshot;
  isLive: boolean;
  isLoading: boolean;
  onRefresh: () => void;
}

type SelectedSub = 'SIN' | 'SE_CO' | 'S' | 'NE' | 'N';

const SUBSYSTEM_OPTIONS: SegmentOption<SelectedSub>[] = [
  { value: 'SIN', label: 'SIN' },
  { value: 'SE_CO', label: 'Sudeste/CO' },
  { value: 'S', label: 'Sul' },
  { value: 'NE', label: 'Nordeste' },
  { value: 'N', label: 'Norte' }
];

const formatGW = (mw: number) => formatDecimal(mw / 1000, 1);

const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 310;
const PAD_LEFT = 65;
const PAD_RIGHT = 25;
const PAD_TOP = 25;
const PAD_BOTTOM = 40;
const GRAPH_W = VIEWBOX_WIDTH - PAD_LEFT - PAD_RIGHT;
const GRAPH_H = VIEWBOX_HEIGHT - PAD_TOP - PAD_BOTTOM;

export const LoadCurveSection: React.FC<LoadCurveSectionProps> = ({ telemetry, isLive, isLoading, onRefresh }) => {
  const [selectedSub, setSelectedSub] = useState<SelectedSub>('SIN');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const isSin = selectedSub === 'SIN';
  const subData = !isSin ? telemetry.subsystems[selectedSub] : null;

  const points: CurvePoint[] = isSin ? telemetry.sinCurve : subData?.points || [];

  const currentLoadMW = isSin ? telemetry.currentSinLoadMW : (subData?.currentLoadMW || 0);
  const peakLoadMW = isSin ? telemetry.peakSinLoadMW : (subData?.peakLoadMW || 0);
  const peakTime = isSin ? telemetry.peakSinTime : (subData?.peakTime || '--:--');
  const minLoadMW = isSin ? telemetry.minSinLoadMW : (subData?.minLoadMW || 0);
  const minTime = isSin ? telemetry.minSinTime : (subData?.minTime || '--:--');
  const currentSolarMW = isSin ? telemetry.currentSolarMmgdMW : (subData?.solarMmgdMW || 0);

  const peakSolarPoint = points.reduce(
    (max, p) => (p.solarMmgdMW > max.solarMmgdMW ? p : max),
    points[0] || { solarMmgdMW: 0, timeLabel: '--:--' }
  );

  const rawMax = Math.max(...points.map((p) => p.totalLoadMW), 1000);
  const step = rawMax > 40000 ? 20000 : rawMax > 15000 ? 5000 : 2000;
  const yMax = Math.ceil((rawMax * 1.1) / step) * step;

  const getX = (i: number) => PAD_LEFT + (i / Math.max(1, points.length - 1)) * GRAPH_W;
  const getY = (val: number) => PAD_TOP + GRAPH_H - (val / yMax) * GRAPH_H;
  const baseline = (PAD_TOP + GRAPH_H).toFixed(1);

  const linePath = (value: (p: CurvePoint) => number) =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)},${getY(value(p)).toFixed(1)}`).join(' ');
  const areaPath = (line: string) =>
    points.length > 0 ? `${line} L ${getX(points.length - 1).toFixed(1)},${baseline} L ${getX(0).toFixed(1)},${baseline} Z` : '';

  const totalLoadLine = linePath((p) => p.totalLoadMW);
  const scadaLoadLine = linePath((p) => p.scadaLoadMW);
  const solarMmgdArea = areaPath(linePath((p) => p.solarMmgdMW));

  const peakIndex = points.findIndex((p) => p.totalLoadMW === peakLoadMW);
  const minIndex = points.findIndex((p) => p.totalLoadMW === minLoadMW);
  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = (e.clientX - rect.left) * (VIEWBOX_WIDTH / rect.width);

    if (svgX < PAD_LEFT || svgX > PAD_LEFT + GRAPH_W) {
      setHoverIndex(null);
      return;
    }

    const ratio = (svgX - PAD_LEFT) / GRAPH_W;
    setHoverIndex(Math.min(points.length - 1, Math.max(0, Math.round(ratio * (points.length - 1)))));
  };

  const yTicks = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax];
  const xTickIndices = [0, 8, 16, 24, 32, 40, 47].filter((i) => i < points.length);

  const metrics = [
    { label: 'Carga atual', value: formatGW(currentLoadMW), color: 'text-cyan-300', detail: `${currentLoadMW.toLocaleString('pt-BR')} MW` },
    { label: 'Pico', value: formatGW(peakLoadMW), color: 'text-amber-300', detail: `às ${peakTime}` },
    { label: 'Vale', value: formatGW(minLoadMW), color: 'text-sky-300', detail: `às ${minTime}` },
    { label: 'Solar MMGD', value: formatGW(currentSolarMW), color: 'text-yellow-300', detail: `pico ${formatGW(peakSolarPoint.solarMmgdMW)} GW às ${peakSolarPoint.timeLabel}` }
  ];

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Curva de carga</h2>
          <p className="mt-1 text-xs text-slate-400">
            48 medições semi-horárias do ONS · {telemetry.referenceDate} · última às{' '}
            <span className="font-mono tabular-nums text-slate-300">{telemetry.latestTimeLabel}</span> ·{' '}
            <span className={isLive ? 'text-emerald-400' : 'text-amber-400'}>{isLive ? 'ao vivo' : 'snapshot de referência'}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-100 hover:bg-slate-900 transition-colors disabled:opacity-50 cursor-pointer"
          aria-label="Atualizar telemetria"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </header>

      <SegmentedControl options={SUBSYSTEM_OPTIONS} value={selectedSub} onChange={setSelectedSub} />

      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-y border-slate-800/70 py-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <dt className="text-[11px] text-slate-500">{m.label}</dt>
            <dd className={`mt-0.5 font-mono tabular-nums text-lg ${m.color}`}>
              {m.value} <span className="text-xs text-slate-500">GW</span>
            </dd>
            <dd className="mt-0.5 text-[11px] text-slate-500 font-mono tabular-nums">{m.detail}</dd>
          </div>
        ))}
      </dl>

      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 mb-2">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-cyan-400" />
            Carga global (inclui MMGD)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 border-t border-dashed border-indigo-400" />
            Carga supervisionada
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-yellow-500/30 border border-yellow-500/60" />
            Solar MMGD
          </span>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="w-full h-auto cursor-crosshair select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="totalLoadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {yTicks.map((val) => {
            const y = getY(val);
            return (
              <g key={val} className="font-mono text-[9px] fill-slate-500">
                <line x1={PAD_LEFT} y1={y} x2={PAD_LEFT + GRAPH_W} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                <text x={PAD_LEFT - 8} y={y + 3} textAnchor="end">
                  {(val / 1000).toFixed(0)} GW
                </text>
              </g>
            );
          })}

          {xTickIndices.map((i) => {
            const x = getX(i);
            return (
              <g key={i} className="font-mono text-[10px] fill-slate-500">
                <line x1={x} y1={PAD_TOP} x2={x} y2={PAD_TOP + GRAPH_H} stroke="#1e293b" strokeDasharray="2 2" />
                <text x={x} y={PAD_TOP + GRAPH_H + 16} textAnchor="middle">
                  {points[i].timeLabel}
                </text>
              </g>
            );
          })}

          <path d={solarMmgdArea} fill="url(#solarGrad)" />
          <path d={areaPath(totalLoadLine)} fill="url(#totalLoadGrad)" />
          <path d={totalLoadLine} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={scadaLoadLine}
            fill="none"
            stroke="#818cf8"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {peakIndex >= 0 && (
            <g>
              <circle cx={getX(peakIndex)} cy={getY(peakLoadMW)} r="4" fill="#f59e0b" />
              <text x={getX(peakIndex)} y={getY(peakLoadMW) - 10} textAnchor="middle" className="font-mono text-[9px] fill-amber-300">
                pico {formatGW(peakLoadMW)} GW
              </text>
            </g>
          )}

          {minIndex >= 0 && (
            <g>
              <circle cx={getX(minIndex)} cy={getY(minLoadMW)} r="3.5" fill="#38bdf8" />
              <text x={getX(minIndex)} y={getY(minLoadMW) + 14} textAnchor="middle" className="font-mono text-[9px] fill-sky-300">
                vale {formatGW(minLoadMW)} GW
              </text>
            </g>
          )}

          {hoverIndex !== null && activePoint && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={PAD_TOP}
                x2={getX(hoverIndex)}
                y2={PAD_TOP + GRAPH_H}
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle cx={getX(hoverIndex)} cy={getY(activePoint.totalLoadMW)} r="4.5" fill="#06b6d4" stroke="#07090e" strokeWidth="1.5" />
              <circle cx={getX(hoverIndex)} cy={getY(activePoint.scadaLoadMW)} r="3.5" fill="#818cf8" stroke="#07090e" strokeWidth="1.5" />
              {activePoint.solarMmgdMW > 0 && (
                <circle cx={getX(hoverIndex)} cy={getY(activePoint.solarMmgdMW)} r="3.5" fill="#eab308" stroke="#07090e" strokeWidth="1.5" />
              )}
            </g>
          )}
        </svg>

        <p className="mt-2 min-h-4 text-[11px] text-slate-500 font-mono tabular-nums">
          {activePoint ? (
            <>
              <span className="text-slate-200">{activePoint.timeLabel}</span> · global{' '}
              <span className="text-cyan-300">{formatGW(activePoint.totalLoadMW)} GW</span> · supervisionada{' '}
              <span className="text-indigo-300">{formatGW(activePoint.scadaLoadMW)} GW</span> · solar MMGD{' '}
              <span className="text-yellow-300">{formatGW(activePoint.solarMmgdMW)} GW</span>
            </>
          ) : (
            <span className="font-sans">Passe o cursor na curva para ver os valores de cada meia hora.</span>
          )}
        </p>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">
        <strong className="text-slate-100">Curva do pato.</strong> Mais de 40 GW de micro e minigeração distribuída (MMGD, quase
        toda solar) ficam atrás dos medidores das distribuidoras e afundam a carga supervisionada entre ~10h e 15h. No fim da
        tarde o sol some com a carga ainda alta, o pico líquido vai para o início da noite e as hidrelétricas fazem a rampa.
        Desde 29/04/2023 o ONS soma à carga global uma estimativa da MMGD.
      </p>

      <p className="text-[11px] text-slate-500">Fonte: API Dados Abertos ONS · carga verificada semi-horária</p>
    </section>
  );
};
