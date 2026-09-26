import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { GridMap } from './components/Map/GridMap';
import { ConsoleHeader } from './components/Console/ConsoleHeader';
import { ConsoleSidebar } from './components/Console/ConsoleSidebar';
import { ConsoleBottomBar } from './components/Console/ConsoleBottomBar';
import { NodeInspector } from './components/Inspector/NodeInspector';
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
      {/* 1. SCADA Console Top Bar */}
      <ConsoleHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        telemetry={telemetry}
        isLive={isLive}
        isLoading={isTelemetryLoading}
        onRefresh={refreshTelemetry}
        onOpenCurve={() => setIsLoadCurveOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenLearn={() => setMode('guia')}
      />

      {/* 2. Main Full-Viewport Spatial Canvas & HUD Overlays */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Left Retractable Intelligence Drawer */}
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
          showSubsystems={showSubsystems}
          setShowSubsystems={setShowSubsystems}
          onOpenInterchangeModal={(id) => {
            if (id) setSelectedInterchangeId(id);
            setIsInterchangeOpen(true);
          }}
        />

        {/* The Core Full-Bleed Map Canvas */}
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

          {/* On-Demand SCADA Map Legend (Bottom-Left) */}
          <div className="absolute bottom-3 left-3 z-10 font-mono">
            {isLegendOpen && (
              <div className="mb-2 w-72 rounded-lg border border-slate-800 bg-slate-950/95 p-3 text-[11px] shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-2">
                  <span className="font-bold text-slate-200 uppercase tracking-wider text-[10px]">
                    Convenções da Rede (SIN)
                  </span>
                  <button
                    onClick={() => setIsLegendOpen(false)}
                    className="text-slate-500 hover:text-slate-300 px-1 py-0.5 text-xs leading-none"
                    aria-label="Fechar legenda"
                  >
                    ✕
                  </button>
                </div>

                {/* Linhas de Transmissão */}
                <div className="space-y-1.5 mb-3">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Transmissão</div>
                  <div className="flex items-center justify-between text-slate-300">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-0.5 rounded bg-amber-400"></span>
                      <span>CC ±800 / ±600 kV</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">HVDC</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-0.5 rounded bg-cyan-400"></span>
                      <span>CA 765 / 500–525 kV</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Rede Básica</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-0.5 rounded bg-purple-400"></span>
                      <span>CA 440 / 230 kV</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Regional</span>
                  </div>
                </div>

                {/* Usinas Geradoras */}
                <div className="space-y-1.5 mb-2.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Geração</div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-300">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Hidro (UHE)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>Solar (UFV)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                      <span>Eólica (EOL)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span>Nuclear (UTN)</span>
                    </div>
                    <div className="flex items-center space-x-1.5 col-span-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>Térmica / Biomassa (UTE)</span>
                    </div>
                  </div>
                </div>

                {/* Limites de Subsistemas */}
                {showSubsystems && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center space-x-2 text-slate-400 text-[10px]">
                    <span className="w-2 h-2 rounded-sm bg-amber-500/30 border border-amber-500/70 border-dashed"></span>
                    <span>4 Subsistemas ONS (SE/CO, S, NE, N)</span>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsLegendOpen((prev) => !prev)}
              aria-label="Abrir legenda técnica do mapa"
              title="Legenda do mapa"
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md border text-xs font-mono transition-all backdrop-blur-md ${
                isLegendOpen
                  ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300 shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center justify-center w-4 h-4 rounded-full border border-current text-[10px] font-bold">
                ?
              </span>
              <span className="hidden sm:inline text-[10px] tracking-wide uppercase font-semibold">Legenda</span>
            </button>
          </div>
        </div>

        {/* Right Engineering Spec Sheet Inspector Drawer */}
        <NodeInspector
          plant={selectedPlant}
          line={selectedLine}
          onClose={() => {
            setSelectedPlant(null);
            setSelectedLine(null);
          }}
        />
      </div>

      {/* 3. Bottom Grid Telemetry & Intercâmbio Bar */}
      <ConsoleBottomBar
        telemetry={telemetry}
        onOpenCurve={() => setIsLoadCurveOpen(true)}
        onOpenInterchanges={() => setIsInterchangeOpen(true)}
      />

      {/* 4. Interactive 24h Load Curve & Duck Curve Modal */}
      <LoadCurveModal
        isOpen={isLoadCurveOpen}
        onClose={() => setIsLoadCurveOpen(false)}
        telemetry={telemetry}
        isLive={isLive}
        isLoading={isTelemetryLoading}
        onRefresh={refreshTelemetry}
      />

      {/* 5. Interactive 60 Hz Dispatch & Stability Simulator Modal */}
      {isSimulatorOpen && (
        <Suspense fallback={null}>
          <DispatchSimulatorModal
            isOpen={isSimulatorOpen}
            onClose={() => setIsSimulatorOpen(false)}
          />
        </Suspense>
      )}

      {/* 6. Regional Interchanges & Bottlenecks SCADA Modal */}
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
