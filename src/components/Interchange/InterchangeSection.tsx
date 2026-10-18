import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  regionalInterchanges,
  getInterchangeStatus,
  getStatusTheme,
  calculateSubsystemsBalance
} from '../../data/interchangeData';
import type { InterchangeId, InterchangeStatus } from '../../data/interchangeData';
import { SourcesList } from '../Sources/SourcesList';
import { SegmentedControl, type SegmentOption } from '../Controls/SegmentedControl';
import { formatDecimal } from '../../utils/format';

interface InterchangeSectionProps {
  selectedId: InterchangeId;
  onSelect: (id: InterchangeId) => void;
}

type View = 'fronteiras' | 'curva' | 'dossie';

const VIEW_OPTIONS: SegmentOption<View>[] = [
  { value: 'fronteiras', label: 'Fronteiras' },
  { value: 'curva', label: 'Curva 24h' },
  { value: 'dossie', label: 'Dossiê do gargalo' }
];

const INTERCHANGE_OPTIONS: SegmentOption<InterchangeId>[] = regionalInterchanges.map((ic) => ({
  value: ic.id,
  label: <span className="font-mono">{ic.shortCode}</span>
}));

const STATUS_LABEL: Record<InterchangeStatus, string> = {
  nominal: 'nominal',
  alert: 'alerta',
  critical: 'crítico'
};

const formatGW = (mw: number) => formatDecimal(mw / 1000, 2);

const CHART_X0 = 60;
const CHART_W = 710;

