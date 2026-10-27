import React, { useMemo, useState } from 'react';
import { energyChainStages } from '../../data/energyChainData';
import { SourcesList } from '../Sources/SourcesList';
import { cn } from '../../utils/cn';
import { useI18n } from '../../i18n/context';
import { localizeStage } from '../../i18n/data/energyChain';
import { useValueChainCopy } from './copy';

export const ValueChainSection: React.FC = () => {
  const { lang } = useI18n();
  const copy = useValueChainCopy();
  const stages = useMemo(() => energyChainStages.map((s) => localizeStage(s, lang)), [lang]);
  const [selectedId, setSelectedId] = useState<string>('comercializacao');

  const activeStage = stages.find((s) => s.id === selectedId) || stages[3];

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-slate-100">{copy.title}</h2>
        <p className="mt-1 text-xs text-slate-400">{copy.intro}</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {stages.map((stage) => {
          const isSelected = stage.id === selectedId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setSelectedId(stage.id)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-md border px-3 py-2.5 text-left transition-colors cursor-pointer',
                isSelected
                  ? 'border-cyan-500/60 bg-slate-900'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
              )}
            >
              <span className={cn('font-mono text-xs tabular-nums', isSelected ? 'text-cyan-300' : 'text-slate-500')}>
                {stage.number}
              </span>
              <span className="block mt-0.5 text-sm font-semibold text-slate-100">{stage.name}</span>
              <span className="block mt-0.5 text-[11px] text-slate-400 line-clamp-2">{stage.subtitle}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-slate-800 pt-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-5">
          <div>
            <h3 className="text-base font-semibold text-slate-100">{activeStage.name}</h3>
            <p className="mt-1 font-mono text-xs text-slate-400">{activeStage.voltage}</p>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">{activeStage.description}</p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-[11px] text-slate-500">{copy.revenueModel}</dt>
              <dd className="mt-1 text-xs text-slate-300 leading-relaxed">{activeStage.revenueModel}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-slate-500">{copy.regulator}</dt>
              <dd className="mt-1 text-xs text-slate-300 leading-relaxed">{activeStage.regulator}</dd>
            </div>
          </dl>

          <div>
            <h4 className="text-[11px] text-slate-500">{copy.highlights}</h4>
            <ul className="mt-2 space-y-2">
              {activeStage.highlights.map((h, i) => {
                const colonIndex = h.indexOf(':');
                return (
                  <li key={i} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="text-slate-600 shrink-0">–</span>
                    {colonIndex !== -1 ? (
                      <span>
                        <strong className="text-slate-100 font-semibold">{h.slice(0, colonIndex)}:</strong>
                        {h.slice(colonIndex + 1)}
                      </span>
                    ) : (
                      <span>{h}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <aside className="w-full lg:w-72 space-y-6">
          <div>
            <h4 className="text-[11px] text-slate-500">{copy.metrics}</h4>
            <dl className="mt-1 divide-y divide-slate-800/70 border-y border-slate-800/70">
              {activeStage.keyMetrics.map((m, i) => (
                <div key={i} className="py-2 flex items-baseline justify-between gap-4">
                  <dt className="text-xs text-slate-500">{m.label}</dt>
                  <dd className="font-mono tabular-nums text-xs text-slate-100 text-right">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h4 className="text-[11px] text-slate-500">{copy.companies}</h4>
            <ul className="mt-1 divide-y divide-slate-800/70 border-y border-slate-800/70">
              {activeStage.mainCompanies.map((c, i) => (
                <li key={i} className="py-2">
                  <span className="block text-xs text-slate-200">{c.name}</span>
                  <span className="block text-[11px] text-slate-500">{c.tag}</span>
                </li>
              ))}
            </ul>
          </div>

          <SourcesList sources={activeStage.sources} />
        </aside>
      </div>
    </section>
  );
};
