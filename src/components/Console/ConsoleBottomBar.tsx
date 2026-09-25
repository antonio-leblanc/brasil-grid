import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { referenceGridSnapshot } from '../../data/gridData';
import type { NationalTelemetrySnapshot } from '../../services/onsApi';

interface ConsoleBottomBarProps {
  telemetry?: NationalTelemetrySnapshot;
  onOpenCurve?: () => void;
  onOpenInterchanges?: () => void;
}

export const ConsoleBottomBar: React.FC<ConsoleBottomBarProps> = ({
  onOpenInterchanges
}) => {
  return (
    <footer className="h-9 bg-[#07090e]/95 backdrop-blur-md border-t border-slate-800/80 px-3 sm:px-4 flex items-center justify-between z-20 text-[11px] font-mono text-slate-400 select-none">
      {/* Left: Intercâmbios e Balanço Renovável */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Regional Interchange Trigger */}
        {onOpenInterchanges ? (
          <button
            onClick={onOpenInterchanges}
            className="flex items-center space-x-1.5 hover:text-cyan-300 transition cursor-pointer"
            title="Corredores de transferência entre subsistemas (clique para abrir)"
            aria-label="Abrir Painel de Intercâmbios"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">INTERCÂMBIO:</span>
            <strong className="text-slate-200">4 ROTAS</strong>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25">
              Gargalo NE
            </span>
          </button>
        ) : (
          <div className="flex items-center space-x-1.5 text-slate-400">
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">INTERCÂMBIO:</span>
            <strong className="text-slate-200">4 ROTAS</strong>
          </div>
        )}

        <span className="text-slate-700 hidden sm:inline">•</span>

        {/* Renewable share */}
        <div className="flex items-center space-x-1" title="Fração renovável média do SIN">
          <span className="text-slate-500">RENOVÁVEL:</span>
          <strong className="text-emerald-400 font-bold">{referenceGridSnapshot.renewableSharePct}%</strong>
        </div>
      </div>

      {/* Right: Matrix Bar */}
      <div className="flex items-center space-x-2">
        <span className="text-slate-500 uppercase text-[10px] hidden md:inline">
          MATRIZ:
        </span>

        <div
          className="flex h-2 w-24 sm:w-36 rounded-full overflow-hidden bg-slate-900 border border-slate-800"
          title="Composição da Matriz Elétrica Nacional"
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

        <span className="text-slate-400 text-[10px] hidden lg:inline">
          Hidro {referenceGridSnapshot.generationMix[0].pct}%
        </span>
      </div>
    </footer>
  );
};

