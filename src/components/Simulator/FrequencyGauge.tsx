import React from 'react';
import { ERAC_STAGES, OVERFREQUENCY_ALERT_HZ } from '../../services/gridPhysics';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FrequencyGaugeProps {
  frequencyHz: number;
  rocofHzS: number;
  inertiaH: number;
  eracStage: number;
  isBlackout: boolean;
  isOverfrequencyAlert: boolean;
  deltaMW?: number;
}

export const FrequencyGauge: React.FC<FrequencyGaugeProps> = ({
  frequencyHz,
  rocofHzS,
  eracStage,
  isBlackout,
  isOverfrequencyAlert,
  deltaMW = 0
}) => {
  const minF = 57.0;
  const maxF = 63.0;
  const clampedF = Math.max(minF, Math.min(maxF, frequencyHz));

  // Semicircle geometry: -120deg to +120deg (240deg span)
  const minAngle = -120;
  const maxAngle = 120;
  const angleSpan = maxAngle - minAngle;
  const angle = minAngle + ((clampedF - minF) / (maxF - minF)) * angleSpan;

  const cx = 130;
  const cy = 110;
  const r = 85;

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
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

  const eracStartHz = ERAC_STAGES[0].thresholdHz;
  const arcErac = describeArc(cx, cy, r, hzToAngle(minF), hzToAngle(eracStartHz));
  const arcWarnLow = describeArc(cx, cy, r, hzToAngle(eracStartHz), hzToAngle(59.9));
  const arcNormal = describeArc(cx, cy, r, hzToAngle(59.9), hzToAngle(60.1));
  const arcWarnHigh = describeArc(cx, cy, r, hzToAngle(60.1), hzToAngle(OVERFREQUENCY_ALERT_HZ));
  const arcOver = describeArc(cx, cy, r, hzToAngle(OVERFREQUENCY_ALERT_HZ), hzToAngle(maxF));

  const needleTip = polarToCartesian(cx, cy, r - 10, angle);

  // Status & colors
  let statusText = 'Rede Equilibrada';
  let statusBadgeClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let freqColorClass = 'text-emerald-400';
  let StatusIcon = ShieldCheck;

  if (isBlackout) {
    statusText = 'Colapso / Apagão Geral';
    statusBadgeClass = 'text-red-400 bg-red-500/20 border-red-500/50 animate-pulse';
    freqColorClass = 'text-red-500';
    StatusIcon = AlertTriangle;
  } else if (eracStage > 0) {
    statusText = `ERAC: Corte de Carga (Estágio ${eracStage})`;
    statusBadgeClass = 'text-red-400 bg-red-500/20 border-red-500/50 animate-pulse';
    freqColorClass = 'text-red-400';
    StatusIcon = AlertTriangle;
  } else if (isOverfrequencyAlert || frequencyHz > 60.1) {
    statusText = 'Sobra de Geração (Acelerando)';
    statusBadgeClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    freqColorClass = 'text-amber-400';
    StatusIcon = TrendingUp;
  } else if (frequencyHz < 59.9) {
    statusText = 'Falta de Geração (Desacelerando)';
    statusBadgeClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    freqColorClass = 'text-amber-400';
    StatusIcon = TrendingDown;
  }

  return (
    <div className="flex flex-col items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 shadow-lg select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between text-xs mb-1">
        <span className="font-semibold text-slate-300">FREQUÊNCIA DA REDE</span>
        <div className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusBadgeClass}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Dial SVG */}
      <div className="relative w-64 h-36 my-1">
        <svg viewBox="0 0 260 160" className="w-full h-full">
          {/* Base Track */}
          <path
            d={describeArc(cx, cy, r, minAngle, maxAngle)}
            fill="none"
            stroke="#1e293b"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Color Segments */}
          <path d={arcErac} fill="none" stroke="#ef4444" strokeWidth="8" strokeOpacity="0.8" />
          <path d={arcWarnLow} fill="none" stroke="#f59e0b" strokeWidth="8" strokeOpacity="0.8" />
          <path d={arcNormal} fill="none" stroke="#10b981" strokeWidth="12" strokeLinecap="round" />
          <path d={arcWarnHigh} fill="none" stroke="#f59e0b" strokeWidth="8" strokeOpacity="0.8" />
          <path d={arcOver} fill="none" stroke="#ef4444" strokeWidth="8" strokeOpacity="0.8" />

          {/* Key Reference Labels */}
          <text x="32" y="145" textAnchor="middle" className="text-[10px] fill-red-400 font-mono">58.0</text>
          <text x="130" y="24" textAnchor="middle" className="text-[11px] fill-emerald-400 font-bold font-mono">60.00 Hz</text>
          <text x="228" y="145" textAnchor="middle" className="text-[10px] fill-red-400 font-mono">62.0</text>

          {/* Safe band indicator text */}
          <text x="130" y="44" textAnchor="middle" className="text-[8px] fill-slate-400 font-sans">Faixa Segura</text>

          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={needleTip.x}
            y2={needleTip.y}
            stroke={isBlackout ? '#ef4444' : '#38bdf8'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Needle Pivot Hub */}
          <circle cx={cx} cy={cy} r="6.5" fill="#0b0f19" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="2.5" fill="#38bdf8" />
        </svg>
      </div>

      {/* Main Digital Readout */}
      <div className="w-full flex items-center justify-between pt-2 border-t border-slate-800/80">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-mono">Valor Atual</span>
          <div className="flex items-baseline space-x-1">
            <span className={`text-3xl font-black font-mono tracking-tight ${freqColorClass}`}>
              {frequencyHz.toFixed(3)}
            </span>
            <span className="text-xs text-slate-400 font-semibold font-mono">Hz</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block uppercase font-mono">Tendência</span>
          <div className="flex items-center justify-end space-x-1 text-xs font-mono font-semibold">
            {deltaMW > 200 ? (
              <span className="text-sky-400 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Subindo
              </span>
            ) : deltaMW < -200 ? (
              <span className="text-red-400 flex items-center">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> Caindo
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center">
                <Minus className="w-3.5 h-3.5 mr-0.5" /> Estável
              </span>
            )}
          </div>
          <span className="text-[9px] text-slate-500 font-mono">
            {rocofHzS >= 0 ? `+${rocofHzS.toFixed(2)}` : rocofHzS.toFixed(2)} Hz/s
          </span>
        </div>
      </div>
    </div>
  );
};
