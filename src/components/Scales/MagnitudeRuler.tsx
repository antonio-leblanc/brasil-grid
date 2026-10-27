import React, { useMemo, useState } from 'react';
import { scaleLevels, powerVsEnergyExplainer } from '../../data/scaleData';
import { SourcesList } from '../Sources/SourcesList';
import { cn } from '../../utils/cn';
import { useI18n } from '../../i18n/context';
import { localizeExplainer, localizeScaleLevel } from '../../i18n/data/scales';
import { useScalesCopy } from './copy';

const ExplainerColumn: React.FC<{
  entry: typeof powerVsEnergyExplainer.power;
  kind: string;
  accent: string;
}> = ({ entry, kind, accent }) => (
  <div>
    <h4 className={cn('text-sm font-semibold', accent)}>
      {entry.title}
      <span className="ml-2 text-[11px] font-normal text-slate-500">{kind}</span>
    </h4>
    <p className="mt-1 text-xs text-slate-400 italic">“{entry.analogy}”</p>
    <p className="mt-2 text-xs text-slate-300 leading-relaxed">{entry.meaning}</p>
  </div>
);

export const MagnitudeRuler: React.FC = () => {
  const { lang } = useI18n();
  const copy = useScalesCopy();
  const levels = useMemo(() => scaleLevels.map((l) => localizeScaleLevel(l, lang)), [lang]);
  const explainer = localizeExplainer(lang);
  const [selectedUnit, setSelectedUnit] = useState<string>('GW');

  const currentLevel = levels.find((s) => s.unit === selectedUnit) || levels[3];

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-slate-100">{copy.title}</h2>
        <p className="mt-1 text-xs text-slate-400">{copy.intro}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 border-y border-slate-800/70 py-5">
        <ExplainerColumn entry={explainer.power} kind={copy.instantaneous} accent="text-amber-400" />
        <ExplainerColumn entry={explainer.energy} kind={copy.cumulative} accent="text-cyan-300" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {levels.map((lvl) => {
          const isSelected = lvl.unit === selectedUnit;
          return (
            <button
              key={lvl.unit}
              type="button"
              onClick={() => setSelectedUnit(lvl.unit)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-md border px-3 py-2 text-left transition-colors cursor-pointer',
                isSelected
                  ? 'border-cyan-500/60 bg-slate-900'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
              )}
            >
              <span className={cn('block font-mono text-lg', isSelected ? 'text-cyan-300' : 'text-slate-400')}>
                {lvl.unit}
              </span>
              <span className="block text-[11px] text-slate-500">{lvl.name}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        <div>
          <h3 className="text-base font-semibold text-slate-100">
            {currentLevel.unit} · {currentLevel.name}
            <span className="ml-3 font-mono text-xs font-normal text-slate-500">{currentLevel.factor}</span>
          </h3>
          <p className="mt-1 text-sm text-slate-300 leading-relaxed">{currentLevel.concept}</p>
        </div>

        <ul className="divide-y divide-slate-800/70 border-y border-slate-800/70">
          {currentLevel.examples.map((ex, i) => (
            <li key={i} className="py-3 grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] gap-4">
              <span className="font-mono tabular-nums text-xs text-amber-400">{ex.power}</span>
              <div>
                <p className="text-xs font-semibold text-slate-100">{ex.item}</p>
                <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">{ex.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <SourcesList sources={currentLevel.sources} />
      </div>
    </section>
  );
};
