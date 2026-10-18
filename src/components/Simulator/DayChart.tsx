import React, { useMemo } from 'react';
import type { SimulatorDay } from '../../data/simulatorDayData';
import type { ScheduledTrip } from '../../services/gridPhysics';
import { DAY_SCHEDULED_TRIPS, dayScheduleAt, synchronousInertiaH } from '../../services/gridPhysics';
import { formatDecimal } from '../../utils/format';

interface DayChartProps {
  day: SimulatorDay;
  simTimeSeconds: number;
  pendingTrips: ScheduledTrip[];
}

const DAY_SECONDS = 86400;
const STACK_MAX_MW = 100000;
const INERTIA_MAX_S = 5;
const SAMPLE_STEP_S = 900;
const W = 1000;
const STACK_H = 160;
const INERTIA_H = 40;

const LAYERS = [
  { key: 'hydroMW', label: 'Hidro', fill: '#34d399' },
  { key: 'thermalMW', label: 'Térmica', fill: '#f43f5e' },
  { key: 'windMW', label: 'Eólica', fill: '#38bdf8' },
  { key: 'solarMW', label: 'Solar', fill: '#fbbf24' }
] as const;

const x = (seconds: number) => (seconds / DAY_SECONDS) * W;
const pct = (seconds: number) => `${(Math.max(0, Math.min(DAY_SECONDS, seconds)) / DAY_SECONDS) * 100}%`;

export const DayChart: React.FC<DayChartProps> = ({ day, simTimeSeconds, pendingTrips }) => {
  const { layerPaths, inertiaPath } = useMemo(() => {
    const samples: number[] = [];
    for (let t = 0; t <= DAY_SECONDS; t += SAMPLE_STEP_S) samples.push(t);
    const schedules = samples.map((t) => dayScheduleAt(day, t));
    const y = (mw: number) => STACK_H - (mw / STACK_MAX_MW) * STACK_H;

    const cumulative = schedules.map(() => 0);
    const layerPaths = LAYERS.map((layer) => {
      const lower = [...cumulative];
      schedules.forEach((s, i) => (cumulative[i] += s[layer.key]));
      const top = samples.map((t, i) => `${x(t).toFixed(1)},${y(cumulative[i]).toFixed(1)}`);
      const bottom = samples.map((t, i) => `${x(t).toFixed(1)},${y(lower[i]).toFixed(1)}`).reverse();
      return { ...layer, d: `M${top.join('L')}L${bottom.join('L')}Z` };
    });

    const inertiaPath = schedules
      .map((s, i) => {
        const h = synchronousInertiaH(s.hydroMW, s.thermalMW, s.demandMW);
        return `${i === 0 ? 'M' : 'L'}${x(samples[i]).toFixed(1)},${(INERTIA_H - (h / INERTIA_MAX_S) * INERTIA_H).toFixed(1)}`;
      })
      .join('');

    return { layerPaths, inertiaPath };
  }, [day]);

  const firedTrips = DAY_SCHEDULED_TRIPS.filter((t) => !pendingTrips.some((p) => p.atSeconds === t.atSeconds));

  return (
    <div className="select-none">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs">
        <span className="text-slate-500">Geração verificada do SIN · {day.dateLabel}</span>
        <span className="flex items-center gap-3 text-slate-400">
          {LAYERS.map((l) => (
            <span key={l.key} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: l.fill }} />
              {l.label}
            </span>
          ))}
        </span>
      </div>

      <div className="mt-2 relative">
        <svg viewBox={`0 0 ${W} ${STACK_H}`} preserveAspectRatio="none" className="block w-full h-40">
          {[25000, 50000, 75000].map((mw) => (
            <line
              key={mw}
              x1={0}
              x2={W}
              y1={STACK_H - (mw / STACK_MAX_MW) * STACK_H}
              y2={STACK_H - (mw / STACK_MAX_MW) * STACK_H}
              stroke="#1e293b"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {layerPaths.map((l) => (
            <path key={l.key} d={l.d} fill={l.fill} fillOpacity={0.55} />
          ))}
          <rect x={x(simTimeSeconds)} y={0} width={W - x(simTimeSeconds)} height={STACK_H} fill="#07090e" fillOpacity={0.55} />
        </svg>

        <div className="absolute inset-y-0 right-1 flex flex-col justify-between py-0.5 pointer-events-none font-mono text-[10px] text-slate-500 text-right">
          <span>100 GW</span>
          <span>50</span>
          <span />
        </div>

        {DAY_SCHEDULED_TRIPS.map((trip) => {
          const fired = firedTrips.includes(trip);
          return (
            <div
              key={trip.atSeconds}
              className="absolute inset-y-0 border-l border-dashed border-red-400/60 pointer-events-none"
              style={{ left: pct(trip.atSeconds) }}
            >
              <span className={`absolute top-0 left-1 font-mono text-[10px] whitespace-nowrap ${fired ? 'text-red-400' : 'text-red-400/60'}`}>
                −{formatDecimal(trip.mw / 1000, 1)} GW
              </span>
            </div>
          );
        })}

        <div className="absolute inset-y-0 w-px bg-slate-100 pointer-events-none" style={{ left: pct(simTimeSeconds) }} />
      </div>

      <div className="mt-1 relative">
        <svg viewBox={`0 0 ${W} ${INERTIA_H}`} preserveAspectRatio="none" className="block w-full h-10">
          <path d={inertiaPath} fill="none" stroke="#cbd5e1" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute top-0 left-1 text-[10px] text-slate-500">
          Inércia H <span className="font-mono">0–{INERTIA_MAX_S} s</span>
        </span>
        <div className="absolute inset-y-0 w-px bg-slate-100 pointer-events-none" style={{ left: pct(simTimeSeconds) }} />
      </div>

      <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-600">
        {[0, 6, 12, 18, 24].map((h) => (
          <span key={h}>{String(h).padStart(2, '0')}h</span>
        ))}
      </div>
    </div>
  );
};
