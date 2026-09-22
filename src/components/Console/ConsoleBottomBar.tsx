import React from 'react';
import { referenceGridSnapshot } from '../../data/gridData';

export const ConsoleBottomBar: React.FC = () => {
  return (
    <footer className="h-10 bg-[#07090e]/95 backdrop-blur-md border-t border-slate-800/80 px-4 flex items-center justify-between z-20 text-[11px] font-mono text-slate-400 select-none">
      {/* Left: Essential Operational Pulse */}
      <div className="flex items-center space-x-3">
        {/* Technical Reference Tag */}
        <span
          className="px-1.5 py-0.5 rounded text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold tracking-wider"
          title="Snapshot estático de referência técnica do SIN (fins de estudo e modelagem)"
        >
          REF
        </span>

        {/* Frequency */}
        <div className="flex items-center space-x-1.5" title="Frequência nominal do SIN (estabilidade da rede)">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-bold tracking-tight">{referenceGridSnapshot.frequencyHz.toFixed(2)} Hz</span>
          <span className="text-slate-500 text-[10px] hidden sm:inline">[NOMINAL]</span>
        </div>

        <span className="text-slate-700">|</span>

        {/* Carga SIN */}
        <div className="flex items-center space-x-1" title="Demanda instantânea total de referência do Sistema Interligado Nacional">
          <span className="text-slate-500">CARGA:</span>
          <strong className="text-white font-bold">{(referenceGridSnapshot.instantaneousLoadMW / 1000).toFixed(1)} GW</strong>
        </div>

        <span className="text-slate-700 hidden sm:inline">|</span>

        {/* Renovável */}
        <div className="hidden sm:flex items-center space-x-1" title="Participação de fontes renováveis na geração">
          <span className="text-slate-500">RENOVÁVEL:</span>
          <strong className="text-cyan-400 font-bold">{referenceGridSnapshot.renewableSharePct}%</strong>
        </div>
      </div>

      {/* Right: Sleek Segmented Matrix Bar */}
      <div className="flex items-center space-x-3">
        <span className="text-slate-500 font-bold uppercase text-[10px] hidden md:inline">
          MATRIZ:
        </span>

        <div
          className="flex h-2 w-32 sm:w-44 rounded-full overflow-hidden bg-slate-900 border border-slate-800"
          title="Composição da Matriz Geradora (Passe o mouse em cada cor para auditar)"
        >
          {referenceGridSnapshot.generationMix.map((mix) => (
            <div
              key={mix.source}
              style={{ width: `${mix.pct}%`, backgroundColor: mix.color }}
              title={`${mix.source}: ${mix.pct}% (${(mix.mw / 1000).toFixed(1)} GW)`}
              className="h-full hover:opacity-80 transition cursor-help"
            />
          ))}
        </div>

        <span className="text-slate-400 text-[10px] hidden sm:inline" title="Fonte predominante">
          Hidro {referenceGridSnapshot.generationMix[0].pct}%
        </span>
      </div>
    </footer>
  );
};
