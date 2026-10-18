import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { X } from 'lucide-react';
import { GridMap } from './components/Map/GridMap';
import { ConsoleHeader } from './components/Console/ConsoleHeader';
import { ConsoleSidebar } from './components/Console/ConsoleSidebar';
import { ConsoleBottomBar } from './components/Console/ConsoleBottomBar';
import { LoadCurveModal } from './components/Telemetry/LoadCurveModal';
import { LearnView } from './components/Learn/LearnView';
import { useOnsTelemetry } from './services/onsApi';
import { majorPowerPlants, majorTransmissionLines } from './data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from './data/gridData';
import type { InterchangeId } from './data/interchangeData';
import { normalizeLineFilter, type LineVoltageFilter } from './data/gridFilters';

const DispatchSimulatorModal = lazy(() =>
  import('./components/Simulator/DispatchSimulatorModal').then((m) => ({ default: m.DispatchSimulatorModal }))
);

const InterchangeModal = lazy(() =>
  import('./components/Interchange/InterchangeModal').then((m) => ({ default: m.InterchangeModal }))
);

type AppMode = 'mapa' | 'guia';

const LEARN_TABS = ['cadeia', 'dossies', 'escalas', 'mercado'];
const VALID_PLANT_TYPES = ['all', 'hidro', 'solar', 'eolica', 'nuclear', 'termica'];
const VALID_INTERCHANGES: InterchangeId[] = ['NE_SECO', 'N_SECO', 'N_NE', 'S_SECO'];

interface UrlState {
  mode: AppMode;
  tab: string;
  plant: PowerPlantFeature | null;
  line: TransmissionLineFeature | null;
  voltage: LineVoltageFilter;
  type: string;
  sim: boolean;
  interchange: InterchangeId | null;
}

function parseUrlState(): UrlState {
  if (typeof window === 'undefined') {
    return {
      mode: 'mapa',
      tab: 'cadeia',
      plant: null,
      line: null,
      voltage: 'all',
      type: 'all',
      sim: false,
      interchange: null
    };
  }

  const params = new URLSearchParams(window.location.search);
  const modeParam = params.get('mode');
  const tabParam = params.get('tab');
  const plantParam = params.get('plant');
  const lineParam = params.get('line');
  const vParam = params.get('v');
  const typeParam = params.get('type');
  const simParam = params.get('sim') === '1' || params.get('sim') === 'true';

  const rawTab = tabParam && LEARN_TABS.includes(tabParam) ? tabParam : 'cadeia';
  const tab = rawTab === 'mercado' ? 'dossies' : rawTab;
  // "aprender" is a legacy alias kept for old links; new links use "guia".
  const mode: AppMode = modeParam === 'guia' || modeParam === 'aprender' || (!modeParam && tabParam && LEARN_TABS.includes(tabParam))
    ? 'guia'
    : 'mapa';
  const voltage = normalizeLineFilter(vParam);
  const type = typeParam && VALID_PLANT_TYPES.includes(typeParam) ? typeParam : 'all';

  const plant = plantParam
    ? majorPowerPlants.find((p) => p.id.toLowerCase() === plantParam.toLowerCase()) || null
    : null;
  const line = !plant && lineParam
    ? majorTransmissionLines.find((l) => l.id.toLowerCase() === lineParam.toLowerCase()) || null
    : null;
  const icParam = params.get('interchange') as InterchangeId | null;
  const interchange = icParam && VALID_INTERCHANGES.includes(icParam) ? icParam : null;

  return { mode, tab, plant, line, voltage, type, sim: simParam, interchange };
}

