import React from 'react';
import { ERAC_STAGES, OVERFREQUENCY_ALERT_HZ } from '../../services/gridPhysics';
import { formatDecimal } from '../../utils/format';
import { useSimulatorCopy } from './copy';

interface FrequencyGaugeProps {
  frequencyHz: number;
  rocofHzS: number;
  inertiaH: number;
  eracStage: number;
  isBlackout: boolean;
  isOverfrequencyAlert: boolean;
}

const SCALE_MIN_HZ = 57;
const SCALE_MAX_HZ = 63;
const SAFE_LOW_HZ = 59.9;
const SAFE_HIGH_HZ = 60.1;

const toPercent = (hz: number) =>
  ((Math.max(SCALE_MIN_HZ, Math.min(SCALE_MAX_HZ, hz)) - SCALE_MIN_HZ) / (SCALE_MAX_HZ - SCALE_MIN_HZ)) * 100;

const signed = (value: number, digits: number) => {
  const isZero = Math.abs(value) < 0.5 * 10 ** -digits;
  return `${isZero || value > 0 ? '+' : '−'}${formatDecimal(Math.abs(value), digits)}`;
};

export const FrequencyGauge: React.FC<FrequencyGaugeProps> = ({
  frequencyHz,
  rocofHzS,
  inertiaH,
  eracStage,
  isBlackout,
  isOverfrequencyAlert
}) => {
  const sim = useSimulatorCopy();
  const c = sim.gauge;
  const eracStartHz = ERAC_STAGES[0].thresholdHz;

  let status = c.normal;
  let tone = 'text-slate-100';
  if (isBlackout) {
    status = sim.blackout;
    tone = 'text-red-400';
  } else if (eracStage > 0) {
    status = c.eracStage(eracStage);
    tone = 'text-red-400';
  } else if (isOverfrequencyAlert || frequencyHz > SAFE_HIGH_HZ) {
    status = c.overfrequency;
    tone = 'text-amber-400';
  } else if (frequencyHz < SAFE_LOW_HZ) {
    status = c.underfrequency;
    tone = 'text-amber-400';
  }

  const band = (fromHz: number, toHz: number, color: string) => (
    <div
      className={`absolute inset-y-0 ${color}`}
      style={{ left: `${toPercent(fromHz)}%`, width: `${toPercent(toHz) - toPercent(fromHz)}%` }}
    />
  );

  return (
    <div className="select-none">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-slate-500">{c.frequency}</span>
        <span className={tone}>{status}</span>
      </div>

      <div className="mt-1 flex items-baseline gap-1.5">
        <span className={`font-mono tabular-nums text-4xl font-semibold tracking-tight ${tone}`}>
          {formatDecimal(frequencyHz, 3)}
        </span>
        <span className="text-sm text-slate-500">Hz</span>
      </div>

      <div className="mt-3 relative h-1.5 rounded-full bg-slate-800 overflow-hidden">
        {band(SCALE_MIN_HZ, eracStartHz, 'bg-red-500/40')}
        {band(SAFE_LOW_HZ, SAFE_HIGH_HZ, 'bg-emerald-400/70')}
        {band(OVERFREQUENCY_ALERT_HZ, SCALE_MAX_HZ, 'bg-amber-500/40')}
      </div>
      <div className="relative h-3">
        <div
          className={`absolute top-0 w-0.5 h-2.5 -translate-x-1/2 ${isBlackout ? 'bg-red-400' : 'bg-sky-300'}`}
          style={{ left: `${toPercent(frequencyHz)}%` }}
        />
      </div>
      <div className="flex justify-between font-mono text-[10px] text-slate-600">
        <span>{SCALE_MIN_HZ}</span>
        <span>60</span>
        <span>{SCALE_MAX_HZ}</span>
      </div>

      <dl className="mt-3 divide-y divide-slate-800/70 border-y border-slate-800/70 text-xs">
        <div className="py-1.5 flex justify-between">
          <dt className="text-slate-500">RoCoF</dt>
          <dd className="font-mono tabular-nums text-slate-200">{signed(rocofHzS, 3)} Hz/s</dd>
        </div>
        <div className="py-1.5 flex justify-between">
          <dt className="text-slate-500">{c.inertia}</dt>
          <dd className="font-mono tabular-nums text-slate-200">{formatDecimal(inertiaH, 2)} s</dd>
        </div>
        <div className="py-1.5 flex justify-between">
          <dt className="text-slate-500">{c.eracStart}</dt>
          <dd className="font-mono tabular-nums text-slate-200">{formatDecimal(eracStartHz, 1)} Hz</dd>
        </div>
      </dl>
    </div>
  );
};
