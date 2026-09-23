// Modelagem de Dados Operacionais e Físicos dos Intercâmbios Regionais do SIN (ONS)
// Calibrado com os limites de fluxo controlado e medições consolidadas do ONS 2026

export type InterchangeId = 'NE_SECO' | 'N_SECO' | 'N_NE' | 'S_SECO';
export type SubsystemCode = 'SE_CO' | 'S' | 'NE' | 'N';
export type InterchangeStatus = 'nominal' | 'alert' | 'critical';

export interface BottleneckDetail {
  cause: string;
  consequences: string;
  mitigation: string;
  technicalStandard: string;
}

export interface HourlyInterchangePoint {
  hour: number;
  timeLabel: string;
  flowMW: number; // Positivo: Origem -> Destino; Negativo: Destino -> Origem
  limitMW: number;
  saturationPct: number;
}

export interface RegionalInterchange {
  id: InterchangeId;
  name: string;
  shortCode: string;
  fromSubsystem: SubsystemCode;
  fromName: string;
  toSubsystem: SubsystemCode;
  toName: string;
  primaryDirection: string; // Ex: 'NE → SE/CO'
  reverseDirection: string; // Ex: 'SE/CO → NE'
  nominalFlowMW: number;
  maxExportLimitMW: number; // Limite operativo máximo no sentido principal
  maxImportLimitMW: number; // Limite operativo máximo no sentido reverso
  voltageKV: number[]; // Níveis de tensão das linhas de fronteira
  mainLines: string[]; // Principais troncos que compõem a interface
  interfaceCoordinates: [number, number]; // [lon, lat] Ponto central geográfico da fronteira
  pathCoordinates: [number, number][]; // Polilinha que representa o corredor no mapa
  bottleneck: BottleneckDetail;
  hourlyProfile24h: HourlyInterchangePoint[];
}

export interface SubsystemBalance {
  code: SubsystemCode;
  name: string;
  shortName: string;
  netExportMW: number; // Positivo = Exportador líquido, Negativo = Importador líquido
  role: 'EXPORTADOR LÍQUIDO' | 'IMPORTADOR LÍQUIDO' | 'EQUILIBRADO';
  connectedInterfaces: InterchangeId[];
}

