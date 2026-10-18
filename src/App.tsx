import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { GridMap } from './components/Map/GridMap';
import { ConsoleHeader } from './components/Console/ConsoleHeader';
import { ConsoleSidebar } from './components/Console/ConsoleSidebar';
import { ConsoleBottomBar } from './components/Console/ConsoleBottomBar';
import { LearnView } from './components/Learn/LearnView';
import { DEFAULT_SECTION, isSectionId, type SectionId } from './components/Learn/sections';
import { useOnsTelemetry } from './services/onsApi';
import { majorPowerPlants, majorTransmissionLines } from './data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from './data/gridData';
import type { InterchangeId } from './data/interchangeData';
import { normalizeLineFilter, type LineVoltageFilter } from './data/gridFilters';

const VALID_PLANT_TYPES = ['all', 'hidro', 'solar', 'eolica', 'nuclear', 'termica'];
const VALID_INTERCHANGES: InterchangeId[] = ['NE_SECO', 'N_SECO', 'N_NE', 'S_SECO'];
const DEFAULT_INTERCHANGE: InterchangeId = 'NE_SECO';

interface UrlState {
  section: SectionId | null;
  plant: PowerPlantFeature | null;
  line: TransmissionLineFeature | null;
  voltage: LineVoltageFilter;
  type: string;
  interchange: InterchangeId;
}

function parseUrlState(): UrlState {
  if (typeof window === 'undefined') {
    return { section: null, plant: null, line: null, voltage: 'all', type: 'all', interchange: DEFAULT_INTERCHANGE };
  }

  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  const plantParam = params.get('plant');
  const lineParam = params.get('line');
  const typeParam = params.get('type');
  const icParam = params.get('interchange') as InterchangeId | null;

  const plant = plantParam
    ? majorPowerPlants.find((p) => p.id.toLowerCase() === plantParam.toLowerCase()) || null
    : null;
  const line = !plant && lineParam
    ? majorTransmissionLines.find((l) => l.id.toLowerCase() === lineParam.toLowerCase()) || null
    : null;

  return {
    section: isSectionId(tabParam) ? tabParam : null,
    plant,
    line,
    voltage: normalizeLineFilter(params.get('v')),
    type: typeParam && VALID_PLANT_TYPES.includes(typeParam) ? typeParam : 'all',
    interchange: icParam && VALID_INTERCHANGES.includes(icParam) ? icParam : DEFAULT_INTERCHANGE
  };
}

export function App() {
  const [initialState] = useState<UrlState>(parseUrlState);
  const [section, setSection] = useState<SectionId | null>(initialState.section);
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
  const [selectedInterchangeId, setSelectedInterchangeId] = useState<InterchangeId>(initialState.interchange);

  const {
    telemetry,
    isLoading: isTelemetryLoading,
    isLive,
    refresh: refreshTelemetry
  } = useOnsTelemetry();

  useEffect(() => {
    const params = new URLSearchParams();

    if (section) {
      params.set('tab', section);
      if (section === 'intercambios') {
        params.set('interchange', selectedInterchangeId);
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

    const searchStr = params.toString();
    const newSearch = searchStr ? `?${searchStr}` : '';

    if (window.location.search !== newSearch) {
      window.history.replaceState(null, '', `${window.location.pathname}${newSearch}`);
    }
  }, [section, selectedPlant, selectedLine, voltageFilter, plantTypeFilter, selectedInterchangeId]);

  const handlePopState = useCallback(() => {
    const next = parseUrlState();
    setSection(next.section);
    setSelectedPlant(next.plant);
    setSelectedLine(next.line);
    setVoltageFilter(next.voltage);
    setPlantTypeFilter(next.type);
    setSelectedInterchangeId(next.interchange);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  const hasSelection = !!(selectedPlant || selectedLine);
  const isPanelVisible = isSidebarOpen || hasSelection;

  const clearSelection = useCallback(() => {
    setSelectedPlant(null);
    setSelectedLine(null);
  }, []);

  const openInterchange = (id?: InterchangeId) => {
    if (id) setSelectedInterchangeId(id);
    setSection('intercambios');
  };

  useEffect(() => {
    if (!hasSelection || section) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelection();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasSelection, section, clearSelection]);

  if (section) {
    return (
      <LearnView
        activeSection={section}
        onSelectSection={setSection}
        onBack={() => setSection(null)}
        telemetry={telemetry}
        isLive={isLive}
        isLoading={isTelemetryLoading}
        onRefresh={refreshTelemetry}
        selectedInterchangeId={selectedInterchangeId}
        onSelectInterchange={setSelectedInterchangeId}
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
        onOpenCurve={() => setSection('curva')}
        onOpenSimulator={() => setSection('simulador')}
        onOpenLearn={() => setSection(DEFAULT_SECTION)}
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
          onOpenInterchange={openInterchange}
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

      <ConsoleBottomBar onOpenInterchanges={() => openInterchange()} />
    </div>
  );
}

export default App;
