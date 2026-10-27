import React from 'react';
import { PanelLeftOpen, PanelLeftClose, RefreshCw } from 'lucide-react';
import type { NationalTelemetrySnapshot } from '../../services/onsApi';
import type { AppView } from '../System/sections';
import { SegmentedControl, type SegmentOption } from '../Controls/SegmentedControl';
import { useI18n } from '../../i18n/context';
import type { Lang } from '../../i18n/language';
import { formatDecimal } from '../../utils/format';

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

const LANG_OPTIONS: SegmentOption<Lang>[] = [
  { value: 'pt', label: 'PT' },
  { value: 'en', label: 'EN' }
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
  const { t, lang, setLang } = useI18n();
  const viewOptions: SegmentOption<AppView>[] = [
    { value: 'mapa', label: t.header.views.mapa },
    { value: 'sistema', label: t.header.views.sistema }
  ];
  const currentSinLoadGW = formatDecimal(telemetry.currentSinLoadMW / 1000, 1);

  return (
    <header className="h-11 bg-[#080b11] border-b border-slate-800 flex items-center justify-between px-2 sm:px-3 z-40 relative select-none">
      <div className="flex items-center gap-2">
        {view === 'mapa' && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label={t.header.toggleSidebar}
            aria-pressed={isSidebarOpen}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
        )}
        <span className="text-sm font-semibold text-slate-100 px-1">brasil-grid</span>
        <SegmentedControl options={viewOptions} value={view} onChange={onNavigate} />
      </div>

      <div className="flex items-center gap-1">
        <span
          className="h-7 px-2.5 flex items-center gap-2 text-xs"
          title={t.header.loadTitle(isLive ? 'ONS' : t.header.referenceSnapshot)}
        >
          <span className="font-mono tabular-nums text-slate-100">{currentSinLoadGW} GW</span>
          <span className="font-mono tabular-nums text-slate-500 hidden sm:inline">{telemetry.latestTimeLabel}</span>
          <span className={isLive ? 'text-slate-500' : 'text-amber-400'}>{isLive ? 'ONS' : t.header.referenceShort}</span>
        </span>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-100 hover:bg-slate-900 transition-colors disabled:opacity-50 cursor-pointer"
          aria-label={t.header.refresh}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>

        <div role="group" aria-label={t.language.label} className="ml-1">
          <SegmentedControl options={LANG_OPTIONS} value={lang} onChange={setLang} optionClassName="px-1.5 py-0.5 text-[11px]" />
        </div>
      </div>
    </header>
  );
};
