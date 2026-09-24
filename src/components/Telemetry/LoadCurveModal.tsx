import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Activity,
  Sun,
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
  Info
} from 'lucide-react';
import type { NationalTelemetrySnapshot, CurvePoint } from '../../services/onsApi';

interface LoadCurveModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: NationalTelemetrySnapshot;
  isLive: boolean;
  isLoading: boolean;
  onRefresh: () => void;
}

type SelectedSub = 'SIN' | 'SE_CO' | 'S' | 'NE' | 'N';

export const LoadCurveModal: React.FC<LoadCurveModalProps> = ({
  isOpen,
  onClose,
  telemetry,
  isLive,
  isLoading,
  onRefresh
}) => {
  const [selectedSub, setSelectedSub] = useState<SelectedSub>('SIN');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Resolve points & metrics according to selected subsystem
  const isSin = selectedSub === 'SIN';
  const subData = !isSin ? telemetry.subsystems[selectedSub] : null;

  const points: CurvePoint[] = isSin
    ? telemetry.sinCurve
    : subData?.points || [];

  const currentLoadMW = isSin ? telemetry.currentSinLoadMW : (subData?.currentLoadMW || 0);
  const peakLoadMW = isSin ? telemetry.peakSinLoadMW : (subData?.peakLoadMW || 0);
  const peakTime = isSin ? telemetry.peakSinTime : (subData?.peakTime || '--:--');
  const minLoadMW = isSin ? telemetry.minSinLoadMW : (subData?.minLoadMW || 0);
  const minTime = isSin ? telemetry.minSinTime : (subData?.minTime || '--:--');
  const currentSolarMW = isSin ? telemetry.currentSolarMmgdMW : (subData?.solarMmgdMW || 0);

  // Peak solar in the selected curve
  const peakSolarPoint = points.reduce(
    (max, p) => (p.solarMmgdMW > max.solarMmgdMW ? p : max),
    points[0] || { solarMmgdMW: 0, timeLabel: '--:--' }
  );

  // SVG Chart Geometry
  const viewBoxWidth = 800;
  const viewBoxHeight = 310;
  const padLeft = 65;
  const padRight = 25;
  const padTop = 25;
  const padBottom = 40;
  const graphW = viewBoxWidth - padLeft - padRight;
  const graphH = viewBoxHeight - padTop - padBottom;

  const allLoads = points.map((p) => p.totalLoadMW);
  const rawMax = Math.max(...allLoads, 1000);
  // Round max up to neat increment (e.g. 5000 MW or 10000 MW)
  const step = rawMax > 40000 ? 20000 : rawMax > 15000 ? 5000 : 2000;
  const yMax = Math.ceil((rawMax * 1.1) / step) * step;
  const yMin = 0;

  const getX = (i: number) => padLeft + (i / Math.max(1, points.length - 1)) * graphW;
  const getY = (val: number) => padTop + graphH - ((val - yMin) / (yMax - yMin)) * graphH;

  // Path generators
  const totalLoadLine = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)},${getY(p.totalLoadMW).toFixed(1)}`)
    .join(' ');

  const totalLoadArea = points.length > 0
    ? `${totalLoadLine} L ${getX(points.length - 1).toFixed(1)},${(padTop + graphH).toFixed(1)} L ${getX(0).toFixed(1)},${(padTop + graphH).toFixed(1)} Z`
    : '';

  const scadaLoadLine = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)},${getY(p.scadaLoadMW).toFixed(1)}`)
    .join(' ');

  const solarMmgdArea = points.length > 0
    ? points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)},${getY(p.solarMmgdMW).toFixed(1)}`)
        .join(' ') +
      ` L ${getX(points.length - 1).toFixed(1)},${(padTop + graphH).toFixed(1)} L ${getX(0).toFixed(1)},${(padTop + graphH).toFixed(1)} Z`
    : '';

  // Peak index for marker
  const peakIndex = points.findIndex((p) => p.totalLoadMW === peakLoadMW);
  const minIndex = points.findIndex((p) => p.totalLoadMW === minLoadMW);

  // Active hover point
  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const scaleX = viewBoxWidth / rect.width;
    const svgX = clientX * scaleX;

    if (svgX < padLeft || svgX > padLeft + graphW) {
      setHoverIndex(null);
      return;
    }

    const ratio = (svgX - padLeft) / graphW;
    const idx = Math.min(points.length - 1, Math.max(0, Math.round(ratio * (points.length - 1))));
    setHoverIndex(idx);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  // Y-axis ticks
  const yTicks = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax];

  // X-axis ticks (intervals of 4 hours: 00h, 04h, 08h, 12h, 16h, 20h, 23h30)
  const xTickIndices = [0, 8, 16, 24, 32, 40, 47].filter((i) => i < points.length);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#090c13] border border-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Curva de Carga 24h & Efeito Pato
                </h2>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                    isLive
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                  }`}
                >
                  {isLive ? 'ONS LIVE' : 'REF SNAPSHOT'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                48 medições semi-horárias • Referência: {telemetry.referenceDate} (Horário de Brasília)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Recarregar telemetria do ONS"
              aria-label="Recarregar telemetria"
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              title="Fechar (Esc)"
              aria-label="Fechar modal"
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subsystem Tabs */}
        <div className="px-5 pt-3 border-b border-slate-800/80 bg-slate-950/30 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 text-xs font-mono">
            <button
              onClick={() => setSelectedSub('SIN')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold ${
                selectedSub === 'SIN'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm shadow-cyan-950'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              SIN (Nacional)
            </button>
            <button
              onClick={() => setSelectedSub('SE_CO')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold ${
                selectedSub === 'SE_CO'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              Sudeste / CO
            </button>
            <button
              onClick={() => setSelectedSub('S')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold ${
                selectedSub === 'S'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              Sul
            </button>
            <button
              onClick={() => setSelectedSub('NE')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold ${
                selectedSub === 'NE'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              Nordeste
            </button>
            <button
              onClick={() => setSelectedSub('N')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold ${
                selectedSub === 'N'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              Norte
            </button>
          </div>

          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 pb-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Última medição: <strong className="text-white">{telemetry.latestTimeLabel}</strong></span>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Carga Atual</span>
              </div>
              <div className="text-lg font-black text-cyan-300 mt-1">
                {(currentLoadMW / 1000).toFixed(1)} <span className="text-xs font-normal text-slate-400">GW</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {currentLoadMW.toLocaleString('pt-BR')} MW
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Pico Diário</span>
              </div>
              <div className="text-lg font-black text-amber-300 mt-1">
                {(peakLoadMW / 1000).toFixed(1)} <span className="text-xs font-normal text-slate-400">GW</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                às <strong className="text-amber-200">{peakTime}</strong>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold">
                <TrendingDown className="w-3.5 h-3.5 text-blue-400" />
                <span>Vale Diário</span>
              </div>
              <div className="text-lg font-black text-blue-300 mt-1">
                {(minLoadMW / 1000).toFixed(1)} <span className="text-xs font-normal text-slate-400">GW</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                às <strong className="text-blue-200">{minTime}</strong>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold">
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
                <span>Solar Distribuída (MMGD)</span>
              </div>
              <div className="text-lg font-black text-yellow-300 mt-1">
                {(currentSolarMW / 1000).toFixed(1)} <span className="text-xs font-normal text-slate-400">GW</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Pico: {(peakSolarPoint.solarMmgdMW / 1000).toFixed(1)} GW ({peakSolarPoint.timeLabel})
              </div>
            </div>
          </div>

          {/* SVG Chart Container */}
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 relative">
            {/* Chart Legend */}
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono mb-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-0.5 bg-cyan-400 rounded"></span>
                  <span className="text-slate-300">Carga Global (inclui MMGD)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-0.5 bg-indigo-400 rounded stroke-dasharray"></span>
                  <span className="text-slate-400">Carga Supervisionada (SSC/ONS)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-2 bg-yellow-500/30 border border-yellow-500/60 rounded-xs"></span>
                  <span className="text-yellow-300">Geração Solar MMGD</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 hidden sm:block">
                Passe o mouse na curva para auditar os valores
              </div>
            </div>

            {/* Pure Responsive SVG Chart */}
            <div className="w-full overflow-hidden select-none">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                className="w-full h-auto cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  {/* Total Load Area Gradient */}
                  <linearGradient id="totalLoadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Solar MMGD Area Gradient */}
                  <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines and Y labels */}
                {yTicks.map((val, idx) => {
                  const y = getY(val);
                  return (
                    <g key={idx} className="font-mono text-[9px] fill-slate-500">
                      <line
                        x1={padLeft}
                        y1={y}
                        x2={padLeft + graphW}
                        y2={y}
                        stroke="#1e293b"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                      <text x={padLeft - 8} y={y + 3} textAnchor="end">
                        {(val / 1000).toFixed(0)} GW
                      </text>
                    </g>
                  );
                })}

                {/* Vertical Grid lines and X labels */}
                {xTickIndices.map((i) => {
                  const p = points[i];
                  const x = getX(i);
                  return (
                    <g key={i} className="font-mono text-[10px] fill-slate-500">
                      <line
                        x1={x}
                        y1={padTop}
                        x2={x}
                        y2={padTop + graphH}
                        stroke="#1e293b"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                      />
                      <text x={x} y={padTop + graphH + 16} textAnchor="middle">
                        {p.timeLabel}
                      </text>
                    </g>
                  );
                })}

                {/* Solar MMGD Area (The Duck Belly) */}
                <path d={solarMmgdArea} fill="url(#solarGrad)" />

                {/* Total Load Area & Line */}
                <path d={totalLoadArea} fill="url(#totalLoadGrad)" />
                <path
                  d={totalLoadLine}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* SCADA Load Line */}
                <path
                  d={scadaLoadLine}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Peak Marker */}
                {peakIndex >= 0 && (
                  <g className="animate-pulse">
                    <circle
                      cx={getX(peakIndex)}
                      cy={getY(peakLoadMW)}
                      r="4.5"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={getX(peakIndex)}
                      y={getY(peakLoadMW) - 10}
                      textAnchor="middle"
                      className="font-mono text-[9px] font-bold fill-amber-300"
                    >
                      ▲ PICO {(peakLoadMW / 1000).toFixed(1)} GW
                    </text>
                  </g>
                )}

                {/* Min Marker */}
                {minIndex >= 0 && (
                  <g>
                    <circle
                      cx={getX(minIndex)}
                      cy={getY(minLoadMW)}
                      r="3.5"
                      fill="#38bdf8"
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    <text
                      x={getX(minIndex)}
                      y={getY(minLoadMW) + 14}
                      textAnchor="middle"
                      className="font-mono text-[9px] font-bold fill-sky-300"
                    >
                      ▼ VALE {(minLoadMW / 1000).toFixed(1)} GW
                    </text>
                  </g>
                )}

                {/* Hover Guide & Tooltip */}
                {hoverIndex !== null && activePoint && (
                  <g>
                    {/* Vertical indicator line */}
                    <line
                      x1={getX(hoverIndex)}
                      y1={padTop}
                      x2={getX(hoverIndex)}
                      y2={padTop + graphH}
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />

                    {/* Circles on lines */}
                    <circle
                      cx={getX(hoverIndex)}
                      cy={getY(activePoint.totalLoadMW)}
                      r="5"
                      fill="#06b6d4"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <circle
                      cx={getX(hoverIndex)}
                      cy={getY(activePoint.scadaLoadMW)}
                      r="4"
                      fill="#818cf8"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    {activePoint.solarMmgdMW > 0 && (
                      <circle
                        cx={getX(hoverIndex)}
                        cy={getY(activePoint.solarMmgdMW)}
                        r="4"
                        fill="#eab308"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>
                )}
              </svg>
            </div>

            {/* Interactive Inspector Box (under or overlaid on the chart) */}
            {activePoint ? (
              <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-cyan-500/40 font-mono text-xs flex items-center justify-between flex-wrap gap-2 text-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    {activePoint.timeLabel}
                  </span>
                  <span>
                    Carga Global: <strong className="text-cyan-300 font-bold">{(activePoint.totalLoadMW / 1000).toFixed(1)} GW</strong> ({activePoint.totalLoadMW.toLocaleString('pt-BR')} MW)
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400">
                    Supervisionada: <strong className="text-indigo-300">{(activePoint.scadaLoadMW / 1000).toFixed(1)} GW</strong>
                  </span>
                  <span className="text-yellow-400">
                    Solar GD: <strong>{(activePoint.solarMmgdMW / 1000).toFixed(1)} GW</strong>
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-3 text-[11px] font-mono text-slate-500 text-center">
                Passe o cursor sobre os pontos para visualizar a decomposição horária em MW
              </div>
            )}
          </div>

          {/* Educational Note: Efeito Curva do Pato */}
          <div className="p-3.5 rounded-lg bg-slate-900/40 border border-slate-800 text-xs font-sans text-slate-300 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-semibold font-mono text-xs">
              <Info className="w-4 h-4 shrink-0" />
              <span>O que é o "Efeito Pato" (Duck Curve) no Sistema Interligado Nacional?</span>
            </div>
            <p className="text-[12px] text-slate-400 leading-relaxed">
              Com mais de 40 GW de micro e minigeração distribuída (MMGD, quase toda solar) conectados às distribuidoras, a carga que o ONS enxerga nas usinas supervisionadas sofre uma depressão acentuada entre ~10h e 15h (a "barriga" do pato). No entardecer (17h-19h), a geração solar desaparece enquanto a carga ainda está elevada, e o pico da carga líquida se desloca para o início da noite. Isso exige rampas rápidas de tomada de carga, no SIN atendidas sobretudo pelas hidrelétricas (o "pescoço" do pato), para manter o balanço carga-geração e a frequência em 60 Hz. Desde 29/04/2023 o ONS incorpora à carga global uma estimativa da MMGD baseada em dados meteorológicos.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="truncate">
            Fonte: API Dados Abertos ONS (Carga Verificada semi-horária)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
