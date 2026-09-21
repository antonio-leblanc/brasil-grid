import React from 'react';
import { referenceGridSnapshot } from '../../data/gridData';
import { ArrowRight } from 'lucide-react';

export const ConsoleBottomBar: React.FC = () => {
  return (
    <footer className="h-10 bg-[#07090e]/95 backdrop-blur-md border-t border-slate-800/80 px-4 flex items-center justify-between z-20 text-[11px] font-mono text-slate-400 select-none">
      {/* Left: Intercâmbio de Potência */}
      <div className="hidden sm:flex items-center space-x-3">
        <span className="flex items-center gap-1.5 text-slate-500 font-bold uppercase text-[10px]">
          <span
            className="px-1 py-0.5 rounded text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold"
            title="Snapshot estático de referência técnica"
          >
            REF
          </span>
          <span>INTERCÂMBIOS:</span>
        </span>
        {referenceGridSnapshot.interchanges.map((ic, i) => (
          <div key={i} className="flex items-center space-x-1" title={`Fluxo de referência ${ic.from} ➔ ${ic.to}: ${ic.flowMW.toLocaleString('pt-BR')} MW`}>
            <span className="text-slate-300 font-bold">{ic.from}</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-300 font-bold">{ic.to}:</span>
            <span className="text-cyan-300 font-mono">{(ic.flowMW / 1000).toFixed(1)} GW</span>
            {i < referenceGridSnapshot.interchanges.length - 1 && <span className="text-slate-700 ml-1.5">•</span>}
          </div>
        ))}
      </div>

      {/* Right: Generation Mix Bar */}
      <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
        <span className="text-slate-500 font-bold uppercase text-[10px] hidden md:inline">
          MATRIZ DE REFERÊNCIA:
        </span>
        <div className="flex items-center space-x-2">
          {referenceGridSnapshot.generationMix.map((mix, i) => (
            <div key={i} className="flex items-center space-x-1" title={`${mix.source}: ${mix.mw.toLocaleString('pt-BR')} MW (${mix.pct}%) [Snapshot Referência]`}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: mix.color }}></span>
              <span className="text-slate-300 text-[10px]">{mix.source.split(' ')[0]}</span>
              <span className="text-slate-500 text-[10px]">{mix.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
