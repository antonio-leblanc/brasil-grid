import React, { useState } from 'react';
import type { CmoYearProfile } from '../../data/marketData';
import { formatBRL } from './format';

// Anos até 2023 têm perfil plano e ficam como contexto; a rampa ciano (validada contra #07090e)
// só marca os anos em que a curva do pato existe, do mais fraco ao mais forte.
const DUCK_YEAR_COLORS: Record<number, string> = {
  2024: '#0e7490',
  2025: '#22d3ee',
  2026: '#a5f3fc'
};
const CONTEXT_COLOR = '#475569';

const WIDTH = 720;
const HEIGHT = 320;
const PAD = { top: 16, right: 92, bottom: 28, left: 44 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;
const SLOTS = 48;
const Y_STEP = 100;

const formatSlot = (slot: number) =>
  `${String(Math.floor(slot / 2)).padStart(2, '0')}:${slot % 2 === 0 ? '00' : '30'}`;

const LABEL_GAP = 12;

// Linhas que terminam perto uma da outra teriam rótulos sobrepostos; empurra pra baixo o que encosta.
const spreadLabels = (labels: { id: number; y: number }[]) => {
  const placed = new Map<number, number>();
  let previous = -Infinity;
  for (const label of [...labels].sort((a, b) => a.y - b.y)) {
    previous = Math.max(label.y, previous + LABEL_GAP);
    placed.set(label.id, previous);
  }
  return placed;
};

const colorFor = (ano: number) => DUCK_YEAR_COLORS[ano] ?? CONTEXT_COLOR;

interface CmoHourlyProfileChartProps {
  years: CmoYearProfile[];
  lastDataLabel: string;
}

export const CmoHourlyProfileChart: React.FC<CmoHourlyProfileChartProps> = ({ years, lastDataLabel }) => {
  const [hoverSlot, setHoverSlot] = useState<number | null>(null);

  const maxValue = Math.max(...years.flatMap((y) => y.cmo));
  const yMax = Math.ceil(maxValue / Y_STEP) * Y_STEP;
  const x = (slot: number) => PAD.left + (slot / (SLOTS - 1)) * PLOT_W;
  const y = (value: number) => PAD.top + PLOT_H - (value / yMax) * PLOT_H;
  const yTicks = Array.from({ length: yMax / Y_STEP + 1 }, (_, i) => i * Y_STEP);

  // Contexto desenhado primeiro, anos da curva do pato por cima.
  const drawOrder = [...years].sort((a, b) => Number(a.ano in DUCK_YEAR_COLORS) - Number(b.ano in DUCK_YEAR_COLORS));
  const pathFor = (values: number[]) => values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');

  const duckYears = years.filter((yr) => yr.ano in DUCK_YEAR_COLORS);
  const endLabelY = spreadLabels(duckYears.map((yr) => ({ id: yr.ano, y: y(yr.cmo[SLOTS - 1]) })));
  const contextYears = years.filter((yr) => !(yr.ano in DUCK_YEAR_COLORS));

  const handleMove = (event: React.PointerEvent<SVGRectElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    setHoverSlot(Math.max(0, Math.min(SLOTS - 1, Math.round(ratio * (SLOTS - 1)))));
  };

  const tooltipLeftPct = hoverSlot === null ? 0 : (x(hoverSlot) / WIDTH) * 100;

  return (
    <figure className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
        {duckYears.map((yr) => (
          <span key={yr.ano} className="flex items-center gap-1.5">
            <span className="w-3 h-0.5" style={{ backgroundColor: colorFor(yr.ano) }} />
            <span className="font-mono tabular-nums">{yr.parcial ? `${yr.ano} (até ${lastDataLabel})` : yr.ano}</span>
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5" style={{ backgroundColor: CONTEXT_COLOR }} />
          <span className="font-mono tabular-nums">
            {contextYears[0]?.ano}–{contextYears[contextYears.length - 1]?.ano}
          </span>
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto block"
          role="img"
          aria-label="CMO médio do Sudeste por meia hora do dia, uma linha por ano"
        >
          {yTicks.map((tick) => (
            <g key={tick}>
              <line x1={PAD.left} x2={PAD.left + PLOT_W} y1={y(tick)} y2={y(tick)} stroke="#1e293b" strokeWidth={1} />
              <text x={PAD.left - 6} y={y(tick) + 3} textAnchor="end" className="fill-slate-500 font-mono text-[10px]">
                {tick}
              </text>
            </g>
          ))}
          {[0, 6, 12, 18, 23].map((hour) => (
            <text
              key={hour}
              x={x(hour * 2)}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-slate-500 font-mono text-[10px]"
            >
              {`${String(hour).padStart(2, '0')}h`}
            </text>
          ))}
          <text x={PAD.left} y={PAD.top - 5} className="fill-slate-500 text-[10px]">R$/MWh</text>

          {drawOrder.map((yr) => (
            <path
              key={yr.ano}
              d={pathFor(yr.cmo)}
              fill="none"
              stroke={colorFor(yr.ano)}
              strokeWidth={yr.ano in DUCK_YEAR_COLORS ? 2 : 1.25}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {duckYears.map((yr) => (
            <text
              key={yr.ano}
              x={x(SLOTS - 1) + 6}
              y={endLabelY.get(yr.ano)! + 3}
              className="fill-slate-300 font-mono text-[10px]"
            >
              {yr.ano}
            </text>
          ))}
          {contextYears
            .filter((yr) => yr.ano === 2021)
            .map((yr) => (
              <text key={yr.ano} x={x(SLOTS - 1) + 6} y={y(yr.cmo[SLOTS - 1]) + 3} className="fill-slate-500 font-mono text-[10px]">
                2021 · seca
              </text>
            ))}

          {hoverSlot !== null && (
            <g>
              <line x1={x(hoverSlot)} x2={x(hoverSlot)} y1={PAD.top} y2={PAD.top + PLOT_H} stroke="#64748b" strokeWidth={1} />
              {duckYears.map((yr) => (
                <circle
                  key={yr.ano}
                  cx={x(hoverSlot)}
                  cy={y(yr.cmo[hoverSlot])}
                  r={4}
                  fill={colorFor(yr.ano)}
                  stroke="#07090e"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}

          <rect
            x={PAD.left}
            y={PAD.top}
            width={PLOT_W}
            height={PLOT_H}
            fill="transparent"
            onPointerMove={handleMove}
            onPointerDown={handleMove}
            onPointerLeave={() => setHoverSlot(null)}
          />
        </svg>

        {hoverSlot !== null && (
          <div
            className="pointer-events-none absolute top-2 rounded-md border border-slate-800 bg-[#090c13]/95 px-2.5 py-2 text-[11px] shadow-lg"
            style={
              tooltipLeftPct > 55
                ? { right: `${100 - tooltipLeftPct + 2}%` }
                : { left: `${tooltipLeftPct + 2}%` }
            }
          >
            <div className="mb-1 font-mono tabular-nums text-slate-200">{formatSlot(hoverSlot)}</div>
            <ul className="space-y-0.5">
              {[...years].reverse().map((yr) => (
                <li key={yr.ano} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2 h-0.5" style={{ backgroundColor: colorFor(yr.ano) }} />
                    <span className="font-mono tabular-nums">{yr.ano}</span>
                  </span>
                  <span className="font-mono tabular-nums text-slate-100">R$ {formatBRL(yr.cmo[hoverSlot])}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </figure>
  );
};
