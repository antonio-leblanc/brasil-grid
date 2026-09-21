import { useState } from 'react';
import { GridMap } from './components/Map/GridMap';
import { ConsoleHeader } from './components/Console/ConsoleHeader';
import { ConsoleSidebar } from './components/Console/ConsoleSidebar';
import { ConsoleBottomBar } from './components/Console/ConsoleBottomBar';
import { NodeInspector } from './components/Inspector/NodeInspector';
import type { PowerPlantFeature, TransmissionLineFeature } from './data/gridData';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('topologia');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedPlant, setSelectedPlant] = useState<PowerPlantFeature | null>(null);
  const [selectedLine, setSelectedLine] = useState<TransmissionLineFeature | null>(null);
  const [voltageFilter, setVoltageFilter] = useState<'all' | '800' | '500'>('all');
  const [plantTypeFilter, setPlantTypeFilter] = useState<string>('all');

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