export const InterchangeSection: React.FC<InterchangeSectionProps> = ({ selectedId, onSelect }) => {
  const [view, setView] = useState<View>('fronteiras');
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const activeInterchange = regionalInterchanges.find((ic) => ic.id === selectedId) ?? regionalInterchanges[0];

  const subsystemsBalance = useMemo(() => calculateSubsystemsBalance(regionalInterchanges), []);
  const totalInterchangeMW = regionalInterchanges.reduce((sum, ic) => sum + Math.abs(ic.nominalFlowMW), 0);

  const openView = (id: InterchangeId, next: View) => {
    onSelect(id);
    setView(next);
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-slate-100">Intercâmbios</h2>
        <p className="mt-1 text-xs text-slate-400">
          Potência ativa entre subsistemas contra o limite operativo do ONS. Em trânsito agora:{' '}
          <span className="font-mono tabular-nums text-slate-200">{formatGW(totalInterchangeMW)} GW</span>.
        </p>
        <p className="mt-1 text-[11px] text-amber-400">Snapshot de referência, não telemetria em tempo real.</p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <SegmentedControl options={VIEW_OPTIONS} value={view} onChange={setView} />
        {view !== 'fronteiras' && <SegmentedControl options={INTERCHANGE_OPTIONS} value={selectedId} onChange={onSelect} />}
      </div>

      {view === 'fronteiras' && (
        <div className="space-y-6">
          <div>
            <p className="text-[11px] text-slate-500 mb-2">Saldo líquido por subsistema (soma das fronteiras)</p>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 border-y border-slate-800/70 py-4">
              {(Object.keys(subsystemsBalance) as (keyof typeof subsystemsBalance)[]).map((code) => {
                const item = subsystemsBalance[code];
                const isExporter = item.netExportMW > 0;
                return (
                  <div key={code}>
                    <dt className="text-[11px] text-slate-500">{item.shortName}</dt>
                    <dd className={`mt-0.5 font-mono tabular-nums text-lg ${isExporter ? 'text-cyan-300' : 'text-amber-300'}`}>
                      {isExporter ? '+' : ''}
                      {formatGW(item.netExportMW)} <span className="text-xs text-slate-500">GW</span>
                    </dd>
                    <dd className="mt-0.5 text-[11px] text-slate-500">{isExporter ? 'exportando' : 'importando'}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {regionalInterchanges.map((ic) => {
              const isSelected = ic.id === selectedId;
              const status = getInterchangeStatus(ic.nominalFlowMW, ic.maxExportLimitMW);
              const theme = getStatusTheme(status);
              const saturationPct = (Math.abs(ic.nominalFlowMW) / ic.maxExportLimitMW) * 100;
              const marginMW = ic.maxExportLimitMW - Math.abs(ic.nominalFlowMW);

              return (
                <div
                  key={ic.id}
                  onClick={() => onSelect(ic.id)}
                  className={`p-4 rounded-md border transition-colors cursor-pointer space-y-3 ${
                    isSelected ? 'border-cyan-500/60 bg-slate-900/60' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm text-slate-100">
                        <span className="font-mono">{ic.shortCode}</span>
                        <span className="ml-2 text-slate-400">{ic.name}</span>
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                        {ic.fromName}
                        <ArrowRight className="w-3 h-3" />
                        {ic.toName}
                        <span className="text-slate-700">·</span>
                        <span className="font-mono">{ic.voltageKV.join(' / ')} kV</span>
                      </p>
                    </div>
                    <span className={`text-[11px] ${theme.badgeText}`}>{STATUS_LABEL[status]}</span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[11px] text-slate-500">Carregamento</p>
                      <p className="font-mono tabular-nums text-xl" style={{ color: theme.color }}>
                        {formatDecimal(saturationPct, 1)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-500">Margem</p>
                      <p className="font-mono tabular-nums text-base text-slate-100">{formatGW(marginMW)} GW</p>
                    </div>
                  </div>

                  <div>
                    <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.min(100, saturationPct)}%`, backgroundColor: theme.color }}
                      />
                      <div className="absolute inset-y-0 w-px bg-amber-500/60" style={{ left: '70%' }} title="Alerta: 70%" />
                      <div className="absolute inset-y-0 w-px bg-red-500/80" style={{ left: '90%' }} title="Crítico: 90%" />
                    </div>
                    <p className="mt-1 flex justify-between text-[11px] font-mono tabular-nums text-slate-500">
                      <span>
                        fluxo <span className="text-slate-300">{formatGW(ic.nominalFlowMW)} GW</span>
                      </span>
                      <span>
                        limite <span className="text-slate-300">{formatGW(ic.maxExportLimitMW)} GW</span>
                      </span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-500 truncate">{ic.mainLines[0]}</span>
                    <span className="flex shrink-0 gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openView(ic.id, 'curva');
                        }}
                        className="text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer"
                      >
                        Curva 24h
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openView(ic.id, 'dossie');
                        }}
                        className="text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer"
                      >
                        Dossiê
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'curva' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                {activeInterchange.name} <span className="font-mono font-normal text-slate-500">{activeInterchange.shortCode}</span>
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-500">Perfil horário ilustrativo contra o limite operativo do ONS</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-sky-400" />
                Fluxo de referência
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 border-t border-dashed border-red-400" />
                Limite ONS
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[620px]">
              <svg viewBox="0 0 800 280" className="w-full h-64 select-none">
                {[0, 50, 100, 150, 200, 250].map((y) => (
                  <line key={y} x1="50" y1={y + 10} x2="780" y2={y + 10} stroke="#1e293b" strokeDasharray="2 3" />
                ))}

                {(() => {
                  const maxLimit = activeInterchange.maxExportLimitMW;
                  const minLimit = -activeInterchange.maxImportLimitMW;
                  const getY = (mw: number) => 260 - ((mw - minLimit) / (maxLimit - minLimit)) * 240;
                  const getX = (i: number) => CHART_X0 + (i / 23) * CHART_W;

                  const points = activeInterchange.hourlyProfile24h;
                  const pathD = points
                    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(p.flowMW).toFixed(1)}`)
                    .join(' ');
                  const limitY = getY(maxLimit);
                  const zeroY = getY(0);

                  return (
                    <>
                      <line x1="50" y1={zeroY} x2="780" y2={zeroY} stroke="#475569" strokeWidth="1.2" />
                      <text x="42" y={zeroY + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                        0
                      </text>

                      <line x1="50" y1={limitY} x2="780" y2={limitY} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
                      <text x="42" y={limitY + 3} fill="#ef4444" fontSize="9" textAnchor="end" fontFamily="monospace">
                        {formatDecimal(maxLimit / 1000, 1)}G
                      </text>
                      <rect x={CHART_X0} y={limitY} width={CHART_W} height={Math.max(0, limitY - 10)} fill="#ef4444" fillOpacity="0.05" />

                      <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                      {points.map((p, i) => {
                        const x = getX(i);
                        const y = getY(p.flowMW);
                        const isHovered = hoveredHour === p.hour;
                        const isOverSat = p.saturationPct >= 90;

                        return (
                          <g
                            key={p.hour}
                            onMouseEnter={() => setHoveredHour(p.hour)}
                            onMouseLeave={() => setHoveredHour(null)}
                            className="cursor-pointer"
                          >
                            <line x1={x} y1="260" x2={x} y2="265" stroke="#334155" />
                            {p.hour % 3 === 0 && (
                              <text x={x} y="276" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">
                                {p.timeLabel}
                              </text>
                            )}
                            <circle
                              cx={x}
                              cy={y}
                              r={isHovered ? 5 : isOverSat ? 3.5 : 2.5}
                              fill={isOverSat ? '#ef4444' : isHovered ? '#38bdf8' : '#0284c7'}
                              stroke="#07090e"
                              strokeWidth="1.5"
                            />
                            {isHovered && (
                              <>
                                <line x1={x} y1="20" x2={x} y2="260" stroke="#0ea5e9" strokeDasharray="2 2" />
                                <g transform={`translate(${Math.min(680, Math.max(60, x - 55))}, ${Math.max(25, y - 45)})`}>
                                  <rect width="110" height="38" rx="4" fill="#07090e" stroke="#334155" />
                                  <text x="8" y="14" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                                    {p.timeLabel} · {p.saturationPct}% sat
                                  </text>
                                  <text x="8" y="28" fill="#f1f5f9" fontSize="11" fontFamily="monospace">
                                    {p.flowMW > 0 ? '+' : ''}
                                    {p.flowMW} MW
                                  </text>
                                </g>
                              </>
                            )}
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Positivo: sentido principal ({activeInterchange.primaryDirection}). Negativo: fluxo reverso (
            {activeInterchange.reverseDirection}). Pontos vermelhos acima de 90% indicam risco de{' '}
            <em>curtailment</em> por gargalo de rede.
          </p>
        </div>
      )}

      {view === 'dossie' && (
        <article className="space-y-6">
          <h3 className="text-sm font-semibold text-slate-100">
            {activeInterchange.name} <span className="font-mono font-normal text-slate-500">{activeInterchange.shortCode}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Causa física', color: 'text-amber-300', text: activeInterchange.bottleneck.cause },
              { title: 'Impacto na operação e no mercado', color: 'text-red-300', text: activeInterchange.bottleneck.consequences },
              { title: 'Solução de engenharia', color: 'text-emerald-300', text: activeInterchange.bottleneck.mitigation }
            ].map((pillar) => (
              <div key={pillar.title}>
                <h4 className={`text-[11px] ${pillar.color}`}>{pillar.title}</h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-[11px] text-slate-500">Troncos da interface</h4>
              <span className="text-[11px] text-slate-500">{activeInterchange.bottleneck.technicalStandard}</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {activeInterchange.mainLines.map((line) => (
                <li key={line} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
            <SourcesList sources={activeInterchange.sources} />
          </div>
        </article>
      )}
    </section>
  );
};