export function App() {
  const [initialState] = useState<UrlState>(parseUrlState);
  const [mode, setMode] = useState<AppMode>(initialState.mode);
  const [activeTab, setActiveTab] = useState<string>(initialState.tab);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768 && (initialState.plant || initialState.line)) {
      return false;
    }
    return true;
  });
  const [selectedPlant, setSelectedPlant] = useState<PowerPlantFeature | null>(initialState.plant);
  const [selectedLine, setSelectedLine] = useState<TransmissionLineFeature | null>(initialState.line);
  const [voltageFilter, setVoltageFilter] = useState<LineVoltageFilter>(initialState.voltage);
  const [plantTypeFilter, setPlantTypeFilter] = useState<string>(initialState.type);
  const [showSubsystems, setShowSubsystems] = useState<boolean>(true);
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
  const [isLoadCurveOpen, setIsLoadCurveOpen] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(initialState.sim);
  const [isInterchangeOpen, setIsInterchangeOpen] = useState<boolean>(!!initialState.interchange);
  const [selectedInterchangeId, setSelectedInterchangeId] = useState<InterchangeId | null>(initialState.interchange);

  // Live ONS Telemetry Hook
  const {
    telemetry,
    isLoading: isTelemetryLoading,
    isLive,
    refresh: refreshTelemetry
  } = useOnsTelemetry();

  // Synchronize state with URL search params
  useEffect(() => {
    const params = new URLSearchParams();

    if (mode === 'guia') {
      params.set('mode', 'guia');
      if (activeTab && activeTab !== 'cadeia') {
        params.set('tab', activeTab);
      }
    }
    if (selectedPlant) {
      params.set('plant', selectedPlant.id);
    } else if (selectedLine) {
      params.set('line', selectedLine.id);
    }
    if (voltageFilter && voltageFilter !== 'all') {
      params.set('v', voltageFilter);
    }
    if (plantTypeFilter && plantTypeFilter !== 'all') {
      params.set('type', plantTypeFilter);
    }
    if (isSimulatorOpen) {
      params.set('sim', '1');
    }
    if (isInterchangeOpen && selectedInterchangeId) {
      params.set('interchange', selectedInterchangeId);
    }

    const searchStr = params.toString();
    const newSearch = searchStr ? `?${searchStr}` : '';
    const newTarget = `${window.location.pathname}${newSearch}`;

    if (window.location.search !== newSearch) {
      window.history.replaceState(null, '', newTarget);
    }
  }, [mode, activeTab, selectedPlant, selectedLine, voltageFilter, plantTypeFilter, isSimulatorOpen, isInterchangeOpen, selectedInterchangeId]);

  // Handle browser navigation (back/forward)
  const handlePopState = useCallback(() => {
    const next = parseUrlState();
    setMode(next.mode);
    setActiveTab(next.tab);
    setSelectedPlant(next.plant);
    setSelectedLine(next.line);
    setVoltageFilter(next.voltage);
    setPlantTypeFilter(next.type);
    setIsSimulatorOpen(next.sim);
    setIsInterchangeOpen(!!next.interchange);
    setSelectedInterchangeId(next.interchange);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  const hasSelection = !!(selectedPlant || selectedLine);
  const isPanelVisible = isSidebarOpen || hasSelection;
  const isAnyModalOpen = isLoadCurveOpen || isSimulatorOpen || isInterchangeOpen;

  const clearSelection = useCallback(() => {
    setSelectedPlant(null);
    setSelectedLine(null);
  }, []);

  useEffect(() => {
    if (!hasSelection || isAnyModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelection();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasSelection, isAnyModalOpen, clearSelection]);

  if (mode === 'guia') {
    return (
      <LearnView
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBack={() => setMode('mapa')}
      />
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#07090e] text-slate-100 font-sans select-none">
      <ConsoleHeader
        isSidebarOpen={isPanelVisible}
        setIsSidebarOpen={(open) => {
          if (!open) clearSelection();
          setIsSidebarOpen(open);
        }}
        telemetry={telemetry}
        isLive={isLive}
        isLoading={isTelemetryLoading}
        onRefresh={refreshTelemetry}
        onOpenCurve={() => setIsLoadCurveOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenLearn={() => setMode('guia')}
      />

      <div className="flex-1 relative overflow-hidden flex">
        <ConsoleSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          voltageFilter={voltageFilter}
          setVoltageFilter={setVoltageFilter}
          plantTypeFilter={plantTypeFilter}
          setPlantTypeFilter={setPlantTypeFilter}
          onSelectPlant={(plant) => {
            setSelectedPlant(plant);
            setSelectedLine(null);
          }}
          onSelectLine={(line) => {
            setSelectedLine(line);
            setSelectedPlant(null);
          }}
          selectedPlant={selectedPlant}
          selectedLine={selectedLine}
          onClearSelection={clearSelection}
          showSubsystems={showSubsystems}
          setShowSubsystems={setShowSubsystems}
          onOpenInterchangeModal={(id) => {
            if (id) setSelectedInterchangeId(id);
            setIsInterchangeOpen(true);
          }}
        />

        <div className="flex-1 h-full w-full relative">
          <GridMap
            selectedPlant={selectedPlant}
            setSelectedPlant={setSelectedPlant}
            selectedLine={selectedLine}
            setSelectedLine={setSelectedLine}
            voltageFilter={voltageFilter}
            plantTypeFilter={plantTypeFilter}
            showSubsystems={showSubsystems}
            telemetry={telemetry}
          />

          <div className="absolute bottom-3 left-3 z-10">
            {isLegendOpen && (
              <div className="mb-2 w-64 rounded-md border border-slate-800 bg-[#090c13] p-3 text-xs text-slate-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-200">Legenda</span>
                  <button
                    onClick={() => setIsLegendOpen(false)}
                    className="p-0.5 rounded-md text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                    aria-label="Fechar legenda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 mb-1.5">Transmissão</div>
                <ul className="space-y-1 mb-3">
                  {[
                    ['bg-amber-400', 'CC ±800 / ±600 kV', 'HVDC'],
                    ['bg-cyan-400', 'CA 765 / 500–525 kV', 'Rede básica'],
                    ['bg-purple-400', 'CA 440 / 230 kV', 'Regional']
                  ].map(([color, label, tag]) => (
                    <li key={label} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className={`w-3 h-0.5 ${color}`} />
                        <span className="font-mono">{label}</span>
                      </span>
                      <span className="text-[11px] text-slate-500">{tag}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-[11px] text-slate-500 mb-1.5">Geração</div>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {[
                    ['bg-emerald-400', 'Hidro (UHE)'],
                    ['bg-amber-400', 'Solar (UFV)'],
                    ['bg-sky-400', 'Eólica (EOL)'],
                    ['bg-orange-500', 'Nuclear (UTN)'],
                    ['bg-rose-500', 'Térmica / Biomassa (UTE)']
                  ].map(([color, label]) => (
                    <li key={label} className="flex items-center gap-2 last:col-span-2">
                      <span className={`w-2 h-2 rounded-full ${color}`} />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                {showSubsystems && (
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="w-2.5 h-2.5 border border-amber-500/70 border-dashed" />
                    <span>4 subsistemas ONS (SE/CO, S, NE, N)</span>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsLegendOpen((prev) => !prev)}
              aria-label="Abrir legenda do mapa"
              aria-expanded={isLegendOpen}
              className="h-7 px-2.5 rounded-md border border-slate-800 bg-[#090c13] text-xs text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            >
              Legenda
            </button>
          </div>
        </div>

      </div>

      <ConsoleBottomBar
        telemetry={telemetry}
        onOpenCurve={() => setIsLoadCurveOpen(true)}
        onOpenInterchanges={() => setIsInterchangeOpen(true)}
      />

      <LoadCurveModal
        isOpen={isLoadCurveOpen}
        onClose={() => setIsLoadCurveOpen(false)}
        telemetry={telemetry}
        isLive={isLive}
        isLoading={isTelemetryLoading}
        onRefresh={refreshTelemetry}
      />

      {isSimulatorOpen && (
        <Suspense fallback={null}>
          <DispatchSimulatorModal
            isOpen={isSimulatorOpen}
            onClose={() => setIsSimulatorOpen(false)}
          />
        </Suspense>
      )}

      {isInterchangeOpen && (
        <Suspense fallback={null}>
          <InterchangeModal
            isOpen={isInterchangeOpen}
            onClose={() => setIsInterchangeOpen(false)}
            telemetry={telemetry}
            selectedInterchangeId={selectedInterchangeId}
            onSelectInterchange={(id) => setSelectedInterchangeId(id)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
