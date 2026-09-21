import { useState, useEffect, useCallback } from 'react';
import { GridMap } from './components/Map/GridMap';
import { ConsoleHeader } from './components/Console/ConsoleHeader';
import { ConsoleSidebar } from './components/Console/ConsoleSidebar';
import { ConsoleBottomBar } from './components/Console/ConsoleBottomBar';
import { NodeInspector } from './components/Inspector/NodeInspector';
import { majorPowerPlants, majorTransmissionLines } from './data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from './data/gridData';

const VALID_TABS = ['topologia', 'cadeia', 'mercado', 'escalas'];
const VALID_VOLTAGES: ('all' | '800' | '500')[] = ['all', '800', '500'];
const VALID_PLANT_TYPES = ['all', 'hidro', 'solar', 'eolica', 'nuclear', 'termica'];

interface UrlState {
  tab: string;
  plant: PowerPlantFeature | null;
  line: TransmissionLineFeature | null;
  voltage: 'all' | '800' | '500';
  type: string;
}

function parseUrlState(): UrlState {
  if (typeof window === 'undefined') {
    return {
      tab: 'topologia',
      plant: null,
      line: null,
      voltage: 'all',
      type: 'all'
    };
  }

  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  const plantParam = params.get('plant');
  const lineParam = params.get('line');
  const vParam = params.get('v');
  const typeParam = params.get('type');

  const tab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'topologia';
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

  return { tab, plant, line, voltage, type };
}

export function App() {
  const [initialState] = useState<UrlState>(parseUrlState);
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

  // Synchronize state with URL search params
  useEffect(() => {
    const params = new URLSearchParams();

    if (activeTab && activeTab !== 'topologia') {
      params.set('tab', activeTab);
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

    const searchStr = params.toString();
    const newSearch = searchStr ? `?${searchStr}` : '';
    const newTarget = `${window.location.pathname}${newSearch}`;

    if (window.location.search !== newSearch) {
      window.history.replaceState(null, '', newTarget);
    }
  }, [activeTab, selectedPlant, selectedLine, voltageFilter, plantTypeFilter]);

  // Handle browser navigation (back/forward)
  const handlePopState = useCallback(() => {
    const next = parseUrlState();
    setActiveTab(next.tab);
    setSelectedPlant(next.plant);
    setSelectedLine(next.line);
    setVoltageFilter(next.voltage);
    setPlantTypeFilter(next.type);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#07090e] text-slate-100 font-sans select-none">
      {/* 1. SCADA Console Top Bar */}
      <ConsoleHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 2. Main Full-Viewport Spatial Canvas & HUD Overlays */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Left Retractable Intelligence Drawer */}
        <ConsoleSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
      <ConsoleBottomBar />
    </div>
  );
}

export default App;
