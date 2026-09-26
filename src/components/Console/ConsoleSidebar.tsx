import React, { useState } from 'react';
import { majorPowerPlants, majorTransmissionLines } from '../../data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import {
  regionalInterchanges,
  getInterchangeStatus,
  getStatusTheme,
  type InterchangeId
} from '../../data/interchangeData';
import {
  X,
  Filter,
  Droplet,
  Sun,
  Wind,
  Atom,
  Flame,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { FilterButton } from './FilterButton';
import {
  type LineVoltageFilter,
  matchesLineFilter,
  matchesPlantFilter
} from '../../data/gridFilters';

interface ConsoleSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  voltageFilter: LineVoltageFilter;
  setVoltageFilter: (filter: LineVoltageFilter) => void;
  plantTypeFilter: string;
  setPlantTypeFilter: (type: string) => void;
  onSelectPlant: (plant: PowerPlantFeature) => void;
  onSelectLine: (line: TransmissionLineFeature) => void;
  showSubsystems: boolean;
  setShowSubsystems: (show: boolean) => void;
  onOpenInterchangeModal?: (id?: InterchangeId) => void;
}

export const ConsoleSidebar: React.FC<ConsoleSidebarProps> = ({
  isOpen,
  setIsOpen,
  voltageFilter,
  setVoltageFilter,
  plantTypeFilter,
  setPlantTypeFilter,
  onSelectPlant,
  onSelectLine,
  showSubsystems,
  setShowSubsystems,
  onOpenInterchangeModal
}) => {
  const [assetTab, setAssetTab] = useState<'plants' | 'lines'>('plants');

  if (!isOpen) return null;

  const filteredPlants = majorPowerPlants.filter((p) =>
    matchesPlantFilter(p, plantTypeFilter)
  );

  const filteredLines = majorTransmissionLines.filter((line) =>
    matchesLineFilter(line, voltageFilter)
  );

  return (
    <aside className="h-full flex flex-col shadow-2xl z-30 transition-all duration-200 w-full sm:w-[380px] lg:w-[410px] bg-[#090c13]/95 backdrop-blur-2xl border-r border-slate-800/90 animate-in slide-in-from-left">
      {/* Top Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 font-bold">
          <span>PAINEL DO SIN</span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          title="Fechar painel lateral"
          aria-label="Fechar painel lateral"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono">
        {/* 1. Layer & Filter Controls */}
        <div className="space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-cyan-400 uppercase font-bold text-[10px]">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros do Mapa</span>
          </div>

          {/* Voltage Filter */}
          <div className="space-y-1.5">
            <span className="text-slate-500 text-[9px] uppercase block">Transmissão (Tecnologia & Tensão):</span>
            <div className="flex space-x-1">
              <FilterButton
                active={voltageFilter === 'all'}
                colorScheme="cyan"
                onClick={() => setVoltageFilter('all')}
                className="flex-1 text-[11px] py-1"
                aria-label="Filtrar todas as linhas"
              >
                Todas
              </FilterButton>
              <FilterButton
                active={voltageFilter === 'CC'}
                colorScheme="amber"
                onClick={() => setVoltageFilter('CC')}
                className="flex-1 text-[11px] py-1"
                aria-label="Filtrar bipolos HVDC em Corrente Contínua (±800 kV e ±600 kV)"
              >
                CC (HVDC)
              </FilterButton>
              <FilterButton
                active={voltageFilter === '500'}
                colorScheme="cyan"
                onClick={() => setVoltageFilter('500')}
                className="flex-1 text-[11px] py-1"
                aria-label="Filtrar linhas de 500 kV ou superior"
              >
                ≥ 500 kV
              </FilterButton>
            </div>
          </div>

          {/* Plant Source Filter */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/50">
            <span className="text-slate-500 text-[9px] uppercase block">Fonte de Geração:</span>
            <div className="grid grid-cols-3 gap-1">
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
                  className="text-[9px] uppercase py-1"
                  aria-label={`Filtrar fonte ${item.label}`}
                >
                  {item.label}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Visual Layers Toggle */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/50">
            <span className="text-slate-500 text-[9px] uppercase block">Camadas Visuais:</span>
            <FilterButton
              active={showSubsystems}
              colorScheme="amber"
              icon={Layers}
              onClick={() => setShowSubsystems(!showSubsystems)}
              className="w-full text-[9px] uppercase py-1"
              aria-label="Alternar subsistemas"
            >
              4 Subsistemas (Regiões)
            </FilterButton>
          </div>
        </div>

        {/* 2. Regional Interchanges Quick Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold uppercase text-[10px]">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>GARGALOS & INTERCÂMBIOS (4)</span>
            </div>
            {onOpenInterchangeModal && (
              <button
                type="button"
                onClick={() => onOpenInterchangeModal()}
                className="text-cyan-400 hover:text-cyan-300 text-[10px] font-semibold cursor-pointer"
              >
                Detalhes →
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {regionalInterchanges.map((ic) => {
              const status = getInterchangeStatus(ic.nominalFlowMW, ic.maxExportLimitMW);
              const theme = getStatusTheme(status);
              return (
                <div
                  key={ic.id}
                  onClick={() => onOpenInterchangeModal?.(ic.id)}
                  className="p-2 rounded-lg bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer flex flex-col justify-between transition"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-white text-xs">{ic.shortCode}</strong>
                    <span
                      className="text-[8px] px-1 py-0.2 rounded font-bold uppercase"
                      style={{
                        color: theme.color,
                        backgroundColor: `${theme.color}15`,
                        border: `1px solid ${theme.color}40`
                      }}
                    >
                      {status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-baseline justify-between">
                    <span>Fluxo:</span>
                    <strong className="text-white">{(ic.nominalFlowMW / 1000).toFixed(1)} GW</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Tabbed Asset Explorer (Usinas vs Linhas) */}
        <div className="space-y-2 pt-1 border-t border-slate-800/70">
          {/* Tab selector */}
          <div className="flex rounded-lg bg-slate-950/80 p-0.5 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setAssetTab('plants')}
              className={`flex-1 py-1 rounded-md transition font-semibold cursor-pointer flex items-center justify-center space-x-1.5 ${
                assetTab === 'plants'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Usinas ({filteredPlants.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setAssetTab('lines')}
              className={`flex-1 py-1 rounded-md transition font-semibold cursor-pointer flex items-center justify-center space-x-1.5 ${
                assetTab === 'lines'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Linhas ({filteredLines.length})</span>
            </button>
          </div>

          {/* Asset List Content */}
          <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
            {assetTab === 'plants' ? (
              filteredPlants.length === 0 ? (
                <div className="p-3 text-center text-slate-500 text-xs">
                  Nenhuma usina encontrada com os filtros atuais.
                </div>
              ) : (
                filteredPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="p-2 rounded-lg bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between transition"
                  >
                    <div className="truncate mr-2">
                      <strong className="text-white text-xs block truncate">{plant.name}</strong>
                      <span className="text-[10px] text-slate-500">
                        {plant.state} • {plant.riverOrRegion}
                      </span>
                    </div>
                    <span className="text-cyan-400 font-bold text-xs shrink-0 font-mono">
                      {(plant.capacityMW / 1000).toFixed(1)} GW
                    </span>
                  </div>
                ))
              )
            ) : (
              filteredLines.length === 0 ? (
                <div className="p-3 text-center text-slate-500 text-xs">
                  Nenhuma linha encontrada com a tensão selecionada.
                </div>
              ) : (
                filteredLines.map((line) => (
                  <div
                    key={line.id}
                    onClick={() => onSelectLine(line)}
                    className="p-2 rounded-lg bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-500/40 cursor-pointer flex items-center justify-between transition"
                  >
                    <div className="truncate mr-2">
                      <strong className="text-white text-xs block truncate">{line.name}</strong>
                      <span className="text-[10px] text-slate-500">
                        {line.lengthKm.toLocaleString('pt-BR')} km • {line.concessionaire}
                      </span>
                    </div>
                    <span className="text-amber-400 font-bold text-xs shrink-0 font-mono">
                      {line.voltageKV} kV
                    </span>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
