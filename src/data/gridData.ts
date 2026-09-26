import type { SourceRef } from './sources';

export { majorPowerPlants } from './powerPlantsData';
export { majorTransmissionLines } from './transmissionLinesData';

export interface PowerPlantFeature {
  id: string;
  name: string;
  type: 'hidro' | 'eolica' | 'solar' | 'nuclear' | 'termica';
  capacityMW: number;
  subsystem: 'SE/CO' | 'S' | 'NE' | 'N';
  state: string;
  riverOrRegion: string;
  operator: string;
  coordinates: [number, number]; // [lon, lat]
  description: string;
  sources: SourceRef[];
  verification?: 'verified' | 'unverified';
  technicalDetails?: {
    commissionYear?: number;
    turbinesOrUnits?: string;
    flowOrEfficiency?: string;
    gridConnectionVoltage?: string;
  };
}

export interface TransmissionLineFeature {
  id: string;
  name: string;
  voltageKV: number;
  type: 'CC' | 'CA'; // Corrente Contínua vs Corrente Alternada
  lengthKm: number;
  from: string;
  to: string;
  concessionaire: string;
  coordinates: [number, number][]; // Line coordinates [lon, lat]
  sources: SourceRef[];
  verification?: 'verified' | 'unverified';
  technicalDetails?: {
    converterTechnology?: string;
    towerCount?: number;
    substations?: string[];
  };
}

export interface GridSnapshot {
  frequencyHz: number;
  instantaneousLoadMW: number;
  peakRecordMW: number;
  renewableSharePct: number;
  systemStatus: string;
  referenceNote: string;
  sources?: SourceRef[];
  interchanges: {
    from: string;
    to: string;
    flowMW: number;
    direction: 'EXPORT' | 'IMPORT';
  }[];
  generationMix: {
    source: string;
    mw: number;
    pct: number;
    color: string;
  }[];
}

/**
 * Snapshot estático de referência técnica do Sistema Interligado Nacional (SIN).
 * Valores representativos para modelagem física e educacional (não constitui telemetria em tempo real).
 */
export const referenceGridSnapshot: GridSnapshot = {
  frequencyHz: 60.00,
  instantaneousLoadMW: 85420,
  peakRecordMW: 106532,
  renewableSharePct: 84.8,
  systemStatus: 'NOMINAL // SNAPSHOT DE REFERÊNCIA SIN',
  referenceNote: 'Dados estáticos de referência técnica representativos da operação do SIN',
  interchanges: [
    { from: 'N', to: 'SE/CO', flowMW: 8420, direction: 'EXPORT' },
    { from: 'NE', to: 'SE/CO', flowMW: 6180, direction: 'EXPORT' },
    { from: 'S', to: 'SE/CO', flowMW: 2340, direction: 'EXPORT' }
  ],
  generationMix: [
    { source: 'Hidráulica', mw: 48200, pct: 56.4, color: '#10b981' },
    { source: 'Eólica', mw: 13500, pct: 15.8, color: '#38bdf8' },
    { source: 'Solar Fotov.', mw: 9600, pct: 11.2, color: '#facc15' },
    { source: 'Térmica/Gás', mw: 8200, pct: 9.6, color: '#f97316' },
    { source: 'Biomassa', mw: 4000, pct: 4.7, color: '#a855f7' },
    { source: 'Nuclear', mw: 1920, pct: 2.3, color: '#ec4899' }
  ]
};

/** @deprecated Utilizar referenceGridSnapshot para explicitar natureza estática/referencial */
export const liveGridTelemetry = referenceGridSnapshot;

export const subsystems = [
  { id: 'SE_CO', name: 'Sudeste / Centro-Oeste', loadShare: '58.4%', center: [-47.92, -18.8], desc: 'Centro de gravidade do consumo e capacidade de regularização plurianual dos reservatórios.' },
  { id: 'S', name: 'Sul', loadShare: '17.2%', center: [-51.21, -27.5], desc: 'Polo hidroelétrico do Iguaçu/Uruguai e interligações internacionais com Argentina e Uruguai.' },
  { id: 'NE', name: 'Nordeste', loadShare: '16.8%', center: [-39.50, -9.5], desc: 'Exportador líquido estrutural de energia renovável (eólica noturna e solar diurna).' },
  { id: 'N', name: 'Norte', loadShare: '7.6%', center: [-52.50, -4.2], desc: 'Supergerador a fio d\'água (Belo Monte/Tucuruí) drenado para o centro de carga nacional via UHVDC.' }
];
