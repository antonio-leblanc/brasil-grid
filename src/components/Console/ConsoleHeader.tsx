import React from 'react';
import { PanelLeftOpen, PanelLeftClose, RefreshCw } from 'lucide-react';
import type { NationalTelemetrySnapshot } from '../../services/onsApi';

interface ConsoleHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  telemetry: NationalTelemetrySnapshot;
  isLive: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onOpenCurve: () => void;
  onOpenSimulator: () => void;
  onOpenLearn: () => void;
}

const ghostButton =
  'h-7 px-2.5 rounded-md text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors cursor-pointer';

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  telemetry,
  isLive,
  isLoading,
  onRefresh,
  onOpenCurve,
  onOpenSimulator,
  onOpenLearn
}) => {
  const currentSinLoadGW = (telemetry.currentSinLoadMW / 1000).toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  return (
    <header className="h-11 bg-[#080b11] border-b border-slate-800 flex items-center justify-between px-2 sm:px-3 z-40 relative select-none">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors cursor-pointer"
          aria-label="Alternar menu lateral"
          aria-pressed={isSidebarOpen}
        >
          {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
        <span className="text-sm font-semibold text-slate-100">brasil-grid</span>
        <span className="text-xs text-slate-500 hidden sm:inline">Laboratório do SIN</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onOpenCurve}
          className={`${ghostButton} flex items-baseline gap-2`}
          title={`Carga instantânea do SIN (${isLive ? 'ONS' : 'snapshot de referência'}) · abrir curva de carga 24h`}
          aria-label="Abrir Curva de Carga 24h"
        >
          <span className="font-mono tabular-nums text-slate-100">{currentSinLoadGW} GW</span>
          <span className="font-mono tabular-nums text-slate-500 hidden sm:inline">{telemetry.latestTimeLabel}</span>
          <span className={isLive ? 'text-slate-500' : 'text-amber-400'}>{isLive ? 'ONS' : 'ref.'}</span>
        </button>

        <span className="w-px h-4 bg-slate-800 mx-1" />

        <button
          onClick={onOpenSimulator}
          className="h-7 px-2.5 rounded-md text-xs text-cyan-300 hover:bg-cyan-500/10 transition-colors cursor-pointer"
          aria-label="Abrir Simulador de Despacho 60 Hz"
        >
          Simulador 60 Hz
        </button>

        <button type="button" onClick={onOpenLearn} className={ghostButton} aria-label="Abrir guia do setor">
          Guia
        </button>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-100 hover:bg-slate-900 transition-colors disabled:opacity-50 cursor-pointer"
          aria-label="Atualizar telemetria"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </header>
  );
};