export const regionalInterchanges: RegionalInterchange[] = [
  {
    id: 'NE_SECO',
    name: 'Fronteira Nordeste → Sudeste / Centro-Oeste',
    shortCode: 'F-NE/SE',
    fromSubsystem: 'NE',
    fromName: 'Nordeste',
    toSubsystem: 'SE_CO',
    toName: 'Sudeste / Centro-Oeste',
    primaryDirection: 'NE → SE/CO',
    reverseDirection: 'SE/CO → NE',
    nominalFlowMW: 7850,
    maxExportLimitMW: 13500,
    maxImportLimitMW: 4000,
    voltageKV: [500],
    mainLines: [
      'LT 500 kV Bom Jesus da Lapa II – Rio das Éguas',
      'LT 500 kV Poções III – Padre Bernardo',
      'LT 500 kV Morro do Chapéu II – Poções III',
      'LT 500 kV Rio das Éguas – Luziânia'
    ],
    interfaceCoordinates: [-43.8, -14.8],
    pathCoordinates: [
      [-40.5, -10.5], // Pólo Eólico/Solar Bahia (Sobradinho / Juazeiro)
      [-42.5, -12.5], // Bom Jesus da Lapa
      [-43.8, -14.8], // Fronteira BA/MG
      [-45.5, -16.8], // Norte de MG (Pirapora / Paracatu)
      [-47.2, -18.5]  // Conexão Malha Sudeste (Triângulo Mineiro / Planalto Central)
    ],
    bottleneck: {
      cause: 'Saturação de capacidade de transmissão térmica dos troncos 500 kV na Bahia e Minas Gerais, combinada com limites de estabilidade angular transitória e margem de estabilidade de tensão (curva P-V) em contingência N-1.',
      consequences: 'Imposição severa de curtailment (constrained-off) de usinas eólicas e solares fotovoltaicas durante as horas de pico de geração (11h às 15h para solar; 18h às 22h para eólica), gerando vertimento de energia limpa com custo zero de combustível.',
      mitigation: 'Construção de novos corredores de 500 kV leiloados (Lote 1 e 2 dos leilões de transmissão ONS/ANEEL), instalação de Compensadores Síncronos em subestações estratégicas do NE para sustentação de curto-circuito e BESS (Sistemas de Baterias) em grande escala.',
      technicalStandard: 'Procedimentos de Rede ONS — Submódulo 23.3 (Critérios de Estabilidade e Limites de Intercâmbio).'
    },
    hourlyProfile24h: [
      { hour: 0, timeLabel: '00:00', flowMW: 4850, limitMW: 12500, saturationPct: 38.8 },
      { hour: 1, timeLabel: '01:00', flowMW: 4720, limitMW: 12500, saturationPct: 37.8 },
      { hour: 2, timeLabel: '02:00', flowMW: 4610, limitMW: 12500, saturationPct: 36.9 },
      { hour: 3, timeLabel: '03:00', flowMW: 4400, limitMW: 12500, saturationPct: 35.2 },
      { hour: 4, timeLabel: '04:00', flowMW: 4120, limitMW: 12500, saturationPct: 33.0 },
      { hour: 5, timeLabel: '05:00', flowMW: 3950, limitMW: 12500, saturationPct: 31.6 },
      { hour: 6, timeLabel: '06:00', flowMW: 4200, limitMW: 12800, saturationPct: 32.8 },
      { hour: 7, timeLabel: '07:00', flowMW: 5100, limitMW: 13000, saturationPct: 39.2 },
      { hour: 8, timeLabel: '08:00', flowMW: 6450, limitMW: 13200, saturationPct: 48.9 },
      { hour: 9, timeLabel: '09:00', flowMW: 8100, limitMW: 13500, saturationPct: 60.0 },
      { hour: 10, timeLabel: '10:00', flowMW: 9800, limitMW: 13500, saturationPct: 72.6 },
      { hour: 11, timeLabel: '11:00', flowMW: 11200, limitMW: 13500, saturationPct: 83.0 },
      { hour: 12, timeLabel: '12:00', flowMW: 12150, limitMW: 13500, saturationPct: 90.0 }, // Gargalo crítico
      { hour: 13, timeLabel: '13:00', flowMW: 12400, limitMW: 13500, saturationPct: 91.9 }, // Gargalo crítico
      { hour: 14, timeLabel: '14:00', flowMW: 12280, limitMW: 13500, saturationPct: 90.9 }, // Gargalo crítico
      { hour: 15, timeLabel: '15:00', flowMW: 11450, limitMW: 13500, saturationPct: 84.8 },
      { hour: 16, timeLabel: '16:00', flowMW: 9950, limitMW: 13500, saturationPct: 73.7 },
      { hour: 17, timeLabel: '17:00', flowMW: 7800, limitMW: 13200, saturationPct: 59.1 },
      { hour: 18, timeLabel: '18:00', flowMW: 8650, limitMW: 13200, saturationPct: 65.5 }, // Pico do vento noturno
      { hour: 19, timeLabel: '19:00', flowMW: 9400, limitMW: 13000, saturationPct: 72.3 },
      { hour: 20, timeLabel: '20:00', flowMW: 9100, limitMW: 13000, saturationPct: 70.0 },
      { hour: 21, timeLabel: '21:00', flowMW: 8250, limitMW: 12800, saturationPct: 64.5 },
      { hour: 22, timeLabel: '22:00', flowMW: 6900, limitMW: 12500, saturationPct: 55.2 },
      { hour: 23, timeLabel: '23:00', flowMW: 5600, limitMW: 12500, saturationPct: 44.8 }
    ]
  },
  {
    id: 'N_SECO',
    name: 'Fronteira Norte → Sudeste / Centro-Oeste',
    shortCode: 'F-N/SE',
    fromSubsystem: 'N',
    fromName: 'Norte',
    toSubsystem: 'SE_CO',
    toName: 'Sudeste / Centro-Oeste',
    primaryDirection: 'N → SE/CO',
    reverseDirection: 'SE/CO → N',
    nominalFlowMW: 8420,
    maxExportLimitMW: 14500,
    maxImportLimitMW: 3500,
    voltageKV: [800, 500],
    mainLines: [
      'Bipolo 1 UHVDC ±800 kV Xingu – Estreito (4.000 MW)',
      'Bipolo 2 UHVDC ±800 kV Xingu – Terminal Rio (4.000 MW)',
      'LT 500 kV Tucuruí – Miracema – Gurupi – Serra da Mesa',
      'LT 500 kV Xingu – Serra Pelada – Marabá'
    ],
    interfaceCoordinates: [-48.6, -9.2],
    pathCoordinates: [
      [-52.0, -3.2],  // UHE Belo Monte (Subestação Xingu)
      [-50.2, -6.5],  // Sudeste do Pará (Marabá / Xinguara)
      [-48.6, -9.2],  // Fronteira TO/PA (Miracema)
      [-48.2, -13.5], // Centro de Tocantins (Gurupi)
      [-48.3, -17.5]  // Norte de Goiás / Minas (Serra da Mesa / Estreito)
    ],
    bottleneck: {
      cause: 'Capacidade máxima de conversão das estações retificadoras/inversoras dos dois Bipolos de Corrente Contínua (UHVDC) de Belo Monte e limites dinâmicos de estabilidade transitória na malha CA 500 kV em caso de perda bipolar (N-2 de 4.000 MW com disparo de Esquema Regional de Alívio de Carga - ERAC).',
      consequences: 'Durante o período de cheia amazônica (fevereiro a maio), Belo Monte atinge 11.000 MW; se os bipolos estiverem com restrição ou manutenção de válvulas tiristoras, ocorre vertimento de turbináveis não aproveitados.',
      mitigation: 'Controle de modulação de potência ativa nos conversores HVDC, sistemas de amortecimento de oscilações interárea (POD) e terceiro elo de transmissão planejado.',
      technicalStandard: 'Procedimentos de Rede ONS — Submódulo 23.4 (Operação de Bipolos de Corrente Contínua).'
    },
    hourlyProfile24h: [
      { hour: 0, timeLabel: '00:00', flowMW: 7200, limitMW: 14000, saturationPct: 51.4 },
      { hour: 1, timeLabel: '01:00', flowMW: 7100, limitMW: 14000, saturationPct: 50.7 },
      { hour: 2, timeLabel: '02:00', flowMW: 6900, limitMW: 14000, saturationPct: 49.3 },
      { hour: 3, timeLabel: '03:00', flowMW: 6600, limitMW: 14000, saturationPct: 47.1 },
      { hour: 4, timeLabel: '04:00', flowMW: 6300, limitMW: 14000, saturationPct: 45.0 },
      { hour: 5, timeLabel: '05:00', flowMW: 6500, limitMW: 14000, saturationPct: 46.4 },
      { hour: 6, timeLabel: '06:00', flowMW: 7400, limitMW: 14200, saturationPct: 52.1 },
      { hour: 7, timeLabel: '07:00', flowMW: 8100, limitMW: 14500, saturationPct: 55.9 },
      { hour: 8, timeLabel: '08:00', flowMW: 8600, limitMW: 14500, saturationPct: 59.3 },
      { hour: 9, timeLabel: '09:00', flowMW: 8900, limitMW: 14500, saturationPct: 61.4 },
      { hour: 10, timeLabel: '10:00', flowMW: 9200, limitMW: 14500, saturationPct: 63.4 },
      { hour: 11, timeLabel: '11:00', flowMW: 9350, limitMW: 14500, saturationPct: 64.5 },
      { hour: 12, timeLabel: '12:00', flowMW: 9400, limitMW: 14500, saturationPct: 64.8 },
      { hour: 13, timeLabel: '13:00', flowMW: 9300, limitMW: 14500, saturationPct: 64.1 },
      { hour: 14, timeLabel: '14:00', flowMW: 9250, limitMW: 14500, saturationPct: 63.8 },
      { hour: 15, timeLabel: '15:00', flowMW: 9100, limitMW: 14500, saturationPct: 62.8 },
      { hour: 16, timeLabel: '16:00', flowMW: 9000, limitMW: 14500, saturationPct: 62.1 },
      { hour: 17, timeLabel: '17:00', flowMW: 9300, limitMW: 14500, saturationPct: 64.1 },
      { hour: 18, timeLabel: '18:00', flowMW: 9800, limitMW: 14500, saturationPct: 67.6 },
      { hour: 19, timeLabel: '19:00', flowMW: 10100, limitMW: 14500, saturationPct: 69.7 }, // Pico de carga SIN
      { hour: 20, timeLabel: '20:00', flowMW: 9950, limitMW: 14500, saturationPct: 68.6 },
      { hour: 21, timeLabel: '21:00', flowMW: 9400, limitMW: 14200, saturationPct: 66.2 },
      { hour: 22, timeLabel: '22:00', flowMW: 8700, limitMW: 14000, saturationPct: 62.1 },
      { hour: 23, timeLabel: '23:00', flowMW: 7900, limitMW: 14000, saturationPct: 56.4 }
    ]
  },
  {
    id: 'N_NE',
    name: 'Fronteira Norte ↔ Nordeste',
    shortCode: 'F-N/NE',
    fromSubsystem: 'N',
    fromName: 'Norte',
    toSubsystem: 'NE',
    toName: 'Nordeste',
    primaryDirection: 'N → NE',
    reverseDirection: 'NE → N',
    nominalFlowMW: 2650,
    maxExportLimitMW: 5200,
    maxImportLimitMW: 4800,
    voltageKV: [500],
    mainLines: [
      'LT 500 kV Imperatriz – Presidente Dutra (C1, C2, C3)',
      'LT 500 kV Presidente Dutra – Teresina II',
      'LT 500 kV Marabá – Imperatriz'
    ],
    interfaceCoordinates: [-46.2, -5.4],
    pathCoordinates: [
      [-49.8, -3.8], // UHE Tucuruí / Marabá
      [-47.5, -5.5], // Imperatriz (MA)
      [-46.2, -5.4], // Fronteira TO/MA/PI
      [-44.5, -5.3], // Presidente Dutra (MA)
      [-42.8, -5.1]  // Teresina II (PI)
    ],
    bottleneck: {
      cause: 'Forte inversão hidrotérmica e sazonal: no 1º semestre o Norte exporta a pleno vapor hidroelétrico (Tucuruí/Belo Monte) para o Nordeste; no 2º semestre o Nordeste inverte e exporta eólica massiva para socorrer a seca dos rios amazônicos.',
      consequences: 'Instabilidade angular entre os parques eólicos do Piauí/Maranhão e as hidrelétricas do Tocantins durante manobras de chaveamento ou contingência na SE Presidente Dutra.',
      mitigation: 'Compensação série capacitiva (FSC) nas linhas de 500 kV e sistemas automáticos de controle de tensão para absorção de reativo capacitivo em baixa carga.',
      technicalStandard: 'Procedimentos de Rede ONS — Diretrizes de Operação Interligação Norte-Nordeste.'
    },
    hourlyProfile24h: [
      { hour: 0, timeLabel: '00:00', flowMW: 1800, limitMW: 4800, saturationPct: 37.5 },
      { hour: 1, timeLabel: '01:00', flowMW: 1950, limitMW: 4800, saturationPct: 40.6 },
      { hour: 2, timeLabel: '02:00', flowMW: 1980, limitMW: 4800, saturationPct: 41.3 },
      { hour: 3, timeLabel: '03:00', flowMW: 1750, limitMW: 4800, saturationPct: 36.5 },
      { hour: 4, timeLabel: '04:00', flowMW: 1300, limitMW: 4800, saturationPct: 27.1 },
      { hour: 5, timeLabel: '05:00', flowMW: 850, limitMW: 4800, saturationPct: 17.7 },
      { hour: 6, timeLabel: '06:00', flowMW: -800, limitMW: 4500, saturationPct: 17.8 }, // Inverte (NE exporta pro Norte)
      { hour: 7, timeLabel: '07:00', flowMW: -1800, limitMW: 4500, saturationPct: 40.0 },
      { hour: 8, timeLabel: '08:00', flowMW: -2600, limitMW: 4500, saturationPct: 57.8 },
      { hour: 9, timeLabel: '09:00', flowMW: -3200, limitMW: 4800, saturationPct: 66.7 },
      { hour: 10, timeLabel: '10:00', flowMW: -3600, limitMW: 4800, saturationPct: 75.0 },
      { hour: 11, timeLabel: '11:00', flowMW: -3800, limitMW: 4800, saturationPct: 79.2 },
      { hour: 12, timeLabel: '12:00', flowMW: -3950, limitMW: 4800, saturationPct: 82.3 },
      { hour: 13, timeLabel: '13:00', flowMW: -3700, limitMW: 4800, saturationPct: 77.1 },
      { hour: 14, timeLabel: '14:00', flowMW: -3200, limitMW: 4800, saturationPct: 66.7 },
      { hour: 15, timeLabel: '15:00', flowMW: -2400, limitMW: 4800, saturationPct: 50.0 },
      { hour: 16, timeLabel: '16:00', flowMW: -1100, limitMW: 4800, saturationPct: 22.9 },
      { hour: 17, timeLabel: '17:00', flowMW: 700, limitMW: 5000, saturationPct: 14.0 },  // Volta sentido Norte -> NE
      { hour: 18, timeLabel: '18:00', flowMW: 2400, limitMW: 5000, saturationPct: 48.0 },
      { hour: 19, timeLabel: '19:00', flowMW: 3100, limitMW: 5000, saturationPct: 62.0 },
      { hour: 20, timeLabel: '20:00', flowMW: 3300, limitMW: 5000, saturationPct: 66.0 },
      { hour: 21, timeLabel: '21:00', flowMW: 2900, limitMW: 5000, saturationPct: 58.0 },
      { hour: 22, timeLabel: '22:00', flowMW: 2400, limitMW: 4800, saturationPct: 50.0 },
      { hour: 23, timeLabel: '23:00', flowMW: 2100, limitMW: 4800, saturationPct: 43.8 }
    ]
  },
  {
    id: 'S_SECO',
    name: 'Fronteira Sul ↔ Sudeste / Centro-Oeste',
    shortCode: 'F-S/SE',
    fromSubsystem: 'S',
    fromName: 'Sul',
    toSubsystem: 'SE_CO',
    toName: 'Sudeste / Centro-Oeste',
    primaryDirection: 'S → SE/CO',
    reverseDirection: 'SE/CO → S',
    nominalFlowMW: 2340,
    maxExportLimitMW: 8500,
    maxImportLimitMW: 6000,
    voltageKV: [500],
    mainLines: [
      'LT 500 kV Itá – Nova Santa Rita',
      'LT 500 kV Salto Caxias – Cascavel Oeste',
      'LT 500 kV Foz do Areia – Curitiba – Bateias',
      'LT 500 kV Ivaiporã – Londrina – Araraquara'
    ],
    interfaceCoordinates: [-50.5, -23.4],
    pathCoordinates: [
      [-52.8, -27.5], // Bacia do Uruguai / Itá / Machadinho
      [-52.0, -25.8], // Bacia do Iguaçu (Foz do Areia / Salto Santiago)
      [-51.2, -24.2], // Ivaiporã (PR)
      [-50.5, -23.4], // Fronteira PR/SP
      [-48.5, -22.3]  // Conexão Polo Industrial SP (Assis / Araraquara)
    ],
    bottleneck: {
      cause: 'Modo eletromecânico de oscilação interárea Sul-Sudeste (frequência entre 0,2 Hz e 0,4 Hz), restrições de carregamento térmico nos corredores do Paraná e limites de tensão no Triângulo SP/PR sob contingência.',
      consequences: 'Restrição à máxima exportação de excedentes das bacias do Iguaçu e Uruguai durante enchentes no Sul; ou teto de socorro térmico/hidro do Sudeste durante estiagens críticas no Rio Grande do Sul.',
      mitigation: 'Estabilizadores de Sistemas de Potência (PSS) ajustados nas UHEs de grande porte (Itaipu, Salto Caxias, Segredo, Itá) para amortecimento de oscilações, e novos circuitos 500 kV conectando o Paraná a São Paulo.',
      technicalStandard: 'Procedimentos de Rede ONS — Submódulo 23.5 (Interligação Sul-Sudeste).'
    },
    hourlyProfile24h: [
      { hour: 0, timeLabel: '00:00', flowMW: 1450, limitMW: 8000, saturationPct: 18.1 },
      { hour: 1, timeLabel: '01:00', flowMW: 2450, limitMW: 8000, saturationPct: 30.6 },
      { hour: 2, timeLabel: '02:00', flowMW: 3850, limitMW: 8000, saturationPct: 48.1 },
      { hour: 3, timeLabel: '03:00', flowMW: 4350, limitMW: 8000, saturationPct: 54.4 },
      { hour: 4, timeLabel: '04:00', flowMW: 4570, limitMW: 8000, saturationPct: 57.1 },
      { hour: 5, timeLabel: '05:00', flowMW: 4680, limitMW: 8000, saturationPct: 58.5 },
      { hour: 6, timeLabel: '06:00', flowMW: 1460, limitMW: 8200, saturationPct: 17.8 },
      { hour: 7, timeLabel: '07:00', flowMW: -800, limitMW: 6000, saturationPct: 13.3 }, // Inverte (SE exporta pro Sul)
      { hour: 8, timeLabel: '08:00', flowMW: -1200, limitMW: 6000, saturationPct: 20.0 },
      { hour: 9, timeLabel: '09:00', flowMW: -1500, limitMW: 6000, saturationPct: 25.0 },
      { hour: 10, timeLabel: '10:00', flowMW: -1400, limitMW: 6000, saturationPct: 23.3 },
      { hour: 11, timeLabel: '11:00', flowMW: -1100, limitMW: 6000, saturationPct: 18.3 },
      { hour: 12, timeLabel: '12:00', flowMW: -600, limitMW: 6000, saturationPct: 10.0 },
      { hour: 13, timeLabel: '13:00', flowMW: 300, limitMW: 8200, saturationPct: 3.7 },   // Sul volta a exportar
      { hour: 14, timeLabel: '14:00', flowMW: 900, limitMW: 8200, saturationPct: 11.0 },
      { hour: 15, timeLabel: '15:00', flowMW: 1400, limitMW: 8200, saturationPct: 17.1 },
      { hour: 16, timeLabel: '16:00', flowMW: 1950, limitMW: 8200, saturationPct: 23.8 },
      { hour: 17, timeLabel: '17:00', flowMW: 2600, limitMW: 8500, saturationPct: 30.6 },
      { hour: 18, timeLabel: '18:00', flowMW: 3400, limitMW: 8500, saturationPct: 40.0 },
      { hour: 19, timeLabel: '19:00', flowMW: 4100, limitMW: 8500, saturationPct: 48.2 },
      { hour: 20, timeLabel: '20:00', flowMW: 3800, limitMW: 8500, saturationPct: 44.7 },
      { hour: 21, timeLabel: '21:00', flowMW: 2900, limitMW: 8500, saturationPct: 34.1 },
      { hour: 22, timeLabel: '22:00', flowMW: 2600, limitMW: 8200, saturationPct: 31.7 },
      { hour: 23, timeLabel: '23:00', flowMW: 2200, limitMW: 8000, saturationPct: 27.5 }
    ]
  }
];

