import type { FilterSpecification } from 'maplibre-gl';
import type { TransmissionLineFeature, PowerPlantFeature } from './gridData';

export type LineVoltageFilter = 'all' | 'CC' | '500';

/**
 * Normaliza parâmetros de URL e inputs legados ('800' mapeia para 'CC').
 */
export function normalizeLineFilter(value: string | null | undefined): LineVoltageFilter {
  if (!value) return 'all';
  if (value === 'CC' || value === '800') return 'CC';
  if (value === '500') return '500';
  return 'all';
}

/**
 * Predicado TypeScript único para filtragem de linhas de transmissão.
 * 'CC': abrange todos os elos HVDC de Corrente Contínua (±800 kV e ±600 kV).
 * '500': linhas com nível nominal de tensão maior ou igual a 500 kV.
 */
export function matchesLineFilter(
  line: Pick<TransmissionLineFeature, 'type' | 'voltageKV'>,
  filter: LineVoltageFilter
): boolean {
  if (filter === 'CC') return line.type === 'CC';
  if (filter === '500') return line.voltageKV >= 500;
  return true;
}

/**
 * Expressão de filtro MapLibre GL correspondente ao predicado TypeScript.
 */
export function getLineMapLibreFilter(filter: LineVoltageFilter): FilterSpecification | null {
  if (filter === 'CC') return ['==', ['get', 'type'], 'CC'];
  if (filter === '500') return ['>=', ['get', 'voltageKV'], 500];
  return null;
}

export type PlantTypeFilter = 'all' | 'hidro' | 'solar' | 'eolica' | 'nuclear' | 'termica';

/**
 * Predicado TypeScript único para filtragem de usinas geradoras por fonte.
 */
export function matchesPlantFilter(plant: Pick<PowerPlantFeature, 'type'>, filter: string): boolean {
  if (!filter || filter === 'all') return true;
  return plant.type === filter;
}

/**
 * Expressão de filtro MapLibre GL para usinas geradoras.
 */
export function getPlantMapLibreFilter(filter: string): FilterSpecification | null {
  if (!filter || filter === 'all') return null;
  return ['==', ['get', 'type'], filter];
}
