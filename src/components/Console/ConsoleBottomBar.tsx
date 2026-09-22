import React from 'react';
import { Sun, Activity } from 'lucide-react';
import { referenceGridSnapshot } from '../../data/gridData';
import type { NationalTelemetrySnapshot } from '../../services/onsApi';

interface ConsoleBottomBarProps {
  telemetry: NationalTelemetrySnapshot;
  isLive: boolean;
  onOpenCurve: () => void;
}

export const ConsoleBottomBar: React.FC<ConsoleBottomBarProps> = ({
  telemetry,
  isLive,
  onOpenCurve
}) => {
  const currentSinLoadGW = (telemetry.currentSinLoadMW / 1000).toFixed(1);
  const currentSolarGW = (telemetry.currentSolarMmgdMW / 1000).toFixed(1);

  return (
    <footer className="h-10 bg-[#07090e]/95 backdrop-blur-md border-t border-slate-800/80 px-3 sm:px-4 flex items-center justify-between z-20 text-[11px] font-mono text-slate-400 select-none">
      {/* Left: Essential Operational Pulse */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Dynamic Telemetry Badge */}
        <span
          className={`px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider border ${
            isLive
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}
          title={
            isLive
              ? `Dados vivos do ONS (atualizado às ${telemetry.latestTimeLabel})`
              : 'Snapshot estático de referência técnica do SIN'
          }
        >
          {isLive ? 'ONS LIVE' : 'REF'}
        </span>

        {/* Frequency */}
        <div className="flex items-center space-x-1.5" title="Frequência nominal do SIN (estabilidade da rede)">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-bold tracking-tight">
            {referenceGridSnapshot.frequencyHz.toFixed(2)} Hz
          </span>
          <span className="text-slate-500 text-[10px] hidden sm:inline">[NOMINAL]</span>
        </div>

        <span className="text-slate-700">|</span>

        {/* Live Carga SIN with Curva Trigger */}
        <button
          onClick={onOpenCurve}
          className="flex items-center space-x-1 hover:text-cyan-300 transition group text-left"
          title="Demanda instantânea do SIN (Clique para abrir a Curva de Carga 24h)"
          aria-label="Abrir Curva de Carga 24h"
        >
          <span className="text-slate-500 group-hover:text-cyan-400">CARGA:</span>
          <strong className="text-white font-bold group-hover:text-cyan-300">{currentSinLoadGW} GW</strong>
          <Activity className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 hidden sm:inline" />
        </button>

        {/* Solar GD Indicator */}
        {telemetry.currentSolarMmgdMW > 0 && (
          <>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <div
              className="hidden sm:flex items-center space-x-1 text-yellow-400"
              title="Geração solar distribuída estimada em telhados (MMGD)"
            >
              <Sun className="w-3 h-3 text-yellow-400" />
              <span className="text-slate-500">SOLAR GD:</span>
              <strong className="font-bold">{currentSolarGW} GW</strong>
            </div>
          </>
        )}

        <span className="text-slate-700 hidden md:inline">|</span>

        {/* Renovável */}
        <div className="hidden md:flex items-center space-x-1" title="Participação de fontes renováveis na geração">
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
          className="flex h-2 w-28 sm:w-44 rounded-full overflow-hidden bg-slate-900 border border-slate-800"
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

        <span className="text-slate-400 text-[10px] hidden lg:inline" title="Fonte predominante">
          Hidro {referenceGridSnapshot.generationMix[0].pct}%
        </span>
      </div>
    </footer>
  );
};
