import React from 'react';
import { PanelLeftOpen, PanelLeftClose, RefreshCw } from 'lucide-react';
import type { NationalTelemetrySnapshot } from '../../services/onsApi';
import type { AppView } from '../System/sections';
import { SegmentedControl, type SegmentOption } from '../Controls/SegmentedControl';

interface ConsoleHeaderProps {
  view: AppView;
  onNavigate: (view: AppView) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  telemetry: NationalTelemetrySnapshot;
  isLive: boolean;
  isLoading: boolean;
  onRefresh: () => void;
}

const VIEW_OPTIONS: SegmentOption<AppView>[] = [
  { value: 'mapa', label: 'Mapa' },
  { value: 'sistema', label: 'Sistema' }
];

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  view,
  onNavigate,
  isSidebarOpen,
  setIsSidebarOpen,
  telemetry,
  isLive,
  isLoading,
  onRefresh
}) => {
  const currentSinLoadGW = (telemetry.currentSinLoadMW / 1000).toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  return (
    <header className="h-11 bg-[#080b11] border-b border-slate-800 flex items-center justify-between px-2 sm:px-3 z-40 relative select-none">
      <div className="flex items-center gap-2">
        {view === 'mapa' && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Alternar menu lateral"
            aria-pressed={isSidebarOpen}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
        )}
        <span className="text-sm font-semibold text-slate-100 px-1">brasil-grid</span>
        <SegmentedControl options={VIEW_OPTIONS} value={view} onChange={onNavigate} />
      </div>

      <div className="flex items-center gap-1">
        <span
          className="h-7 px-2.5 flex items-center gap-2 text-xs"
          title={`Carga global do SIN na última meia hora (${isLive ? 'ONS' : 'snapshot de referência'})`}
        >
          <span className="font-mono tabular-nums text-slate-100">{currentSinLoadGW} GW</span>
          <span className="font-mono tabular-nums text-slate-500 hidden sm:inline">{telemetry.latestTimeLabel}</span>
          <span className={isLive ? 'text-slate-500' : 'text-amber-400'}>{isLive ? 'ONS' : 'ref.'}</span>
        </span>

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