/**
 * Avalia o status SCADA com base no percentual de saturação da interface
 */
export function getInterchangeStatus(flowMW: number, maxLimitMW: number): InterchangeStatus {
  const ratio = Math.abs(flowMW) / maxLimitMW;
  if (ratio >= 0.90) return 'critical';
  if (ratio >= 0.70) return 'alert';
  return 'nominal';
}

/**
 * Retorna as cores de status para SCADA HUD
 */
export function getStatusTheme(status: InterchangeStatus): {
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  label: string;
} {
  switch (status) {
    case 'critical':
      return {
        color: '#ef4444',
        badgeBg: 'bg-red-500/15',
        badgeBorder: 'border-red-500/40',
        badgeText: 'text-red-400',
        label: 'GARGALO CRÍTICO / SATURAÇÃO'
      };
    case 'alert':
      return {
        color: '#f59e0b',
        badgeBg: 'bg-amber-500/15',
        badgeBorder: 'border-amber-500/40',
        badgeText: 'text-amber-400',
        label: 'ALERTA / CARREGAMENTO ELEVADO'
      };
    case 'nominal':
    default:
      return {
        color: '#10b981',
        badgeBg: 'bg-emerald-500/15',
        badgeBorder: 'border-emerald-500/40',
        badgeText: 'text-emerald-400',
        label: 'OPERACIONAL / FLUXO LIVRE'
      };
  }
}

