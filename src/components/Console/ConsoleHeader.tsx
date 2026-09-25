import React from 'react';
import { PanelLeftOpen, PanelLeftClose, Activity, RefreshCw, BookOpen, Gauge } from 'lucide-react';
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
  const currentSinLoadGW = (telemetry.currentSinLoadMW / 1000).toFixed(1);

  return (
    <header className="h-13 bg-[#080b11]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-3 sm:px-4 z-40 relative select-none">
      {/* Left: Brand & Sidebar Toggle */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`px-2.5 py-1.5 rounded-lg border transition flex items-center space-x-1.5 text-xs font-mono cursor-pointer ${
            isSidebarOpen
              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
          title="Alternar menu lateral do mapa"
          aria-label="Alternar menu lateral"
        >
          {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          <span className="hidden sm:inline font-semibold">MENU</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-mono font-bold text-sm tracking-wide text-white">BRASIL-GRID</span>
          <span className="text-slate-700 font-mono text-xs hidden sm:inline">•</span>
          <span className="text-xs text-slate-400 hidden sm:inline">Laboratório do SIN</span>
        </div>
      </div>

      {/* Right: Tools & Views */}
      <div className="flex items-center space-x-2 text-xs font-mono">
        {/* Dynamic ONS Live Badge & Load (Clickable -> 24h Curve) */}
        <button
          onClick={onOpenCurve}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium transition cursor-pointer hover:border-cyan-500/50 hover:bg-slate-900 ${
            isLive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
          }`}
          title={`Carga instantânea do SIN: ${currentSinLoadGW} GW (${telemetry.latestTimeLabel}) • Clique para ver curva de carga 24h`}
          aria-label="Abrir Curva de Carga 24h"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span>{isLive ? 'ONS LIVE' : 'REF'}</span>
          <span className="text-slate-500 text-[10px]">[{telemetry.latestTimeLabel}]</span>
          <span className="text-slate-700">•</span>
          <strong className="text-white font-bold">{currentSinLoadGW} GW</strong>
          <Activity className="w-3 h-3 text-cyan-400/80 ml-0.5" />
        </button>

        {/* 60 Hz Dispatch Simulator Modal Button (Highlighted primary tool) */}
        <button
          onClick={onOpenSimulator}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 transition text-xs font-semibold cursor-pointer shadow-xs"
          title="Abrir Simulador 60 Hz: O Balanço da Rede"
          aria-label="Abrir Simulador de Despacho 60 Hz"
        >
          <Gauge className="w-3.5 h-3.5 text-cyan-400" />
          <span>SIMULADOR 60 HZ</span>
        </button>

        {/* Guide Mode Entry */}
        <button
          type="button"
          onClick={onOpenLearn}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition text-xs cursor-pointer"
          title="Abrir o Guia do Setor Elétrico"
          aria-label="Abrir guia do setor"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">GUIA</span>
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition disabled:opacity-50 cursor-pointer"
          title="Atualizar telemetria"
          aria-label="Atualizar telemetria"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
        </button>
      </div>
    </header>
  );
};
