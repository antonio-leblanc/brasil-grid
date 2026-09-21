import React from 'react';
import { ValueChainSection } from '../EnergyChain/ValueChainSection';
import { AcrAclComparison } from '../Market/AcrAclComparison';
import { MagnitudeRuler } from '../Scales/MagnitudeRuler';
import { subsystems, majorPowerPlants, majorTransmissionLines } from '../../data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import { X, Filter, Droplet, Sun, Wind, Atom, Flame } from 'lucide-react';

interface ConsoleSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  voltageFilter: 'all' | '800' | '500';
  setVoltageFilter: (filter: 'all' | '800' | '500') => void;
  plantTypeFilter: string;
  setPlantTypeFilter: (type: string) => void;
  onSelectPlant: (plant: PowerPlantFeature) => void;
  onSelectLine: (line: TransmissionLineFeature) => void;
}

export const ConsoleSidebar: React.FC<ConsoleSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  voltageFilter,
  setVoltageFilter,
  plantTypeFilter,
  setPlantTypeFilter,
  onSelectPlant,
  onSelectLine
}) => {
  if (!isOpen) return null;

  return (
    <aside className="w-full sm:w-[460px] lg:w-[520px] bg-[#090c13]/95 backdrop-blur-2xl border-r border-slate-800/90 h-full flex flex-col shadow-2xl z-30 animate-in slide-in-from-left duration-200">
      {/* Top Header of the Drawer */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center space-x-1 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('topologia')}
            className={`px-2.5 py-1.5 rounded transition ${
              activeTab === 'topologia'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            01. Topologia
          </button>
          <button
            onClick={() => setActiveTab('cadeia')}
            className={`px-2.5 py-1.5 rounded transition ${
              activeTab === 'cadeia'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            02. Cadeia SEB
          </button>
          <button
            onClick={() => setActiveTab('mercado')}
            className={`px-2.5 py-1.5 rounded transition ${
              activeTab === 'mercado'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            03. Mercado ACL
          </button>
          <button
            onClick={() => setActiveTab('escalas')}
            className={`px-2.5 py-1.5 rounded transition ${
              activeTab === 'escalas'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            04. Grandezas
          </button>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition ml-2"
          title="Fechar painel (ocultar)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeTab === 'topologia' && (
          <div className="space-y-6 text-xs font-mono">
            {/* Layer Controls */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center space-x-2 text-cyan-400 uppercase font-bold text-[11px]">
                <Filter className="w-3.5 h-3.5" />
                <span>Filtros de Tensão & Infraestrutura</span>
              </div>

              <div className="space-y-2">
                <span className="text-slate-500 text-[10px] uppercase block">TENSÃO DE TRANSMISSÃO:</span>
                <div className="flex space-x-1.5">
                  <button
                    onClick={() => setVoltageFilter('all')}
                    className={`flex-1 py-1.5 rounded text-center border transition ${
                      voltageFilter === 'all'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setVoltageFilter('800')}
                    className={`flex-1 py-1.5 rounded text-center border transition ${
                      voltageFilter === '800'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ±800 kV CC
                  </button>
                  <button
                    onClick={() => setVoltageFilter('500')}
                    className={`flex-1 py-1.5 rounded text-center border transition ${
                      voltageFilter === '500'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ≥ 500 kV CA
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/50">
                <span className="text-slate-500 text-[10px] uppercase block">FONTE DE GERAÇÃO:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'all', label: 'Todas', icon: null },
                    { id: 'hidro', label: 'Hidro', icon: Droplet },
                    { id: 'solar', label: 'Solar', icon: Sun },
                    { id: 'eolica', label: 'Eólica', icon: Wind },
                    { id: 'nuclear', label: 'Nuclear', icon: Atom },
                    { id: 'termica', label: 'Térmica', icon: Flame }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPlantTypeFilter(item.id)}
                      className={`py-1.5 rounded border text-[10px] uppercase transition flex items-center justify-center space-x-1 ${
                        plantTypeFilter === item.id
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.icon && <item.icon className="w-3 h-3" />}
                      <span>{item.label}</span>
                    </button>
                  ))}
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
                        <span className="text-[10px] text-slate-500">{plant.state} • {plant.riverOrRegion}</span>
                      </div>
                      <span className="text-cyan-400 font-bold text-xs">{(plant.capacityMW / 1000).toFixed(1)} GW</span>
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
                      <span className="text-[10px] text-slate-500">{line.lengthKm.toLocaleString('pt-BR')} km • {line.concessionaire}</span>
                    </div>
                    <span className="text-amber-400 font-bold text-xs">{line.voltageKV} kV</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsystems Overview */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-slate-500 text-[10px] uppercase block">SUBSISTEMAS ONS:</span>
              <div className="grid grid-cols-2 gap-2">
                {subsystems.map((sub) => (
                  <div key={sub.id} className="p-2.5 rounded bg-slate-950/80 border border-slate-800/80">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-white font-bold">{sub.name}</span>
                      <span className="text-cyan-400">{sub.loadShare}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans line-clamp-2">{sub.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cadeia' && (
          <div className="animate-in fade-in duration-200">
            <ValueChainSection />
          </div>
        )}

        {activeTab === 'mercado' && (
          <div className="animate-in fade-in duration-200">
            <AcrAclComparison />
          </div>
        )}

        {activeTab === 'escalas' && (
          <div className="animate-in fade-in duration-200">
            <MagnitudeRuler />
          </div>
        )}
      </div>
    </aside>
  );
};
