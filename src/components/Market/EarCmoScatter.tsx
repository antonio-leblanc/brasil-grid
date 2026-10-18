import React, { useState } from 'react';
import type { MarketMonth } from '../../data/marketData';
import { formatBRL, formatMonth } from './format';

// 2025 em diante é destaque; antes disso, cinza de contexto (não é série categórica).
// Separação ΔE e contraste contra #07090e conferidos no validador de paleta.
const NEW_REGIME_FROM = 2025;
const NEW_COLOR = '#22d3ee';
const OLD_COLOR = '#64748b';

const WIDTH = 720;
const HEIGHT = 340;
const PAD = { top: 28, right: 16, bottom: 34, left: 44 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;
const X_MIN = 20;
const X_MAX = 90;
// Jul–set/2021 (até R$ 2.540) achatariam todo o resto; ficam presos no topo com o valor escrito.
const Y_MAX = 600;

const isNewRegime = (m: MarketMonth) => Number(m.mes.slice(0, 4)) >= NEW_REGIME_FROM;

interface EarCmoScatterProps {
  months: MarketMonth[];
}

export const EarCmoScatter: React.FC<EarCmoScatterProps> = ({ months }) => {
  const [hovered, setHovered] = useState<MarketMonth | null>(null);

  const x = (ear: number) => PAD.left + ((ear - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
  const y = (cmo: number) => PAD.top + PLOT_H - (Math.min(cmo, Y_MAX) / Y_MAX) * PLOT_H;
  const xTicks = [20, 30, 40, 50, 60, 70, 80, 90];
  const yTicks = [0, 100, 200, 300, 400, 500, 600];

  const ordered = [...months].sort((a, b) => Number(isNewRegime(a)) - Number(isNewRegime(b)));
  const clipped = months.filter((m) => m.cmo > Y_MAX);
  const firstYear = months[0]?.mes.slice(0, 4);
  const hoveredPos = hovered ? { left: (x(hovered.earBrasil) / WIDTH) * 100, top: (y(hovered.cmo) / HEIGHT) * 100 } : null;

  return (
    <figure className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: NEW_COLOR }} />
          <span className="font-mono tabular-nums">{NEW_REGIME_FROM}–hoje</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: OLD_COLOR }} />
          <span className="font-mono tabular-nums">{firstYear}–{NEW_REGIME_FROM - 1}</span>
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto block"
          role="img"
          aria-label="Um ponto por mês: EAR do Brasil no eixo horizontal, CMO médio do Sudeste no vertical"
        >
          {yTicks.map((tick) => (
            <g key={tick}>
              <line x1={PAD.left} x2={PAD.left + PLOT_W} y1={y(tick)} y2={y(tick)} stroke="#1e293b" strokeWidth={1} />
              <text x={PAD.left - 6} y={y(tick) + 3} textAnchor="end" className="fill-slate-500 font-mono text-[10px]">
                {tick}
              </text>
            </g>
          ))}
          {xTicks.map((tick) => (
            <text key={tick} x={x(tick)} y={PAD.top + PLOT_H + 14} textAnchor="middle" className="fill-slate-500 font-mono text-[10px]">
              {tick}%
            </text>
          ))}
          <text x={PAD.left} y={PAD.top - 14} className="fill-slate-500 text-[10px]">CMO médio do mês, R$/MWh</text>
          <text x={PAD.left + PLOT_W} y={HEIGHT - 4} textAnchor="end" className="fill-slate-500 text-[10px]">
            EAR Brasil, média do mês (% da capacidade)
          </text>

          {clipped.length > 0 && (
            <text x={x(clipped[0].earBrasil) + 8} y={PAD.top - 2} className="fill-slate-400 font-mono text-[10px]">
              ↑ {clipped.map((m) => `${formatMonth(m.mes)} R$ ${formatBRL(m.cmo)}`).join(' · ')}
            </text>
          )}

          {ordered.map((m) => (
            <circle
              key={m.mes}
              cx={x(m.earBrasil)}
              cy={y(m.cmo)}
              r={hovered?.mes === m.mes ? 6 : 4}
              fill={m.cmo > Y_MAX ? '#07090e' : isNewRegime(m) ? NEW_COLOR : OLD_COLOR}
              stroke={m.cmo > Y_MAX ? OLD_COLOR : '#07090e'}
              strokeWidth={m.cmo > Y_MAX ? 1.5 : 2}
            />
          ))}

          {ordered.map((m) => (
            <circle
              key={`hit-${m.mes}`}
              cx={x(m.earBrasil)}
              cy={y(m.cmo)}
              r={10}
              fill="transparent"
              onPointerEnter={() => setHovered(m)}
              onPointerDown={() => setHovered(m)}
              onPointerLeave={() => setHovered(null)}
            />
          ))}
        </svg>

        {hovered && hoveredPos && (
          <div
            className="pointer-events-none absolute rounded-md border border-slate-800 bg-[#090c13]/95 px-2.5 py-2 text-[11px] shadow-lg"
            style={{
              top: `${Math.min(hoveredPos.top, 70)}%`,
              ...(hoveredPos.left > 60 ? { right: `${100 - hoveredPos.left + 2}%` } : { left: `${hoveredPos.left + 2}%` })
            }}
          >
            <div className="mb-1 font-mono tabular-nums text-slate-200">{formatMonth(hovered.mes)}</div>
            <div className="flex justify-between gap-4 text-slate-400">
              <span>EAR Brasil</span>
              <span className="font-mono tabular-nums text-slate-100">{hovered.earBrasil.toLocaleString('pt-BR')}%</span>
            </div>
            <div className="flex justify-between gap-4 text-slate-400">
              <span>CMO SE</span>
              <span className="font-mono tabular-nums text-slate-100">R$ {formatBRL(hovered.cmo)}</span>
            </div>
          </div>
        )}
      </div>
    </figure>
  );
};
