import React, { useState } from 'react';
import { majorPowerPlants, majorTransmissionLines } from '../../data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import {
  regionalInterchanges,
  getInterchangeStatus,
  getStatusTheme,
  type InterchangeId
} from '../../data/interchangeData';
import { X, Droplet, Sun, Wind, Atom, Flame } from 'lucide-react';
import { FilterButton } from './FilterButton';
import { NodeInspector } from '../Inspector/NodeInspector';
import {
  type LineVoltageFilter,
  matchesLineFilter,
  matchesPlantFilter
} from '../../data/gridFilters';
import { cn } from '../../utils/cn';

interface ConsoleSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  voltageFilter: LineVoltageFilter;
  setVoltageFilter: (filter: LineVoltageFilter) => void;
  plantTypeFilter: string;
  setPlantTypeFilter: (type: string) => void;
  onSelectPlant: (plant: PowerPlantFeature) => void;
  onSelectLine: (line: TransmissionLineFeature) => void;
  selectedPlant: PowerPlantFeature | null;
  selectedLine: TransmissionLineFeature | null;
  onClearSelection: () => void;
  showSubsystems: boolean;
  setShowSubsystems: (show: boolean) => void;
  onOpenInterchange?: (id?: InterchangeId) => void;
}

const PLANT_TYPES = [
  { id: 'all', label: 'Todas', icon: undefined },
  { id: 'hidro', label: 'Hidro', icon: Droplet },
  { id: 'solar', label: 'Solar', icon: Sun },
  { id: 'eolica', label: 'Eólica', icon: Wind },
  { id: 'nuclear', label: 'Nuclear', icon: Atom },
  { id: 'termica', label: 'Térmica', icon: Flame }
];

const VOLTAGE_FILTERS: { id: LineVoltageFilter; label: string; aria: string }[] = [
  { id: 'all', label: 'Todas', aria: 'Filtrar todas as linhas' },
  { id: 'CC', label: 'HVDC', aria: 'Filtrar bipolos HVDC em Corrente Contínua (±800 kV e ±600 kV)' },
  { id: '500', label: '≥ 500 kV', aria: 'Filtrar linhas de 500 kV ou superior' }
];

