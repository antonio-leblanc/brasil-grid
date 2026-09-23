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

const DispatchSimulatorModal = lazy(() =>
  import('./components/Simulator/DispatchSimulatorModal').then((m) => ({ default: m.DispatchSimulatorModal }))
);

const InterchangeModal = lazy(() =>
  import('./components/Interchange/InterchangeModal').then((m) => ({ default: m.InterchangeModal }))
);

type AppMode = 'mapa' | 'guia';

const LEARN_TABS = ['cadeia', 'dossies', 'escalas', 'mercado'];
const VALID_VOLTAGES: ('all' | '800' | '500')[] = ['all', '800', '500'];
const VALID_PLANT_TYPES = ['all', 'hidro', 'solar', 'eolica', 'nuclear', 'termica'];
const VALID_INTERCHANGES: InterchangeId[] = ['NE_SECO', 'N_SECO', 'N_NE', 'S_SECO'];

interface UrlState {
  mode: AppMode;
  tab: string;
  plant: PowerPlantFeature | null;
  line: TransmissionLineFeature | null;
  voltage: 'all' | '800' | '500';
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
  const voltage = vParam && VALID_VOLTAGES.includes(vParam as 'all' | '800' | '500')
    ? (vParam as 'all' | '800' | '500')
    : 'all';
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
  const [voltageFilter, setVoltageFilter] = useState<'all' | '800' | '500'>(initialState.voltage);
  const [plantTypeFilter, setPlantTypeFilter] = useState<string>(initialState.type);
  const [showPowerFlow, setShowPowerFlow] = useState<boolean>(true);
  const [showSubsystems, setShowSubsystems] = useState<boolean>(true);
  const [showInterchanges, setShowInterchanges] = useState<boolean>(true);
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
          showPowerFlow={showPowerFlow}
          setShowPowerFlow={setShowPowerFlow}
          showSubsystems={showSubsystems}
          setShowSubsystems={setShowSubsystems}
          showInterchanges={showInterchanges}
          setShowInterchanges={setShowInterchanges}
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
            showPowerFlow={showPowerFlow}
            showSubsystems={showSubsystems}
            showInterchanges={showInterchanges}
            onOpenInterchangeModal={(id) => {
              if (id) setSelectedInterchangeId(id);
              setIsInterchangeOpen(true);
            }}
            telemetry={telemetry}
          />

          {/* Floating Subtle Map Legend (Bottom-Left) */}
          <div className="absolute bottom-3 left-3 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-800/90 rounded-md px-3 py-1.5 flex items-center space-x-3 text-[10px] font-mono text-slate-400">
            <span className="text-slate-500 uppercase font-bold">REDE:</span>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-0.5 rounded bg-amber-400"></span>
              <span className="text-slate-300">±800 kV CC</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-0.5 rounded bg-cyan-400"></span>
              <span className="text-slate-300">500 kV CA</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300">Hidro</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span className="text-slate-300">Solar</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span className="text-slate-300">Eólica</span>
            </div>
            {showPowerFlow && (
              <div className="hidden sm:flex items-center space-x-1 text-cyan-300 pl-1 border-l border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Fluxo Ativo</span>
              </div>
            )}
            {showSubsystems && (
              <div className="hidden sm:flex items-center space-x-1 text-amber-300/90 pl-1 border-l border-slate-800">
                <span className="w-1.5 h-1.5 rounded-sm bg-amber-500/40 border border-amber-500/60"></span>
                <span>4 Subsistemas</span>
              </div>
            )}
            {showInterchanges && (
              <div className="hidden sm:flex items-center space-x-1 text-sky-400 pl-1 border-l border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Fronteiras ONS</span>
              </div>
            )}
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

      {/* 5. Interactive 60 Hz Dispatch & Stability Simulator Modal (Mini-ONS) */}
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
