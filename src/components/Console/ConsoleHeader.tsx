import React from 'react';
import { liveGridTelemetry } from '../../data/gridData';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

interface ConsoleHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab
}) => {
  return (
    <header className="h-14 bg-[#080b11]/90 backdrop-blur-md border-b border-slate-800/90 flex items-center justify-between px-4 z-40 relative select-none">
      {/* Left: Brand & Sidebar Toggle */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2 rounded-lg border transition flex items-center space-x-1.5 text-xs font-mono ${
            isSidebarOpen
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
          title="Alternar painel de controle"
        >
          {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          <span className="hidden sm:inline">MENU SCADA</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-mono font-black text-sm tracking-wider text-white">BRASIL-GRID</span>
          <span className="text-slate-600 font-mono text-xs">/</span>
          <span className="text-[11px] font-mono text-slate-400 hidden md:inline">CONSOLE DE OPERAÇÕES SIN</span>
        </div>
      </div>

      {/* Center: Real-Time Grid Telemetry Ticker */}
      <div className="hidden lg:flex items-center space-x-4 px-3 py-1 rounded bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-bold">{liveGridTelemetry.frequencyHz.toFixed(2)} Hz</span>
          <span className="text-slate-500">[NOMINAL]</span>
        </div>
        <span className="text-slate-700">|</span>
        <div>
          <span className="text-slate-500">CARGA SIN: </span>
          <strong className="text-white font-bold">{(liveGridTelemetry.instantaneousLoadMW / 1000).toFixed(1)} GW</strong>
        </div>
        <span className="text-slate-700">|</span>
        <div>
          <span className="text-slate-500">RENOVÁVEL: </span>
          <strong className="text-cyan-400 font-bold">{liveGridTelemetry.renewableSharePct}%</strong>
        </div>
      </div>

      {/* Right: Section Buttons */}
      <div className="flex items-center space-x-1.5 text-xs font-mono">
        {[
          { id: 'topologia', label: 'Topologia' },
          { id: 'cadeia', label: 'Cadeia SEB' },
          { id: 'mercado', label: 'Mercado ACL' },
          { id: 'escalas', label: 'Grandezas' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (!isSidebarOpen) setIsSidebarOpen(true);
            }}
            className={`px-2.5 py-1 rounded transition ${
              isSidebarOpen && activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