/**
 * Calcula o balanço líquido de exportação e importação dos 4 subsistemas
 */
export function calculateSubsystemsBalance(
  interchanges: RegionalInterchange[]
): Record<SubsystemCode, SubsystemBalance> {
  const balance: Record<SubsystemCode, SubsystemBalance> = {
    SE_CO: {
      code: 'SE_CO',
      name: 'Sudeste / Centro-Oeste',
      shortName: 'SE/CO',
      netExportMW: 0,
      role: 'EQUILIBRADO',
      connectedInterfaces: ['NE_SECO', 'N_SECO', 'S_SECO']
    },
    NE: {
      code: 'NE',
      name: 'Nordeste',
      shortName: 'NE',
      netExportMW: 0,
      role: 'EQUILIBRADO',
      connectedInterfaces: ['NE_SECO', 'N_NE']
    },
    N: {
      code: 'N',
      name: 'Norte',
      shortName: 'N',
      netExportMW: 0,
      role: 'EQUILIBRADO',
      connectedInterfaces: ['N_SECO', 'N_NE']
    },
    S: {
      code: 'S',
      name: 'Sul',
      shortName: 'S',
      netExportMW: 0,
      role: 'EQUILIBRADO',
      connectedInterfaces: ['S_SECO']
    }
  };

  interchanges.forEach((ic) => {
    // Fluxo positivo significa From -> To
    balance[ic.fromSubsystem].netExportMW += ic.nominalFlowMW;
    balance[ic.toSubsystem].netExportMW -= ic.nominalFlowMW;
  });

  (Object.keys(balance) as SubsystemCode[]).forEach((sub) => {
    const net = balance[sub].netExportMW;
    if (net > 300) {
      balance[sub].role = 'EXPORTADOR LÍQUIDO';
    } else if (net < -300) {
      balance[sub].role = 'IMPORTADOR LÍQUIDO';
    } else {
      balance[sub].role = 'EQUILIBRADO';
    }
  });

  return balance;
}
