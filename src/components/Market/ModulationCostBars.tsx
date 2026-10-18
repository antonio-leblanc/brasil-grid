import React, { useState } from 'react';
import type { MarketMonth } from '../../data/marketData';
import { formatMonth } from './format';

const BAR_COLOR = '#22d3ee';

const WIDTH = 720;
const HEIGHT = 220;
const PAD = { top: 16, right: 16, bottom: 26, left: 44 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;
const BAR_GAP = 2;
const Y_STEP = 5;

interface ModulationCostBarsProps {
  months: MarketMonth[];
}

export const ModulationCostBars: React.FC<ModulationCostBarsProps> = ({ months }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const bars = months.filter((m): m is MarketMonth & { modulacao: number } => m.modulacao !== null);
  const yMax = Math.ceil(Math.max(...bars.map((b) => b.modulacao)) / Y_STEP) * Y_STEP;
  const slot = PLOT_W / bars.length;
  const barW = Math.max(1, slot - BAR_GAP);
  const y = (value: number) => PAD.top + PLOT_H - (Math.max(0, value) / yMax) * PLOT_H;
  const yTicks = Array.from({ length: yMax / Y_STEP + 1 }, (_, i) => i * Y_STEP);
  const januaries = bars.map((b, i) => ({ i, mes: b.mes })).filter(({ mes }) => mes.endsWith('-01'));

  const handleMove = (event: React.PointerEvent<SVGRectElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const idx = Math.floor(((event.clientX - rect.left) / rect.width) * bars.length);
    setHoverIndex(Math.max(0, Math.min(bars.length - 1, idx)));
  };

  const hovered = hoverIndex === null ? null : bars[hoverIndex];
  const hoverLeftPct = hoverIndex === null ? 0 : ((PAD.left + (hoverIndex + 0.5) * slot) / WIDTH) * 100;

  return (
    <figure className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto block"
        role="img"
        aria-label="Custo de modulação do Sudeste por mês, em R$/MWh"
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={PAD.left + PLOT_W} y1={y(tick)} y2={y(tick)} stroke="#1e293b" strokeWidth={1} />
            <text x={PAD.left - 6} y={y(tick) + 3} textAnchor="end" className="fill-slate-500 font-mono text-[10px]">
              {tick}
            </text>
          </g>
        ))}
        {januaries.map(({ i, mes }) => (
          <text
            key={mes}
            x={PAD.left + i * slot}
            y={HEIGHT - 8}
            className="fill-slate-500 font-mono text-[10px]"
          >
            {mes.slice(0, 4)}
          </text>
        ))}

        {bars.map((b, i) => {
          const top = y(b.modulacao);
          const height = Math.max(0, PAD.top + PLOT_H - top);
          return (
            <rect
              key={b.mes}
              x={PAD.left + i * slot + BAR_GAP / 2}
              y={top}
              width={barW}
              height={height}
              rx={Math.min(2, barW / 2)}
              fill={BAR_COLOR}
              opacity={hoverIndex === null || hoverIndex === i ? 1 : 0.45}
            />
          );
        })}

        <rect
          x={PAD.left}
          y={PAD.top}
          width={PLOT_W}
          height={PLOT_H}
          fill="transparent"
          onPointerMove={handleMove}
          onPointerDown={handleMove}
          onPointerLeave={() => setHoverIndex(null)}
        />
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute top-2 rounded-md border border-slate-800 bg-[#090c13]/95 px-2.5 py-2 text-[11px] shadow-lg"
          style={hoverLeftPct > 60 ? { right: `${100 - hoverLeftPct + 2}%` } : { left: `${hoverLeftPct + 2}%` }}
        >
          <div className="mb-0.5 font-mono tabular-nums text-slate-200">{formatMonth(hovered.mes)}</div>
          <div className="font-mono tabular-nums text-slate-100">
            R$ {hovered.modulacao.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}/MWh
          </div>
        </div>
      )}
    </figure>
  );
};
