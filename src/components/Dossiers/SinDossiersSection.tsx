import React, { useState } from 'react';
import { sinDossiers } from '../../data/sinDossiersData';
import {
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  BookOpen,
  Info
} from 'lucide-react';
import { SourcesList } from '../Sources/SourcesList';
import { cn } from '../../utils/cn';

export const SinDossiersSection: React.FC = () => {
  const [activeDossierId, setActiveDossierId] = useState<string>(sinDossiers[0].id);

  const activeDossier =
    sinDossiers.find((d) => d.id === activeDossierId) ?? sinDossiers[0];

  const getBadgeColors = (color: string) => {
    switch (color) {
      case 'rose':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      case 'cyan':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      default:
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    }
  };

  const getStepBadgeColor = (type?: string) => {
    switch (type) {
      case 'danger':
        return 'border-rose-500/50 bg-rose-950/30 text-rose-300';
      case 'warning':
        return 'border-amber-500/50 bg-amber-950/30 text-amber-300';
      case 'info':
        return 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300';
      case 'success':
        return 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>DOSSIÊS TÉCNICOS & FÍSICA DO SIN</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Engenharia de Sistemas, Física & Despacho
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Análises de engenharia sobre eventos críticos, modelagem matemática de despacho e dinâmica física de redes com alta penetração renovável.
        </p>
      </div>

      {/* Dossier Selector Navigation */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs font-mono">
          {sinDossiers.map((dossier) => {
            const isSelected = dossier.id === activeDossier.id;
            return (
              <button
                key={dossier.id}
                type="button"
                onClick={() => setActiveDossierId(dossier.id)}
                className={cn(
                  'px-3 py-2.5 rounded-lg flex flex-col items-start transition text-left cursor-pointer border',
                  isSelected
                    ? 'bg-slate-800 border-cyan-500/50 text-white shadow-lg shadow-cyan-950/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                )}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
                    )}
                  />
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider line-clamp-1">
                    {dossier.badge.split('&')[0]}
                  </span>
                </div>
                <span className="font-semibold text-xs leading-tight line-clamp-1">
                  {dossier.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Dossier Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-8">
        {/* Dossier Header */}
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'font-mono text-xs px-2.5 py-0.5 rounded border font-semibold tracking-wider',
                getBadgeColors(activeDossier.badgeColor)
              )}
            >
              {activeDossier.badge}
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {activeDossier.title}
            </h3>
            <p className="text-sm sm:text-base text-cyan-300/90 font-mono mt-1">
              {activeDossier.subtitle}
            </p>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {activeDossier.summary}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {activeDossier.keyMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-1"
            >
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                {metric.label}
              </span>
              <div className="font-mono text-lg sm:text-xl font-bold text-white">
                {metric.value}
              </div>
              <p className="text-[11px] text-slate-500 font-sans leading-tight">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Key Formulas / Physical Dynamics (if present) */}
        {activeDossier.keyFormulas && activeDossier.keyFormulas.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="uppercase tracking-wider font-semibold">
                Formulações Físicas & Modelagem Matemática
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeDossier.keyFormulas.map((formula, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 border border-cyan-900/40 rounded-xl p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-cyan-300">{formula.label}</span>
                  </div>
                  <div className="bg-black/60 p-3 rounded-lg border border-slate-800 font-mono text-sm text-emerald-400 font-semibold overflow-x-auto">
                    <code>{formula.formula}</code>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {formula.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Chronology / Model Hierarchy Steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="uppercase tracking-wider font-semibold">
                {activeDossier.stepsTitle}
              </span>
            </div>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-6">
            {activeDossier.steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Node pin */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-2.5 transition hover:border-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      {step.time && (
                        <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                          <Clock className="w-3 h-3" />
                          <span>{step.time}</span>
                        </div>
                      )}
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {step.title}
                      </h4>
                    </div>

                    {step.tag && (
                      <span
                        className={cn(
                          'text-[10px] font-mono px-2 py-0.5 rounded border font-semibold',
                          getStepBadgeColor(step.badgeType)
                        )}
                      >
                        {step.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {step.description}
                  </p>

                  {step.technicalDetail && (
                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/60 text-xs text-slate-400 font-sans flex items-start space-x-2">
                      <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong className="text-slate-300 font-mono">Nota Técnica: </strong>
                        {step.technicalDetail}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Countermeasures & Lessons Learned */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="uppercase tracking-wider font-semibold">
              Lições de Engenharia & Contramedidas Operativas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeDossier.lessonsLearned.map((lesson, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-emerald-950/50 hover:border-emerald-500/40 transition rounded-xl p-4.5 space-y-2"
              >
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <h5 className="font-semibold text-white text-xs sm:text-sm leading-tight">
                    {lesson.title}
                  </h5>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {lesson.desc}
                </p>
              </div>
            ))}
          </div>
          <SourcesList sources={activeDossier.sources} className="mt-4" />
        </div>
      </div>
    </section>
  );
};
