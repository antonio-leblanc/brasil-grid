import React from 'react';
import { ERAC_STAGES, F_NOMINAL, OVERFREQUENCY_ALERT_HZ } from '../../services/gridPhysics';

interface FrequencyGaugeProps {
  frequencyHz: number;
  rocofHzS: number;
  inertiaH: number;
  eracStage: number;
  isBlackout: boolean;
  isOverfrequencyAlert: boolean;
}

export const FrequencyGauge: React.FC<FrequencyGaugeProps> = ({
  frequencyHz,
  rocofHzS,
  inertiaH,
  eracStage,
  isBlackout,
  isOverfrequencyAlert
}) => {
  // Symmetric around 60 Hz and wide enough to show every ERAC stage down to the collapse zone
  const minF = 57.0;
  const maxF = 63.0;
  const clampedF = Math.max(minF, Math.min(maxF, frequencyHz));

  // Semicircle geometry: -135deg (minF) to +135deg (maxF) -> 270deg total
  const minAngle = -135;
  const maxAngle = 135;
  const angleSpan = maxAngle - minAngle;
  const angle = minAngle + ((clampedF - minF) / (maxF - minF)) * angleSpan;

  // Helpers to calculate arc points (radius = 90, center = 120, 115)
  const cx = 120;
  const cy = 115;
  const r = 85;

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    // 0 deg is straight up (12 o'clock)
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  const hzToAngle = (hz: number) => minAngle + ((hz - minF) / (maxF - minF)) * angleSpan;

  // Arc segments
  const eracStartHz = ERAC_STAGES[0].thresholdHz;
  const arcErac = describeArc(cx, cy, r, hzToAngle(minF), hzToAngle(eracStartHz));
  const arcWarnLow = describeArc(cx, cy, r, hzToAngle(eracStartHz), hzToAngle(59.9));
  const arcNormal = describeArc(cx, cy, r, hzToAngle(59.9), hzToAngle(60.1));
  const arcWarnHigh = describeArc(cx, cy, r, hzToAngle(60.1), hzToAngle(OVERFREQUENCY_ALERT_HZ));
  const arcOver = describeArc(cx, cy, r, hzToAngle(OVERFREQUENCY_ALERT_HZ), hzToAngle(maxF));

  const scaleLabels = [
    { hz: 57.5, className: 'fill-red-400' },
    { hz: eracStartHz, className: 'fill-red-400' },
    { hz: 60.0, className: 'fill-emerald-300 font-bold' },
    { hz: 61.5, className: 'fill-amber-400' },
    { hz: 62.5, className: 'fill-red-400' }
  ];

  // Needle tip
  const needleTip = polarToCartesian(cx, cy, r - 12, angle);

  // Status computation
  let statusText = 'NORMAL (60 Hz)';
  let statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

  if (isBlackout) {
    statusText = 'COLAPSO SISTÊMICO';
    statusColor = 'text-red-400 bg-red-500/20 border-red-500/50 animate-pulse';
  } else if (eracStage > 0) {
    statusText = `ERAC ESTÁGIO ${eracStage} ACIONADO`;
    statusColor = 'text-red-400 bg-red-500/20 border-red-500/50 animate-pulse';
  } else if (isOverfrequencyAlert) {
    statusText = 'ALERTA SOBREFREQUÊNCIA';
    statusColor = 'text-rose-400 bg-rose-500/20 border-rose-500/50';
  } else if (frequencyHz < 59.9 || frequencyHz > 60.1) {
    statusText = 'DESVIO DE FREQUÊNCIA';
    statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  }

  // Inertia level text and color
  const inertiaLevel = inertiaH >= 3.5 ? 'Alta (Síncrona)' : inertiaH >= 2.3 ? 'Moderada' : 'Crítica (Baixa)';
  const inertiaColor = inertiaH >= 3.5 ? 'text-emerald-400' : inertiaH >= 2.3 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="flex flex-col items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 shadow-inner select-none font-mono">
      <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mb-1">
        <span className="font-bold tracking-wider text-slate-300">TACÔMETRO 60 HZ</span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColor}`}>
          {statusText}
        </span>
      </div>

      {/* Dial SVG */}
      <div className="relative w-56 h-36">
        <svg viewBox="0 0 240 180" className="w-full h-full">
          {/* Background Track */}
          <path
            d={describeArc(cx, cy, r, minAngle, maxAngle)}
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Color Zones */}
          <path d={arcErac} fill="none" stroke="#ef4444" strokeWidth="8" strokeOpacity="0.8" />
          <path d={arcWarnLow} fill="none" stroke="#f59e0b" strokeWidth="8" strokeOpacity="0.8" />
          <path d={arcNormal} fill="none" stroke="#10b981" strokeWidth="11" strokeLinecap="round" />
          <path d={arcWarnHigh} fill="none" stroke="#f59e0b" strokeWidth="8" strokeOpacity="0.8" />
          <path d={arcOver} fill="none" stroke="#ef4444" strokeWidth="8" strokeOpacity="0.8" />

          {/* Reference Ticks */}
          {[57.5, 58.0, 58.5, 59.0, 59.5, 60.0, 60.5, 61.0, 61.5, 62.0, 62.5].map((tick) => {
            const pInner = polarToCartesian(cx, cy, r - 7, hzToAngle(tick));
            const pOuter = polarToCartesian(cx, cy, r + 7, hzToAngle(tick));
            const isCenter = tick === 60.0;
            return (
              <g key={tick}>
                <line
                  x1={pInner.x}
                  y1={pInner.y}
                  x2={pOuter.x}
                  y2={pOuter.y}
                  stroke={isCenter ? '#10b981' : '#64748b'}
                  strokeWidth={isCenter ? 2.5 : 1}
                />
              </g>
            );
          })}

          {/* Scale Numeric Labels */}
          {scaleLabels.map(({ hz, className }) => {
            const p = polarToCartesian(cx, cy, r + 17, hzToAngle(hz));
            return (
              <text key={hz} x={p.x} y={p.y + 3} textAnchor="middle" className={`text-[9px] font-mono ${className}`}>
                {hz.toFixed(1)}
              </text>
            );
          })}

          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={needleTip.x}
            y2={needleTip.y}
            stroke={isBlackout ? '#ef4444' : '#38bdf8'}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Needle Base Pivot Hub */}
          <circle cx={cx} cy={cy} r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="2.5" fill="#38bdf8" />
        </svg>
      </div>

      {/* Main Digital Readout */}
      <div className="w-full flex items-center justify-between mt-1 px-2 border-t border-slate-900 pt-2">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-500 uppercase">Frequência Instantânea</span>
          <div className="flex items-baseline space-x-1">
            <span
              className={`text-2xl font-black tracking-tight ${
                isBlackout
                  ? 'text-red-500'
                  : Math.abs(frequencyHz - F_NOMINAL) <= 0.1
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }`}
            >
              {frequencyHz.toFixed(3)}
            </span>
            <span className="text-xs text-slate-400 font-normal">Hz</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[9px] text-slate-500 uppercase">RoCoF (df/dt)</span>
          <div className="flex items-baseline space-x-1">
            <span
              className={`text-sm font-bold ${
                Math.abs(rocofHzS) > 0.05 ? 'text-amber-300' : 'text-slate-300'
              }`}
            >
              {rocofHzS >= 0 ? `+${rocofHzS.toFixed(3)}` : rocofHzS.toFixed(3)}
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Hz/s</span>
          </div>
        </div>
      </div>

      {/* System Inertia Bar */}
      <div className="w-full mt-2.5 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px]">
        <div className="flex items-center space-x-1.5 text-slate-400">
          <span>Inércia Eq. (Heq):</span>
          <strong className={`font-mono ${inertiaColor}`}>{inertiaH.toFixed(2)}s</strong>
        </div>
        <span className={`text-[9px] font-semibold ${inertiaColor}`}>
          {inertiaLevel}
        </span>
      </div>
    </div>
  );
};
