import React from 'react';
import { PanelLeftOpen, PanelLeftClose, Activity, RefreshCw } from 'lucide-react';
import type { NationalTelemetrySnapshot } from '../../services/onsApi';

interface ConsoleHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  telemetry: NationalTelemetrySnapshot;
  isLive: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onOpenCurve: () => void;
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  telemetry,
  isLive,
  isLoading,
  onRefresh,
  onOpenCurve
}) => {
  return (
    <header className="h-14 bg-[#080b11]/90 backdrop-blur-md border-b border-slate-800/90 flex items-center justify-between px-3 sm:px-4 z-40 relative select-none">
      {/* Left: Brand & Sidebar Toggle */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2 rounded-lg border transition flex items-center space-x-1.5 text-xs font-mono ${
            isSidebarOpen
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
          title="Alternar menu lateral"
          aria-label="Alternar menu lateral"
        >
          {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          <span className="hidden sm:inline font-semibold">MENU</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-mono font-black text-sm tracking-wider text-white">BRASIL-GRID</span>
          <span className="text-slate-600 font-mono text-xs">/</span>
          <span className="text-[11px] font-mono text-slate-400 hidden md:inline">CONSOLE DE OPERAÇÕES SIN</span>
        </div>
      </div>

      {/* Right: Live Telemetry Status & 24h Duck Curve Trigger */}
      <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono">
        {/* Dynamic Badge (ONS LIVE vs REF SNAPSHOT) */}
        <div
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold transition ${
            isLive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}
          title={
            isLive
              ? `Conexão direta com API Dados Abertos ONS • Última leitura às ${telemetry.latestTimeLabel}`
              : 'Snapshot estático de referência técnica do SIN (fallback offline)'
          }
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="tracking-tight">{isLive ? 'ONS LIVE' : 'REF'}</span>
          <span className="text-slate-400 font-normal hidden sm:inline">
            [{telemetry.latestTimeLabel}]
          </span>
        </div>

        {/* 24h Load Curve Modal Button */}
        <button
          onClick={onOpenCurve}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition text-[11px]"
          title="Abrir Curva de Carga 24h e Curva do Pato"
          aria-label="Abrir Curva de Carga 24h"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline font-semibold">CURVA 24H</span>
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1.5 rounded-md border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition disabled:opacity-50"
          title="Atualizar telemetria do ONS"
          aria-label="Atualizar telemetria do ONS"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
        </button>
      </div>
    </header>
  );
};