const formatGW = (mw: number) =>
  (mw / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const SectionTitle: React.FC<{ children: React.ReactNode; aside?: React.ReactNode }> = ({ children, aside }) => (
  <div className="flex items-baseline justify-between mb-2">
    <h3 className="text-[11px] font-medium text-slate-500">{children}</h3>
    {aside}
  </div>
);

export const ConsoleSidebar: React.FC<ConsoleSidebarProps> = ({
  isOpen,
  setIsOpen,
  voltageFilter,
  setVoltageFilter,
  plantTypeFilter,
  setPlantTypeFilter,
  onSelectPlant,
  onSelectLine,
  selectedPlant,
  selectedLine,
  onClearSelection,
  showSubsystems,
  setShowSubsystems,
  onOpenInterchange
}) => {
  const [assetTab, setAssetTab] = useState<'plants' | 'lines'>('plants');
  const hasSelection = !!(selectedPlant || selectedLine);

  if (!isOpen && !hasSelection) return null;

  const filteredPlants = majorPowerPlants.filter((p) => matchesPlantFilter(p, plantTypeFilter));
  const filteredLines = majorTransmissionLines.filter((line) => matchesLineFilter(line, voltageFilter));

  return (
    <aside className="h-full flex flex-col z-30 w-full sm:w-[360px] shrink-0 bg-[#090c13] border-r border-slate-800">
      {hasSelection && (
        <NodeInspector
          plant={selectedPlant}
          line={selectedLine}
          onBack={onClearSelection}
          onClose={() => {
            onClearSelection();
            setIsOpen(false);
          }}
        />
      )}

      {/* Hidden rather than unmounted so list scroll position survives a round-trip through the detail view */}
      <div className={cn('flex-1 min-h-0 flex flex-col', hasSelection && 'hidden')}>
        <div className="h-10 px-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-sm text-slate-200">Painel do SIN</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Fechar painel lateral"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/70 text-sm">
          <section className="px-4 py-4 space-y-4">
            <div>
              <SectionTitle>Transmissão</SectionTitle>
              <div className="flex gap-1">
                {VOLTAGE_FILTERS.map((f) => (
                  <FilterButton
                    key={f.id}
                    active={voltageFilter === f.id}
                    onClick={() => setVoltageFilter(f.id)}
                    className="flex-1"
                    aria-label={f.aria}
                  >
                    {f.label}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle>Fonte de geração</SectionTitle>
              <div className="grid grid-cols-3 gap-1">
                {PLANT_TYPES.map((item) => (
                  <FilterButton
                    key={item.id}
                    active={plantTypeFilter === item.id}
                    icon={item.icon}
                    onClick={() => setPlantTypeFilter(item.id)}
                    aria-label={`Filtrar fonte ${item.label}`}
                  >
                    {item.label}
                  </FilterButton>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between cursor-pointer text-xs text-slate-300">
              <span>Limites dos 4 subsistemas</span>
              <input
                type="checkbox"
                checked={showSubsystems}
                onChange={() => setShowSubsystems(!showSubsystems)}
                className="accent-cyan-500 cursor-pointer"
                aria-label="Alternar subsistemas"
              />
            </label>
          </section>

          <section className="px-4 py-4">
            <SectionTitle
              aside={
                onOpenInterchange && (
                  <button
                    type="button"
                    onClick={() => onOpenInterchange()}
                    className="text-[11px] text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Detalhes
                  </button>
                )
              }
            >
              Intercâmbios <span className="text-slate-600">· fluxo de referência / limite</span>
            </SectionTitle>
            <ul className="space-y-2.5">
              {regionalInterchanges.map((ic) => {
                const status = getInterchangeStatus(ic.nominalFlowMW, ic.maxExportLimitMW);
                const loadingPct = Math.min(100, (Math.abs(ic.nominalFlowMW) / ic.maxExportLimitMW) * 100);
                return (
                  <li key={ic.id}>
                    <button
                      type="button"
                      onClick={() => onOpenInterchange?.(ic.id)}
                      className="w-full text-left group cursor-pointer"
                      title={ic.name}
                    >
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-slate-300 group-hover:text-white transition-colors">
                          <span className="font-mono">{ic.shortCode}</span>
                          <span className="text-slate-500 ml-2">{ic.primaryDirection}</span>
                        </span>
                        <span className="font-mono tabular-nums text-slate-400">
                          <span className="text-slate-200">{formatGW(ic.nominalFlowMW)}</span> / {formatGW(ic.maxExportLimitMW)} GW
                        </span>
                      </div>
                      <div className="mt-1.5 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${loadingPct}%`,
                            backgroundColor: status === 'nominal' ? '#64748b' : getStatusTheme(status).color
                          }}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="py-3">
            <div className="px-4 flex gap-4 text-xs border-b border-slate-800/70">
              {([
                ['plants', `Usinas (${filteredPlants.length})`],
                ['lines', `Linhas (${filteredLines.length})`]
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setAssetTab(id)}
                  className={cn(
                    'pb-2 -mb-px border-b transition-colors cursor-pointer',
                    assetTab === id
                      ? 'border-slate-200 text-slate-100'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <ul className="max-h-80 overflow-y-auto">
              {assetTab === 'plants' ? (
                filteredPlants.length === 0 ? (
                  <li className="px-4 py-3 text-xs text-slate-500">Nenhuma usina com os filtros atuais.</li>
                ) : (
                  filteredPlants.map((plant) => (
                    <li key={plant.id}>
                      <button
                        type="button"
                        onClick={() => onSelectPlant(plant)}
                        className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-slate-900 transition-colors cursor-pointer"
                      >
                        <span className="truncate mr-3">
                          <span className="block text-xs text-slate-200 truncate">{plant.name}</span>
                          <span className="block text-[11px] text-slate-500 truncate">
                            {plant.state} · {plant.riverOrRegion}
                          </span>
                        </span>
                        <span className="text-xs font-mono tabular-nums text-slate-300 shrink-0">
                          {formatGW(plant.capacityMW)} GW
                        </span>
                      </button>
                    </li>
                  ))
                )
              ) : filteredLines.length === 0 ? (
                <li className="px-4 py-3 text-xs text-slate-500">Nenhuma linha com a tensão selecionada.</li>
              ) : (
                filteredLines.map((line) => (
                  <li key={line.id}>
                    <button
                      type="button"
                      onClick={() => onSelectLine(line)}
                      className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                      <span className="truncate mr-3">
                        <span className="block text-xs text-slate-200 truncate">{line.name}</span>
                        <span className="block text-[11px] text-slate-500 truncate">
                          {line.lengthKm.toLocaleString('pt-BR')} km · {line.concessionaire}
                        </span>
                      </span>
                      <span className="text-xs font-mono tabular-nums text-slate-300 shrink-0">
                        {line.voltageKV} kV
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </div>
    </aside>
  );
};
