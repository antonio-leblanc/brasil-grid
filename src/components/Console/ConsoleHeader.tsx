import React from 'react';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

interface ConsoleHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen
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
          aria-label="Alternar painel de controle"
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

      {/* Right: Clean Operational Status Badge */}
      <div className="flex items-center space-x-3 text-xs font-mono">
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800/80 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium hidden xs:inline">SIN OPERACIONAL</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-cyan-400 font-semibold hidden sm:inline">72 USINAS</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-amber-400 font-semibold hidden sm:inline">30 LINHAS</span>
        </div>
      </div>
    </header>
  );
};
