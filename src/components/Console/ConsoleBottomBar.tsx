import React from 'react';
import { referenceGridSnapshot } from '../../data/gridData';

interface ConsoleBottomBarProps {
  onOpenInterchanges: () => void;
}

export const ConsoleBottomBar: React.FC<ConsoleBottomBarProps> = ({ onOpenInterchanges }) => (
  <footer className="h-8 bg-[#07090e] border-t border-slate-800 px-3 sm:px-4 flex items-center justify-between z-20 text-[11px] text-slate-500 select-none">
    <div className="flex items-center gap-4">
      <button onClick={onOpenInterchanges} className="hover:text-slate-200 transition-colors cursor-pointer">
        Intercâmbios
      </button>
      <span title="Fração renovável do snapshot de referência do SIN">
        Renovável <span className="font-mono tabular-nums text-slate-300">{referenceGridSnapshot.renewableSharePct}%</span>
      </span>
    </div>

    <div className="flex items-center gap-2">
      <span className="hidden md:inline">Matriz</span>
      <div className="flex h-1.5 w-24 sm:w-36 rounded-full overflow-hidden bg-slate-900" title="Composição da matriz elétrica nacional">
        {referenceGridSnapshot.generationMix.map((mix) => (
          <div
            key={mix.source}
            style={{ width: `${mix.pct}%`, backgroundColor: mix.color }}
            title={`${mix.source}: ${mix.pct}% (${(mix.mw / 1000).toFixed(1)} GW)`}
            className="h-full cursor-help"
          />
        ))}
      </div>
    </div>
  </footer>
);
