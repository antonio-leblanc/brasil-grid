import React, { useState } from 'react';
import { scaleLevels, powerVsEnergyExplainer } from '../../data/scaleData';
import { SourcesList } from '../Sources/SourcesList';
import { Gauge, HelpCircle } from 'lucide-react';

export const MagnitudeRuler: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('GW');

  const currentLevel = scaleLevels.find((s) => s.unit === selectedUnit) || scaleLevels[3];

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Gauge className="w-3.5 h-3.5" />
          <span>ORDENS DE GRANDEZA & MODELOS MENTAIS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          A Régua de Watts: Do Chuveiro ao Brasil
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Entender energia é dominar ordens de grandeza. Um salto de cada letra (k, M, G, T) multiplica a grandeza por mil vezes (10³).
        </p>
      </div>

      {/* Conceptual Callout: Potência vs Energia */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase mb-3">
          <HelpCircle className="w-4 h-4" />
          <span className="font-bold">A Distinção Fundamental que Confunde 90% das Pessoas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-base font-mono text-amber-400">
                {powerVsEnergyExplainer.power.title}
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                INSTANTÂNEO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono italic">
              Analogia: "{powerVsEnergyExplainer.power.analogy}"
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {powerVsEnergyExplainer.power.meaning}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-base font-mono text-cyan-400">
                {powerVsEnergyExplainer.energy.title}
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                ACUMULADO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono italic">
              Analogia: "{powerVsEnergyExplainer.energy.analogy}"
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {powerVsEnergyExplainer.energy.meaning}
            </p>
          </div>
        </div>
      </div>

      {/* The Interactive Magnitude Ruler / Stepper */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-8">
        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {scaleLevels.map((lvl) => {
            const isSelected = lvl.unit === selectedUnit;
            return (
              <button
                key={lvl.unit}
                onClick={() => setSelectedUnit(lvl.unit)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-950 border-cyan-400/80 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-2xl font-black font-mono ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {lvl.unit}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{lvl.factor.split(' ')[0]}</span>
                </div>
                <div className="text-xs font-bold text-white">{lvl.name}</div>
              </button>
            );
          })}
        </div>

        {/* Active Scale Details */}
        <div className="border-t border-slate-800 pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl font-bold text-white font-mono">{currentLevel.unit} — {currentLevel.name}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                  Fator: {currentLevel.factor}
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1">{currentLevel.concept}</p>
            </div>
          </div>

          {/* Concrete Real-World Examples Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentLevel.examples.map((ex, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-400 block mb-1">
                    {ex.power}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1.5">{ex.item}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{ex.description}</p>
                </div>
              </div>
            ))}
          </div>
          <SourcesList sources={currentLevel.sources} className="mt-4" />
        </div>
      </div>
    </section>
  );
};
