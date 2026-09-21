import React from 'react';
import { liveGridTelemetry } from '../../data/gridData';
import { ArrowRight } from 'lucide-react';

export const ConsoleBottomBar: React.FC = () => {
  return (
    <footer className="h-10 bg-[#07090e]/95 backdrop-blur-md border-t border-slate-800/80 px-4 flex items-center justify-between z-20 text-[11px] font-mono text-slate-400 select-none">
      {/* Left: Intercâmbio de Potência */}
      <div className="hidden sm:flex items-center space-x-3">
        <span className="text-slate-500 font-bold uppercase text-[10px]">INTERCÂMBIOS ONS:</span>
        {liveGridTelemetry.interchanges.map((ic, i) => (
          <div key={i} className="flex items-center space-x-1">
            <span className="text-slate-300 font-bold">{ic.from}</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-300 font-bold">{ic.to}:</span>
            <span className="text-cyan-300 font-mono">{(ic.flowMW / 1000).toFixed(1)} GW</span>
            {i < liveGridTelemetry.interchanges.length - 1 && <span className="text-slate-700 ml-1.5">•</span>}
          </div>
        ))}
      </div>

      {/* Right: Generation Mix Bar */}
      <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
        <span className="text-slate-500 font-bold uppercase text-[10px] hidden md:inline">MATRIZ INSTANTÂNEA:</span>
        <div className="flex items-center space-x-2">
          {liveGridTelemetry.generationMix.map((mix, i) => (
            <div key={i} className="flex items-center space-x-1" title={`${mix.source}: ${mix.mw.toLocaleString('pt-BR')} MW (${mix.pct}%)`}>
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
