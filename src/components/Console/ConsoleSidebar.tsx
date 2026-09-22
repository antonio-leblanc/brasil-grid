import React from 'react';
import { subsystems, majorPowerPlants, majorTransmissionLines } from '../../data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import {
  X,
  Filter,
  Droplet,
  Sun,
  Wind,
  Atom,
  Flame,
  Activity,
  Layers,
  BookOpen
} from 'lucide-react';
import { FilterButton } from './FilterButton';

interface ConsoleSidebarProps {
  onOpenLearn: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  voltageFilter: 'all' | '800' | '500';
  setVoltageFilter: (filter: 'all' | '800' | '500') => void;
  plantTypeFilter: string;
  setPlantTypeFilter: (type: string) => void;
  onSelectPlant: (plant: PowerPlantFeature) => void;
  onSelectLine: (line: TransmissionLineFeature) => void;
  showPowerFlow: boolean;
  setShowPowerFlow: (show: boolean) => void;
  showSubsystems: boolean;
  setShowSubsystems: (show: boolean) => void;
}

export const ConsoleSidebar: React.FC<ConsoleSidebarProps> = ({
  onOpenLearn,
  isOpen,
  setIsOpen,
  voltageFilter,
  setVoltageFilter,
  plantTypeFilter,
  setPlantTypeFilter,
  onSelectPlant,
  onSelectLine,
  showPowerFlow,
  setShowPowerFlow,
  showSubsystems,
  setShowSubsystems
}) => {
  if (!isOpen) return null;

  return (
    <aside className="h-full flex flex-col shadow-2xl z-30 transition-all duration-200 w-full sm:w-[460px] lg:w-[520px] bg-[#090c13]/95 backdrop-blur-2xl border-r border-slate-800/90 animate-in slide-in-from-left">

      {/* Top Header of the Drawer */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 font-bold">
          <span>TOPOLOGIA DO SIN</span>
        </div>

        <div className="flex items-center space-x-1.5 ml-2">
          <button
            type="button"
            onClick={onOpenLearn}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition cursor-pointer text-[11px] font-mono"
            title="Ir para o guia do setor elétrico (conteúdo de referência)"
            aria-label="Abrir guia do setor"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-semibold">GUIA</span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Fechar painel (ocultar)"
            aria-label="Fechar painel lateral"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="w-full space-y-6">
          <div className="space-y-6 text-xs font-mono">
              {/* Layer Controls */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center space-x-2 text-cyan-400 uppercase font-bold text-[11px]">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filtros de Tensão & Infraestrutura</span>
                </div>

                {/* Voltage Filter */}
                <div className="space-y-2">
                  <span className="text-slate-500 text-[10px] uppercase block">TENSÃO DE TRANSMISSÃO:</span>
                  <div className="flex space-x-1.5">
                    <FilterButton
                      active={voltageFilter === 'all'}
                      colorScheme="cyan"
                      onClick={() => setVoltageFilter('all')}
                      className="flex-1 text-xs"
                      aria-label="Filtrar todas as tensões de transmissão"
                    >
                      Todas
                    </FilterButton>
                    <FilterButton
                      active={voltageFilter === '800'}
                      colorScheme="amber"
                      onClick={() => setVoltageFilter('800')}
                      className="flex-1 text-xs"
                      aria-label="Filtrar linhas de ±800 kV CC"
                    >
                      ±800 kV CC
                    </FilterButton>
                    <FilterButton
                      active={voltageFilter === '500'}
                      colorScheme="cyan"
                      onClick={() => setVoltageFilter('500')}
                      className="flex-1 text-xs"
                      aria-label="Filtrar linhas de 500 kV ou superior"
                    >
                      ≥ 500 kV CA
                    </FilterButton>
                  </div>
                </div>

                {/* Plant Source Filter */}
                <div className="space-y-2 pt-2 border-t border-slate-800/50">
                  <span className="text-slate-500 text-[10px] uppercase block">FONTE DE GERAÇÃO:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'all', label: 'Todas', icon: undefined },
                      { id: 'hidro', label: 'Hidro', icon: Droplet },
                      { id: 'solar', label: 'Solar', icon: Sun },
                      { id: 'eolica', label: 'Eólica', icon: Wind },
                      { id: 'nuclear', label: 'Nuclear', icon: Atom },
                      { id: 'termica', label: 'Térmica', icon: Flame }
                    ].map((item) => (
                      <FilterButton
                        key={item.id}
                        active={plantTypeFilter === item.id}
                        colorScheme="emerald"
                        icon={item.icon}
                        onClick={() => setPlantTypeFilter(item.id)}
                        className="text-[10px] uppercase"
                        aria-label={`Filtrar usinas da fonte ${item.label}`}
                      >
                        {item.label}
                      </FilterButton>
                    ))}
                  </div>
                </div>

                {/* Visual Layers WebGL Toggle (Animated Power Flow & Subsystems) */}
                <div className="space-y-2 pt-2 border-t border-slate-800/50">
                  <span className="text-slate-500 text-[10px] uppercase block">CAMADAS VISUAIS (WEBGL):</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <FilterButton
                      active={showPowerFlow}
                      colorScheme="cyan"
                      icon={Activity}
                      onClick={() => setShowPowerFlow(!showPowerFlow)}
                      className="text-[10px] uppercase"
                      aria-label="Alternar animação de fluxo de potência"
                    >
                      {showPowerFlow ? 'Fluxo: Ativo' : 'Fluxo: Oculto'}
                    </FilterButton>
                    <FilterButton
                      active={showSubsystems}
                      colorScheme="amber"
                      icon={Layers}
                      onClick={() => setShowSubsystems(!showSubsystems)}
                      className="text-[10px] uppercase"
                      aria-label="Alternar polígonos dos 4 subsistemas do SIN"
                    >
                      {showSubsystems ? 'Subsistemas: ON' : 'Subsistemas: OFF'}
                    </FilterButton>
                  </div>
                </div>
              </div>

              {/* List of Key Assets with Quick-Jump */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>USINAS ESTRATÉGICAS ({majorPowerPlants.length})</span>
                  <span className="text-slate-600">Clique para inspecionar</span>
                </div>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {majorPowerPlants
                    .filter((p) => plantTypeFilter === 'all' || p.type === plantTypeFilter)
                    .map((plant) => (
                      <div
                        key={plant.id}
                        onClick={() => onSelectPlant(plant)}
                        className="p-2 rounded bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between transition"
                      >
                        <div>
                          <strong className="text-white text-xs block">{plant.name}</strong>
                          <span className="text-[10px] text-slate-500">
                            {plant.state} • {plant.riverOrRegion}
                          </span>
                        </div>
                        <span className="text-cyan-400 font-bold text-xs">
                          {(plant.capacityMW / 1000).toFixed(1)} GW
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* List of Key Transmission Corridors */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>LINHAS TRONCO ({majorTransmissionLines.length})</span>
                  <span className="text-slate-600">Alta Tensão</span>
                </div>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {majorTransmissionLines.map((line) => (
                    <div
                      key={line.id}
                      onClick={() => onSelectLine(line)}
                      className="p-2 rounded bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-500/40 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <strong className="text-white text-xs block">{line.name}</strong>
                        <span className="text-[10px] text-slate-500">
                          {line.lengthKm.toLocaleString('pt-BR')} km • {line.concessionaire}
                        </span>
                      </div>
                      <span className="text-amber-400 font-bold text-xs">{line.voltageKV} kV</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsystems Overview */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[10px] uppercase block">SUBSISTEMAS ONS:</span>
                  <span className="text-slate-500 text-[10px]">
                    {showSubsystems ? 'Camada visível no mapa' : 'Camada oculta'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {subsystems.map((sub) => (
                    <div key={sub.id} className="p-2.5 rounded bg-slate-950/80 border border-slate-800/80">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-white font-bold">{sub.name}</span>
                        <span className="text-cyan-400 font-bold">{sub.loadShare}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans line-clamp-2">{sub.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>
    </aside>
  );
};
