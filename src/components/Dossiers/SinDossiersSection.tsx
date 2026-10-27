import React, { useMemo, useState } from 'react';
import { sinDossiers } from '../../data/sinDossiersData';
import { SourcesList } from '../Sources/SourcesList';
import { cn } from '../../utils/cn';
import { useI18n } from '../../i18n/context';
import { localizeDossier } from '../../i18n/data/sinDossiers';
import { useDossiersCopy } from './copy';

type StepBadgeType = (typeof sinDossiers)[number]['steps'][number]['badgeType'];

const STEP_TAG_COLOR: Record<NonNullable<StepBadgeType>, string> = {
  danger: 'text-rose-400',
  warning: 'text-amber-400',
  info: 'text-cyan-300',
  success: 'text-emerald-400',
  neutral: 'text-slate-400'
};

const BADGE_COLOR: Record<(typeof sinDossiers)[number]['badgeColor'], string> = {
  rose: 'text-rose-400',
  cyan: 'text-cyan-300',
  amber: 'text-amber-400',
  emerald: 'text-emerald-400'
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[11px] text-slate-500">{children}</h4>
);

export const SinDossiersSection: React.FC = () => {
  const { lang } = useI18n();
  const copy = useDossiersCopy();
  const dossiers = useMemo(() => sinDossiers.map((d) => localizeDossier(d, lang)), [lang]);
  const [activeDossierId, setActiveDossierId] = useState<string>(sinDossiers[0].id);

  const activeDossier = dossiers.find((d) => d.id === activeDossierId) ?? dossiers[0];

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-slate-100">{copy.title}</h2>
        <p className="mt-1 text-xs text-slate-400">{copy.intro}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {dossiers.map((dossier) => {
          const isSelected = dossier.id === activeDossier.id;
          return (
            <button
              key={dossier.id}
              type="button"
              onClick={() => setActiveDossierId(dossier.id)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-md border px-3 py-2 text-left text-xs transition-colors cursor-pointer',
                isSelected
                  ? 'border-cyan-500/60 bg-slate-900 text-slate-100'
                  : 'border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 hover:bg-slate-900/50'
              )}
            >
              <span className="font-semibold leading-snug line-clamp-2">{dossier.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      <article className="border-t border-slate-800 pt-6 space-y-8">
        <div>
          <p className={cn('text-[11px]', BADGE_COLOR[activeDossier.badgeColor])}>{activeDossier.badge}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100 leading-snug">{activeDossier.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{activeDossier.subtitle}</p>
          <p className="mt-4 text-sm text-slate-300 leading-relaxed">{activeDossier.summary}</p>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 border-y border-slate-800/70 py-4">
          {activeDossier.keyMetrics.map((metric, idx) => (
            <div key={idx}>
              <dt className="text-[11px] text-slate-500">{metric.label}</dt>
              <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">{metric.value}</dd>
              <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">{metric.detail}</dd>
            </div>
          ))}
        </dl>

        {activeDossier.keyFormulas && activeDossier.keyFormulas.length > 0 && (
          <div className="space-y-3">
            <Label>{copy.formulas}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {activeDossier.keyFormulas.map((formula, idx) => (
                <div key={idx} className="space-y-1.5">
                  <p className="text-xs font-semibold text-slate-200">{formula.label}</p>
                  <code className="block px-3 py-2 rounded-md bg-slate-900 border border-slate-800 font-mono text-sm text-cyan-200 overflow-x-auto">
                    {formula.formula}
                  </code>
                  <p className="text-xs text-slate-400 leading-relaxed">{formula.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Label>{activeDossier.stepsTitle}</Label>
          <ol className="border-l border-slate-800 space-y-5">
            {activeDossier.steps.map((step, idx) => (
              <li key={idx} className="relative pl-5">
                <span className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-slate-500" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  {step.time && <span className="font-mono tabular-nums text-xs text-cyan-300">{step.time}</span>}
                  <h5 className="text-sm font-semibold text-slate-100">{step.title}</h5>
                  {step.tag && (
                    <span className={cn('text-[11px]', STEP_TAG_COLOR[step.badgeType ?? 'neutral'])}>{step.tag}</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{step.description}</p>
                {step.technicalDetail && (
                  <p className="mt-1.5 text-[11px] text-slate-400 leading-relaxed">
                    <span className="text-slate-500">{copy.technicalNote}</span>
                    {step.technicalDetail}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-3 border-t border-slate-800 pt-6">
          <Label>{copy.lessons}</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            {activeDossier.lessonsLearned.map((lesson, idx) => (
              <div key={idx}>
                <h5 className="text-xs font-semibold text-slate-100 leading-snug">{lesson.title}</h5>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{lesson.desc}</p>
              </div>
            ))}
          </div>
          <SourcesList sources={activeDossier.sources} className="mt-4" />
        </div>
      </article>
    </section>
  );
};
