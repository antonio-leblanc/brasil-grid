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
  peakRecordMW: 105150,
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

export const majorPowerPlants: PowerPlantFeature[] = [
  {
    id: 'itaipu',
    name: 'UHE Itaipu Binacional',
    type: 'hidro',
    capacityMW: 14000,
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Paraná (Foz do Iguaçu)',
    operator: 'Itaipu Binacional (Brasil / Paraguai)',
    coordinates: [-54.5889, -25.4083],
    description: 'Segunda maior usina do mundo em geração histórica e o maior colosso do setor elétrico sul-americano. Opera com 20 turbinas Francis de 700 MW cada.',
    technicalDetails: {
      commissionYear: 1984,
      turbinesOrUnits: '20 x 700 MW (Francis)',
      flowOrEfficiency: 'Vazão nominal: 14.000 m³/s',
      gridConnectionVoltage: '500 kV (CA) & ±600 kV (CC)'
    }
  },
  {
    id: 'belo-monte',
    name: 'UHE Belo Monte',
    type: 'hidro',
    capacityMW: 11233,
    subsystem: 'N',
    state: 'PA',
    riverOrRegion: 'Rio Xingu (Altamira/Vitória do Xingu)',
    operator: 'Norte Energia',
    coordinates: [-51.7778, -3.1256],
    description: 'Maior hidrelétrica 100% brasileira. Usina a fio d\'água, altamente sazonal, cuja energia é drenada para o Sudeste através dos dois superlinhões de ±800 kV CC.',
    technicalDetails: {
      commissionYear: 2016,
      turbinesOrUnits: '18 x 611 MW (Sítio Belo Monte) + 9 x 25 MW (Pimental)',
      flowOrEfficiency: 'Queda líquida: ~89 metros',
      gridConnectionVoltage: '±800 kV UHVDC'
    }
  },
  {
    id: 'tucurui',
    name: 'UHE Tucuruí',
    type: 'hidro',
    capacityMW: 8370,
    subsystem: 'N',
    state: 'PA',
    riverOrRegion: 'Rio Tocantins (Tucuruí)',
    operator: 'Eletrobras Eletronorte',
    coordinates: [-49.6469, -3.8328],
    description: 'Âncora industrial da Amazônia Oriental. Alimentador crítico dos complexos eletrointensivos de alumínio e interligação com os subsistemas Nordeste e Sudeste.',
    technicalDetails: {
      commissionYear: 1984,
      turbinesOrUnits: '24 unidades geradoras (Fases I e II)',
      flowOrEfficiency: 'Vazão máxima do vertedouro: 110.000 m³/s',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'jirau',
    name: 'UHE Jirau',
    type: 'hidro',
    capacityMW: 3750,
    subsystem: 'N',
    state: 'RO',
    riverOrRegion: 'Rio Madeira (Porto Velho)',
    operator: 'Energia Sustentável do Brasil (Engie / Eletrobras)',
    coordinates: [-64.6547, -9.2647],
    description: 'Complexo de engenharia no Rio Madeira equipado com turbinas bulbo de alto rendimento para baixas quedas d\'água.',
    technicalDetails: {
      commissionYear: 2013,
      turbinesOrUnits: '50 turbinas tipo Bulbo de 75 MW',
      flowOrEfficiency: 'Queda líquida: 15.2 metros',
      gridConnectionVoltage: '500 kV ➔ Conversora ±600 kV'
    }
  },
  {
    id: 'santo-antonio',
    name: 'UHE Santo Antônio',
    type: 'hidro',
    capacityMW: 3568,
    subsystem: 'N',
    state: 'RO',
    riverOrRegion: 'Rio Madeira (Porto Velho)',
    operator: 'Santo Antônio Energia (Eletrobras)',
    coordinates: [-63.9536, -8.8028],
    description: 'Opera a fio d\'água em conjunto com Jirau. Sua energia viaja pelo Bipolo do Madeira até a subestação de Araraquara (SP).',
    technicalDetails: {
      commissionYear: 2012,
      turbinesOrUnits: '50 turbinas tipo Bulbo',
      flowOrEfficiency: 'Vazão nominal: 24.000 m³/s',
      gridConnectionVoltage: '±600 kV CC'
    }
  },
  {
    id: 'xingó',
    name: 'UHE Xingó',
    type: 'hidro',
    capacityMW: 3162,
    subsystem: 'NE',
    state: 'AL/SE',
    riverOrRegion: 'Rio São Francisco (Canindé/Piranhas)',
    operator: 'Eletrobras Chesf',
    coordinates: [-37.7958, -9.6158],
    description: 'Chave mestre da segurança eletroenergética do Nordeste no baixo São Francisco, com vertedouro encravado no cânion.',
    technicalDetails: {
      commissionYear: 1994,
      turbinesOrUnits: '6 x 527 MW (Francis)',
      flowOrEfficiency: 'Queda nominal: 118 metros',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'paulo-afonso',
    name: 'Complexo Paulo Afonso (I-IV)',
    type: 'hidro',
    capacityMW: 4279,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Rio São Francisco (Paulo Afonso)',
    operator: 'Eletrobras Chesf',
    coordinates: [-38.2167, -9.4000],
    description: 'Complexo histórico pioneiro da eletrificação nordestina. Composto por quatro usinas e a central subterrânea de Apolônio Sales.',
    technicalDetails: {
      commissionYear: 1955,
      turbinesOrUnits: '23 unidades geradoras totais',
      gridConnectionVoltage: '230 kV & 500 kV'
    }
  },
  {
    id: 'angra-nuclear',
    name: 'Central Nuclear Almirante Álvaro Alberto (Angra 1 e 2)',
    type: 'nuclear',
    capacityMW: 1990,
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Praia de Itaorna (Angra dos Reis)',
    operator: 'Eletronuclear',
    coordinates: [-44.4578, -23.0078],
    description: 'Geração térmica de base com zero emissão direta de carbono. Estabilidade inercial e sustentação de tensão para o polo de consumo do Grande Rio.',
    technicalDetails: {
      commissionYear: 1985,
      turbinesOrUnits: 'Angra 1 (640 MW - PWR Westinghouse) + Angra 2 (1.350 MW - PWR Siemens)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'eolica-alto-sertao',
    name: 'Complexo Eólico Alto Sertão',
    type: 'eolica',
    capacityMW: 1200,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Caetité / Igaporã / Guanambi',
    operator: 'Renova Energia / AES Brasil',
    coordinates: [-42.4800, -14.0700],
    description: 'Polo eólico de alta densidade aproveitando o vento unidirecional da Chapada Diamantina, com fatores de capacidade acima de 50%.',
    technicalDetails: {
      commissionYear: 2012,
      turbinesOrUnits: '400+ aerogeradores GE / Alstom',
      gridConnectionVoltage: '230 kV ➔ 500 kV'
    }
  },
  {
    id: 'solar-janauba',
    name: 'Complexo Solar Janaúba',
    type: 'solar',
    capacityMW: 1200,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Janaúba (Norte de Minas)',
    operator: 'Elera Renováveis',
    coordinates: [-43.3089, -15.8028],
    description: 'Um dos maiores complexos solares fotovoltaicos do hemisfério sul, cobrindo mais de 3.000 hectares com 2,2 milhões de módulos.',
    technicalDetails: {
      commissionYear: 2023,
      turbinesOrUnits: '2,2 milhões de módulos bifaciais com rastreadores (trackers)',
      gridConnectionVoltage: '500 kV SE Janaúba 3'
    }
  },
  {
    id: 'termica-porto-sergipe',
    name: 'UTE Porto de Sergipe I',
    type: 'termica',
    capacityMW: 1516,
    subsystem: 'NE',
    state: 'SE',
    riverOrRegion: 'Barra dos Coqueiros',
    operator: 'Eneva',
    coordinates: [-36.9800, -10.8200],
    description: 'Maior termelétrica a gás natural da América Latina. Opera em ciclo combinado (3 turbinas a gás + 1 a vapor) integrada a terminal de regaseificação de GNL oceânico.',
    technicalDetails: {
      commissionYear: 2020,
      turbinesOrUnits: '3 x GE 7HA.02 + 1 x GE Steam Turbine',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'ilha-solteira',
    name: 'UHE Ilha Solteira',
    type: 'hidro',
    capacityMW: 3444,
    subsystem: 'SE/CO',
    state: 'SP',
    riverOrRegion: 'Rio Paraná (Ilha Solteira)',
    operator: 'CTG Brasil',
    coordinates: [-51.3378, -20.4306],
    description: 'Uma das maiores usinas inteiramente nacionais do país, opera em cascata com Três Irmãos e Jupiá, sustentando boa parte da carga do interior paulista e do Mato Grosso do Sul.',
    technicalDetails: {
      commissionYear: 1978,
      turbinesOrUnits: '20 unidades Kaplan',
      gridConnectionVoltage: '440 kV / 138 kV'
    }
  },
  {
    id: 'sobradinho',
    name: 'UHE Sobradinho',
    type: 'hidro',
    capacityMW: 1050,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Rio São Francisco (Sobradinho)',
    operator: 'Chesf',
    coordinates: [-40.8253, -9.4306],
    description: 'Reservatório multianual que regula a vazão de todo o baixo São Francisco, viabilizando Paulo Afonso e Xingó a jusante — peça-chave da segurança hídrica e energética do semiárido nordestino.',
    technicalDetails: {
      commissionYear: 1979,
      turbinesOrUnits: '6 unidades Kaplan',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'serra-da-mesa',
    name: 'UHE Serra da Mesa',
    type: 'hidro',
    capacityMW: 1275,
    subsystem: 'SE/CO',
    state: 'GO',
    riverOrRegion: 'Rio Tocantins (Minaçu)',
    operator: 'Furnas',
    coordinates: [-48.3167, -13.8500],
    description: 'Maior reservatório artificial do país em volume, funciona como uma bateria hídrica de longo prazo para o subsistema Sudeste/Centro-Oeste em anos secos.',
    technicalDetails: {
      commissionYear: 1998,
      turbinesOrUnits: '3 unidades Francis',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'foz-do-areia',
    name: 'UHE Governador Bento Munhoz (Foz do Areia)',
    type: 'hidro',
    capacityMW: 1676,
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (Pinhão/Bituruna)',
    operator: 'Copel GeT',
    coordinates: [-51.8867, -26.0272],
    description: 'Cabeça da cascata do Iguaçu, com uma das maiores barragens em altura da América do Sul — âncora do suprimento do sistema paranaense.',
    technicalDetails: {
      commissionYear: 1980,
      turbinesOrUnits: '4 unidades Francis',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'ita',
    name: 'UHE Itá',
    type: 'hidro',
    capacityMW: 1450,
    subsystem: 'S',
    state: 'SC',
    riverOrRegion: 'Rio Uruguai (Itá/Aratiba)',
    operator: 'Consórcio Itá (Engie/Copel/Celesc)',
    coordinates: [-52.3308, -27.2794],
    description: 'Principal usina da bacia do Uruguai na divisa SC/RS, com papel relevante no intercâmbio energético entre os estados do Sul.',
    technicalDetails: {
      commissionYear: 2000,
      turbinesOrUnits: '5 unidades Francis',
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'furnas',
    name: 'UHE Furnas',
    type: 'hidro',
    capacityMW: 1312,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Rio Grande (São José da Barra)',
    operator: 'Furnas Centrais Elétricas',
    coordinates: [-46.3167, -20.6667],
    description: 'Uma das usinas pioneiras da interligação nacional — deu origem ao nome da estatal Furnas — e segue central no abastecimento do Sudeste.',
    technicalDetails: {
      commissionYear: 1963,
      turbinesOrUnits: '8 unidades Francis',
      gridConnectionVoltage: '345 kV'
    }
  },
  {
    id: 'marimbondo',
    name: 'UHE Marimbondo',
    type: 'hidro',
    capacityMW: 1488,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Rio Grande (Fronteira/Icém)',
    operator: 'Furnas Centrais Elétricas',
    coordinates: [-49.2000, -20.4000],
    description: 'Parte da cascata do rio Grande na divisa MG/SP, reforça o corredor de escoamento entre o Triângulo Mineiro e o interior paulista.',
    technicalDetails: {
      commissionYear: 1975,
      turbinesOrUnits: '8 unidades Francis',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'salto-caxias',
    name: 'UHE Salto Caxias',
    type: 'hidro',
    capacityMW: 1240,
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (Nova Prata do Iguaçu)',
    operator: 'Copel GeT',
    coordinates: [-53.5000, -25.5500],
    description: 'Última grande usina da cascata do Iguaçu antes da fronteira com a Argentina, próxima à região das Cataratas.',
    technicalDetails: {
      commissionYear: 1999,
      turbinesOrUnits: '4 unidades Francis',
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'sao-simao',
    name: 'UHE São Simão',
    type: 'hidro',
    capacityMW: 1710,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Rio Paranaíba (divisa MG/GO)',
    operator: 'CTG Brasil',
    coordinates: [-50.5000, -18.9833],
    description: 'Uma das maiores usinas inteiramente em território nacional na bacia do Paranaíba, ancorando o suprimento do Triângulo Mineiro e de Goiás.',
    technicalDetails: {
      commissionYear: 1978,
      turbinesOrUnits: '6 unidades Francis',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'lagoa-dos-ventos',
    name: 'Complexo Eólico Lagoa dos Ventos',
    type: 'eolica',
    capacityMW: 716,
    subsystem: 'NE',
    state: 'PI',
    riverOrRegion: 'São João do Piauí',
    operator: 'AES Brasil',
    coordinates: [-41.9000, -8.3500],
    description: 'Um dos maiores complexos eólicos da América Latina, símbolo do boom eólico do semiárido nordestino na última década.',
    technicalDetails: {
      commissionYear: 2021,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'rio-do-vento',
    name: 'Complexo Eólico Rio do Vento',
    type: 'eolica',
    capacityMW: 583,
    subsystem: 'NE',
    state: 'RN',
    riverOrRegion: 'Lajes / Pedra Preta',
    operator: 'AES Brasil',
    coordinates: [-36.2500, -5.6833],
    description: 'Complexo eólico de última geração no Rio Grande do Norte, aproveitando os ventos constantes do litoral semiárido potiguar.',
    technicalDetails: {
      commissionYear: 2023,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'osorio',
    name: 'Complexo Eólico de Osório',
    type: 'eolica',
    capacityMW: 150,
    subsystem: 'S',
    state: 'RS',
    riverOrRegion: 'Osório / Litoral Norte',
    operator: 'Eletrosul / Ventos do Sul',
    coordinates: [-50.2667, -29.8833],
    description: 'Pioneiro da energia eólica em escala comercial no Brasil — colocado em operação em 2006, abriu caminho para o boom eólico nacional.',
    technicalDetails: {
      commissionYear: 2006,
      gridConnectionVoltage: '69 kV'
    }
  },
  {
    id: 'pirapora',
    name: 'Complexo Solar Pirapora',
    type: 'solar',
    capacityMW: 321,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Pirapora',
    operator: 'EDF Renewables / Canadian Solar',
    coordinates: [-44.9333, -17.3639],
    description: 'Um dos primeiros grandes complexos fotovoltaicos utility-scale do país, referência para a expansão solar em Minas Gerais.',
    technicalDetails: {
      commissionYear: 2017,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'ituverava',
    name: 'Complexo Fotovoltaico Ituverava',
    type: 'solar',
    capacityMW: 254,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Bom Jesus da Lapa / Ituverava',
    operator: 'Enel Green Power',
    coordinates: [-43.4000, -13.1500],
    description: 'Um dos maiores parques solares do Nordeste, aproveitando a altíssima irradiação do semiárido baiano.',
    technicalDetails: {
      commissionYear: 2019,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'norte-fluminense',
    name: 'UTE Norte Fluminense',
    type: 'termica',
    capacityMW: 869,
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Macaé',
    operator: 'Eneva',
    coordinates: [-41.7833, -22.2833],
    description: 'Termelétrica a gás natural que reforça a segurança de suprimento do Sudeste em períodos de baixa hidraulicidade, despachada pelo ONS conforme o custo marginal de operação.',
    technicalDetails: {
      commissionYear: 2004,
      gridConnectionVoltage: '345 kV'
    }
  },
  {
    id: 'teles-pires',
    name: 'UHE Teles Pires',
    type: 'hidro',
    capacityMW: 1820,
    subsystem: 'N',
    state: 'PA/MT',
    riverOrRegion: 'Rio Teles Pires (Paranaíta / Apiacás)',
    operator: 'Cia Hidrelétrica Teles Pires (Neoenergia / Eletrobras)',
    coordinates: [-56.4744, -9.3444],
    description: 'Aproveitamento a fio d\'água de grande porte no Rio Teles Pires, escoando energia gerada na Amazônia Meridional para o Centro-Oeste e Sudeste.',
    technicalDetails: {
      commissionYear: 2015,
      turbinesOrUnits: '5 x 364 MW (Francis)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'porto-primavera',
    name: 'UHE Porto Primavera (Eng. Sérgio Motta)',
    type: 'hidro',
    capacityMW: 1540,
    subsystem: 'SE/CO',
    state: 'SP/MS',
    riverOrRegion: 'Rio Paraná (Rosana / Batayporã)',
    operator: 'Auren Energia',
    coordinates: [-52.9556, -22.4833],
    description: 'Possui o mais extenso lago em barragem de terra do Brasil e a maior eclusa de navegação fluvial da Hidrovia Tietê-Paraná.',
    technicalDetails: {
      commissionYear: 1999,
      turbinesOrUnits: '14 x 110 MW (Kaplan)',
      gridConnectionVoltage: '500 kV / 138 kV'
    }
  },
  {
    id: 'salto-santiago',
    name: 'UHE Salto Santiago',
    type: 'hidro',
    capacityMW: 1420,
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (Saudade do Iguaçu)',
    operator: 'Engie Brasil',
    coordinates: [-52.6103, -25.6144],
    description: 'Segunda maior usina do Rio Iguaçu em capacidade, fundamental no suporte de potência e controle de frequência para os subsistemas Sul e Sudeste.',
    technicalDetails: {
      commissionYear: 1980,
      turbinesOrUnits: '4 x 355 MW (Francis)',
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'machadinho',
    name: 'UHE Machadinho',
    type: 'hidro',
    capacityMW: 1140,
    subsystem: 'S',
    state: 'RS/SC',
    riverOrRegion: 'Rio Pelotas (Machadinho / Piratuba)',
    operator: 'Consórcio Machadinho (Engie Brasil)',
    coordinates: [-51.7889, -27.5306],
    description: 'Imponente usina de concreto compactado a rolo na divisa gaúcho-catarinense, integrando a cascata hidrelétrica da Bacia do Rio Uruguai.',
    technicalDetails: {
      commissionYear: 2002,
      turbinesOrUnits: '3 x 380 MW (Francis)',
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'estreito',
    name: 'UHE Estreito',
    type: 'hidro',
    capacityMW: 1087,
    subsystem: 'N',
    state: 'MA/TO',
    riverOrRegion: 'Rio Tocantins (Estreito / Aguiarnópolis)',
    operator: 'CESTE (Engie / Vale / Alcoa)',
    coordinates: [-47.4528, -6.5417],
    description: 'Aproveitamento a fio d\'água no Médio Tocantins com turbinas tipo bulbo de grande vazão, suprindo a indústria mineral e a interligação regional.',
    technicalDetails: {
      commissionYear: 2011,
      turbinesOrUnits: '8 x 135.9 MW (Bulbo/Kaplan)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'emborcacao',
    name: 'UHE Emborcação',
    type: 'hidro',
    capacityMW: 1192,
    subsystem: 'SE/CO',
    state: 'MG/GO',
    riverOrRegion: 'Rio Paranaíba (Araguari / Catalão)',
    operator: 'Cemig',
    coordinates: [-47.9861, -18.4417],
    description: 'Importante usina de cabeceira do Rio Paranaíba com grande reservatório de acumulação e regularização plurianual para o SIN.',
    technicalDetails: {
      commissionYear: 1982,
      turbinesOrUnits: '4 x 298 MW (Francis)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'solar-futura',
    name: 'Complexo Solar Futura',
    type: 'solar',
    capacityMW: 852,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Juazeiro',
    operator: 'Eneva',
    coordinates: [-40.5000, -9.6000],
    description: 'Um dos maiores complexos fotovoltaicos das Américas, com cerca de 1,4 milhão de módulos bifaciais e rastreadores de eixo único em pleno sertão baiano.',
    technicalDetails: {
      commissionYear: 2023,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'solar-sao-goncalo',
    name: 'Complexo Solar São Gonçalo',
    type: 'solar',
    capacityMW: 864,
    subsystem: 'NE',
    state: 'PI',
    riverOrRegion: 'São Gonçalo do Gurguéia',
    operator: 'Enel Green Power',
    coordinates: [-42.8500, -9.8000],
    description: 'Gigantesca instalação solar no semiárido piauiense, pioneira em larga escala de módulos bifaciais para maximizar captura da irradiação albedo do solo.',
    technicalDetails: {
      commissionYear: 2020,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'eolica-chafariz',
    name: 'Complexo Eólico Chafariz',
    type: 'eolica',
    capacityMW: 471,
    subsystem: 'NE',
    state: 'PB',
    riverOrRegion: 'Santa Luzia',
    operator: 'Neoenergia',
    coordinates: [-36.8800, -6.8700],
    description: 'Polo eólico de alta produtividade no sertão paraibano composto por 15 parques e 136 aerogeradores, conectado à Subestação Santa Luzia II (500 kV).',
    technicalDetails: {
      commissionYear: 2022,
      gridConnectionVoltage: '500 kV / 230 kV'
    }
  },
  {
    id: 'eolica-morro-do-chapeu',
    name: 'Complexo Eólico Morro do Chapéu Sul',
    type: 'eolica',
    capacityMW: 393,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Morro do Chapéu / Cafarnaum',
    operator: 'Enel Green Power',
    coordinates: [-41.1500, -11.5500],
    description: 'Situado nas cristas de altitude da Chapada Diamantina baiana, usufrui de regime contínuo de ventos de alto fator de capacidade.',
    technicalDetails: {
      commissionYear: 2018,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'termica-gna-1',
    name: 'UTE GNA I (Gás Natural Açu)',
    type: 'termica',
    capacityMW: 1338,
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Porto do Açu (São João da Barra)',
    operator: 'GNA (bp / Siemens / SPIC / Prumo)',
    coordinates: [-41.0500, -21.8333],
    description: 'Segunda maior termelétrica a gás natural do Brasil. Opera em ciclo combinado a partir de GNL recebido na FSRU do terminal portuário do Açu.',
    technicalDetails: {
      commissionYear: 2021,
      turbinesOrUnits: '3 turbinas a gás + 1 a vapor (Siemens)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'termica-parnaiba',
    name: 'Complexo Termelétrico Parnaíba (Gas-to-Wire)',
    type: 'termica',
    capacityMW: 1428,
    subsystem: 'NE',
    state: 'MA',
    riverOrRegion: 'Santo Antônio dos Lopes / Bacia do Parnaíba',
    operator: 'Eneva',
    coordinates: [-44.6000, -4.8500],
    description: 'Pioneiro parque integrado gas-to-wire da América Latina: gás onshore extraído na Bacia do Parnaíba vira eletricidade in loco conectada ao SIN.',
    technicalDetails: {
      commissionYear: 2013,
      turbinesOrUnits: 'Ciclos abertos e combinados (Fases I a V)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'uhe-itumbiara',
    name: 'UHE Itumbiara',
    type: 'hidro',
    capacityMW: 2082,
    subsystem: 'SE/CO',
    state: 'MG/GO',
    riverOrRegion: 'Rio Paranaíba (Itumbiara / Araporã)',
    operator: 'Eletrobras Furnas',
    coordinates: [-49.2000, -18.4167],
    description: 'Maior hidrelétrica do complexo de Furnas em capacidade instalada e uma das maiores barragens de terra/enrocamento do mundo, chave para a regularização do Paranaíba.',
    technicalDetails: {
      commissionYear: 1980,
      turbinesOrUnits: '6 x 347 MW (Francis)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'uhe-jupia',
    name: 'UHE Eng. Souza Dias (Jupiá)',
    type: 'hidro',
    capacityMW: 1551,
    subsystem: 'SE/CO',
    state: 'SP/MS',
    riverOrRegion: 'Rio Paraná (Castilho / Três Lagoas)',
    operator: 'CTG Brasil',
    coordinates: [-51.7778, -20.7833],
    description: 'Localizada no Rio Paraná logo a jusante da foz do Rio Tietê, opera em conjunto com Ilha Solteira no histórico Complexo de Urubupungá.',
    technicalDetails: {
      commissionYear: 1969,
      turbinesOrUnits: '14 x 103 MW + 1 x 110 MW (Kaplan)',
      gridConnectionVoltage: '440 kV / 138 kV'
    }
  },
  {
    id: 'uhe-itaparica',
    name: 'UHE Luiz Gonzaga (Itaparica)',
    type: 'hidro',
    capacityMW: 1479,
    subsystem: 'NE',
    state: 'PE/BA',
    riverOrRegion: 'Rio São Francisco (Petrolândia)',
    operator: 'Chesf',
    coordinates: [-38.3167, -9.1333],
    description: 'Aproveitamento central da Chesf no submédio São Francisco, cujo reservatório regulariza as vazões que seguem para o complexo de Paulo Afonso e Xingó.',
    technicalDetails: {
      commissionYear: 1988,
      turbinesOrUnits: '6 x 246.5 MW (Francis)',
      gridConnectionVoltage: '500 kV / 230 kV'
    }
  },
  {
    id: 'uhe-agua-vermelha',
    name: 'UHE Água Vermelha (José Ermírio de Moraes)',
    type: 'hidro',
    capacityMW: 1396,
    subsystem: 'SE/CO',
    state: 'SP/MG',
    riverOrRegion: 'Rio Grande (Ouroeste / Iturama)',
    operator: 'Auren Energia',
    coordinates: [-50.3444, -19.8667],
    description: 'Maior usina da bacia do Rio Grande, localizada próxima à confluência com o Rio Paranaíba para a formação do Rio Paraná.',
    technicalDetails: {
      commissionYear: 1978,
      turbinesOrUnits: '6 x 232.7 MW (Francis)',
      gridConnectionVoltage: '440 kV'
    }
  },
  {
    id: 'uhe-segredo',
    name: 'UHE Gov. Ney Braga (Segredo)',
    type: 'hidro',
    capacityMW: 1260,
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (Mangueirinha / Reserva do Iguaçu)',
    operator: 'Copel GeT',
    coordinates: [-52.1000, -25.7833],
    description: 'Usina de grande porte no médio Rio Iguaçu com imponente barragem de enrocamento com face de concreto de 145 metros de altura.',
    technicalDetails: {
      commissionYear: 1992,
      turbinesOrUnits: '4 x 315 MW (Francis)',
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'uhe-salto-osorio',
    name: 'UHE Salto Osório',
    type: 'hidro',
    capacityMW: 1078,
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (São Jorge d\'Oeste / Quedas do Iguaçu)',
    operator: 'Engie Brasil',
    coordinates: [-53.0000, -25.5333],
    description: 'Elo intermediário estratégico na cascata do Iguaçu, situada a jusante de Salto Santiago e a montante de Salto Caxias.',
    technicalDetails: {
      commissionYear: 1975,
      turbinesOrUnits: '4 x 175 MW + 2 x 189 MW (Francis)',
      gridConnectionVoltage: '525 kV / 230 kV'
    }
  },
  {
    id: 'uhe-lajeado',
    name: 'UHE Luís Eduardo Magalhães (Lajeado)',
    type: 'hidro',
    capacityMW: 902,
    subsystem: 'N',
    state: 'TO',
    riverOrRegion: 'Rio Tocantins (Miracema do Tocantins / Lajeado)',
    operator: 'Investco (EDP / CPFL / CELESC)',
    coordinates: [-48.3667, -9.7500],
    description: 'Aproveitamento central no Rio Tocantins próximo à capital Palmas, com turbinas Kaplan de alta vazão e canal de transposição hidroviário.',
    technicalDetails: {
      commissionYear: 2001,
      turbinesOrUnits: '5 x 180.5 MW (Kaplan)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'uhe-campos-novos',
    name: 'UHE Campos Novos',
    type: 'hidro',
    capacityMW: 880,
    subsystem: 'S',
    state: 'SC',
    riverOrRegion: 'Rio Canoas (Campos Novos / Celso Ramos)',
    operator: 'Enercan (CPFL / Votorantim / Celesc)',
    coordinates: [-51.3167, -27.6000],
    description: 'Possui uma das barragens de enrocamento com face de concreto mais altas do mundo (202 metros de altura), situada na bacia do Rio Uruguai.',
    technicalDetails: {
      commissionYear: 2006,
      turbinesOrUnits: '3 x 293.3 MW (Francis)',
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'uhe-tres-irmaos',
    name: 'UHE Três Irmãos',
    type: 'hidro',
    capacityMW: 807,
    subsystem: 'SE/CO',
    state: 'SP',
    riverOrRegion: 'Rio Tietê (Pereira Barreto / Andradina)',
    operator: 'Tietê Energia',
    coordinates: [-51.3000, -20.6500],
    description: 'Última e maior usina da cascata do Rio Tietê antes da foz no Rio Paraná, interligada por canal navegável ao reservatório de Ilha Solteira.',
    technicalDetails: {
      commissionYear: 1993,
      turbinesOrUnits: '5 x 161.5 MW (Francis)',
      gridConnectionVoltage: '440 kV / 138 kV'
    }
  },
  {
    id: 'uhe-sao-manoel',
    name: 'UHE São Manoel',
    type: 'hidro',
    capacityMW: 700,
    subsystem: 'N',
    state: 'MT/PA',
    riverOrRegion: 'Rio Teles Pires (Paranaíta / Jacareacanga)',
    operator: 'Empresa de Energia São Manoel (EDP / Furnas / CTG)',
    coordinates: [-57.1833, -9.1833],
    description: 'Localizada a jusante da UHE Teles Pires na fronteira do Mato Grosso com o Pará, opera a fio d\'água conectada ao sistema de transmissão 500 kV.',
    technicalDetails: {
      commissionYear: 2018,
      turbinesOrUnits: '4 x 175 MW (Kaplan)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'uhe-barra-grande',
    name: 'UHE Barra Grande',
    type: 'hidro',
    capacityMW: 690,
    subsystem: 'S',
    state: 'RS/SC',
    riverOrRegion: 'Rio Pelotas (Anita Garibaldi / Pinhal da Serra)',
    operator: 'BAESA (CPFL / Alcoa / Votorantim)',
    coordinates: [-51.1833, -27.7833],
    description: 'Barragem de 185 metros de altura na cabeceira do Rio Pelotas/Uruguai, escoando potência diretamente para as redes de 525 kV do Subsistema Sul.',
    technicalDetails: {
      commissionYear: 2005,
      turbinesOrUnits: '3 x 230 MW (Francis)',
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'uhe-cachoeira-dourada',
    name: 'UHE Cachoeira Dourada',
    type: 'hidro',
    capacityMW: 658,
    subsystem: 'SE/CO',
    state: 'GO/MG',
    riverOrRegion: 'Rio Paranaíba (Cachoeira Dourada)',
    operator: 'Enel Green Power',
    coordinates: [-49.4833, -18.4833],
    description: 'Histórica usina projetada originalmente para viabilizar a construção e o pioneiro suprimento elétrico de Brasília nos anos 1950.',
    technicalDetails: {
      commissionYear: 1959,
      turbinesOrUnits: '10 unidades geradoras (Kaplan)',
      gridConnectionVoltage: '230 kV / 138 kV'
    }
  },
  {
    id: 'uhe-capivara',
    name: 'UHE Capivara (Escola Politécnica)',
    type: 'hidro',
    capacityMW: 619,
    subsystem: 'SE/CO',
    state: 'SP/PR',
    riverOrRegion: 'Rio Paranapanema (Taciba / Primeiro de Maio)',
    operator: 'CTG Brasil',
    coordinates: [-51.3500, -22.6500],
    description: 'Maior hidrelétrica da calha do Rio Paranapanema em capacidade nominal instalada, com vasto lago de acumulação e amortecimento.',
    technicalDetails: {
      commissionYear: 1977,
      turbinesOrUnits: '4 x 154.8 MW (Francis)',
      gridConnectionVoltage: '440 kV'
    }
  },
  {
    id: 'uhe-peixe-angical',
    name: 'UHE Peixe Angical',
    type: 'hidro',
    capacityMW: 452,
    subsystem: 'N',
    state: 'TO',
    riverOrRegion: 'Rio Tocantins (Peixe / São Salvador)',
    operator: 'Enerpeixe (EDP Brasil)',
    coordinates: [-48.6500, -12.2833],
    description: 'Aproveitamento a fio d\'água no Alto/Médio Tocantins, com turbinas tipo Kaplan operando sob baixas quedas e vazões sazonais elevadas.',
    technicalDetails: {
      commissionYear: 2006,
      turbinesOrUnits: '3 x 150.7 MW (Kaplan)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'uhe-tres-marias',
    name: 'UHE Três Marias (Bernardo Mascarenhas)',
    type: 'hidro',
    capacityMW: 396,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Rio São Francisco (Três Marias)',
    operator: 'Cemig',
    coordinates: [-45.2600, -18.2100],
    description: 'A histórica caixa d\'água de cabeceira do Rio São Francisco, fundamental para a regularização plurianual da bacia e perenização até o Nordeste.',
    technicalDetails: {
      commissionYear: 1962,
      turbinesOrUnits: '6 x 66 MW (Kaplan)',
      gridConnectionVoltage: '500 kV / 138 kV'
    }
  },
  {
    id: 'uhe-balbina',
    name: 'UHE Balbina',
    type: 'hidro',
    capacityMW: 250,
    subsystem: 'N',
    state: 'AM',
    riverOrRegion: 'Rio Uatumã (Presidente Figueiredo)',
    operator: 'Eletronorte',
    coordinates: [-59.4833, -1.9167],
    description: 'Construída na década de 1980 para abastecer Manaus em meio à floresta amazônica. Possui um dos maiores espelhos d\'água do país por MW instalado.',
    technicalDetails: {
      commissionYear: 1989,
      turbinesOrUnits: '5 x 50 MW (Kaplan)',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'uhe-samuel',
    name: 'UHE Samuel',
    type: 'hidro',
    capacityMW: 242,
    subsystem: 'N',
    state: 'RO',
    riverOrRegion: 'Rio Jamari (Candeias do Jamari)',
    operator: 'Eletronorte',
    coordinates: [-63.4500, -8.7500],
    description: 'Primeira grande hidrelétrica de Rondônia, fundamental na formação da rede regional antes da chegada das megauzinas do Madeira.',
    technicalDetails: {
      commissionYear: 1989,
      turbinesOrUnits: '5 x 48.5 MW (Kaplan)',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'eolica-serra-do-mel',
    name: 'Complexo Eólico Serra do Mel',
    type: 'eolica',
    capacityMW: 1047,
    subsystem: 'NE',
    state: 'RN',
    riverOrRegion: 'Serra do Mel / Areia Branca',
    operator: 'Voltalia',
    coordinates: [-37.0300, -5.1700],
    description: 'Um dos maiores clusters eólicos integrados do planeta, beneficiado por ventos alísios oceânicos constantes com fatores de capacidade acima de 60%.',
    technicalDetails: {
      commissionYear: 2021,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'eolica-santa-vitoria',
    name: 'Complexo Eólico Santa Vitória do Palmar',
    type: 'eolica',
    capacityMW: 472,
    subsystem: 'S',
    state: 'RS',
    riverOrRegion: 'Santa Vitória do Palmar / Chuí',
    operator: 'Omega Energia / Echoenergia',
    coordinates: [-52.5500, -33.5200],
    description: 'O parque eólico mais meridional do Brasil, na fronteira sul gaúcha junto à Lagoa Mirim, impulsionado por frentes polares e ventos do Atlântico Sul.',
    technicalDetails: {
      commissionYear: 2017,
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'eolica-ventos-araripe',
    name: 'Complexo Eólico Ventos do Araripe III',
    type: 'eolica',
    capacityMW: 359,
    subsystem: 'NE',
    state: 'PI/PE',
    riverOrRegion: 'Chapada do Araripe (Simões / Araripina)',
    operator: 'Casa dos Ventos',
    coordinates: [-40.7500, -7.6500],
    description: 'Instalado no altiplano da Chapada do Araripe na divisa PI/PE, usufrui de ventos termais laminares de altíssima densidade energética.',
    technicalDetails: {
      commissionYear: 2017,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'eolica-coxilha-negra',
    name: 'Complexo Eólico Coxilha Negra',
    type: 'eolica',
    capacityMW: 302,
    subsystem: 'S',
    state: 'RS',
    riverOrRegion: 'Santana do Livramento (Fronteira Oeste)',
    operator: 'CGT Eletrosul',
    coordinates: [-55.5300, -30.8500],
    description: 'Polo eólico estratégico nos pampas da fronteira Brasil-Uruguai, diversificando a geração renovável do Subsistema Sul.',
    technicalDetails: {
      commissionYear: 2024,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'solar-mendubim',
    name: 'Complexo Solar Mendubim',
    type: 'solar',
    capacityMW: 531,
    subsystem: 'NE',
    state: 'RN',
    riverOrRegion: 'Açu',
    operator: 'Scatec / Equinor / Hydro Rein',
    coordinates: [-36.9100, -5.5800],
    description: 'Parque fotovoltaico de grande porte no polo solar de Açu, projetado para abastecimento de indústrias eletrointensivas e injeção na rede de 500 kV.',
    technicalDetails: {
      commissionYear: 2024,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'solar-sol-do-sertao',
    name: 'Complexo Solar Sol do Sertão',
    type: 'solar',
    capacityMW: 474,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Oliveira dos Brejinhos',
    operator: 'Essentia Energia / Patria',
    coordinates: [-42.8900, -12.3100],
    description: 'Mega empreendimento fotovoltaico no sertão baiano com mais de 1 milhão de módulos bifaciais, conectado à SE Bom Jesus da Lapa em 500 kV.',
    technicalDetails: {
      commissionYear: 2022,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'solar-lar-do-sol',
    name: 'Complexo Solar Lar do Sol',
    type: 'solar',
    capacityMW: 415,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Pirapora',
    operator: 'Casablanca / Atlas Renewable Energy',
    coordinates: [-44.9500, -17.4000],
    description: 'Expansão do polo solar do Médio São Francisco em Pirapora, contratada em modelo de autoprodução de energia renovável para a indústria.',
    technicalDetails: {
      commissionYear: 2023,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'solar-arinos',
    name: 'Complexo Solar Arinos',
    type: 'solar',
    capacityMW: 412,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Arinos (Noroeste de MG)',
    operator: 'Newave Energia / Gerdau',
    coordinates: [-46.1000, -15.9100],
    description: 'Instalação solar de grande escala no Noroeste Mineiro dedicada à descarbonização da siderurgia e indústria de transformação.',
    technicalDetails: {
      commissionYear: 2024,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'termica-termomacao',
    name: 'UTE Termomacaé',
    type: 'termica',
    capacityMW: 929,
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Macaé',
    operator: 'Petrobras',
    coordinates: [-41.8000, -22.3500],
    description: 'Uma das maiores termelétricas a gás natural em ciclo aberto do país, oferecendo flexibilidade e prontidão para suporte de ponta ao Sudeste.',
    technicalDetails: {
      commissionYear: 2002,
      turbinesOrUnits: '2 turbinas a gás GE 7FA (ciclo aberto)',
      gridConnectionVoltage: '345 kV'
    }
  },
  {
    id: 'termica-jorge-lacerda',
    name: 'Complexo Termelétrico Jorge Lacerda',
    type: 'termica',
    capacityMW: 857,
    subsystem: 'S',
    state: 'SC',
    riverOrRegion: 'Capivari de Baixo / Tubarão',
    operator: 'Diamante Geração de Energia',
    coordinates: [-49.0000, -28.4500],
    description: 'Maior complexo termelétrico a carvão mineral da América Latina, abastecido pela bacia carbonífera de Santa Catarina.',
    technicalDetails: {
      commissionYear: 1965,
      turbinesOrUnits: '7 unidades geradoras a vapor (Fases A, B e C)',
      gridConnectionVoltage: '230 kV / 138 kV'
    }
  },
  {
    id: 'termica-maua-3',
    name: 'UTE Mauá 3',
    type: 'termica',
    capacityMW: 591,
    subsystem: 'N',
    state: 'AM',
    riverOrRegion: 'Manaus (Distrito Industrial)',
    operator: 'Eletrobras Amazonas GT',
    coordinates: [-59.9500, -3.1333],
    description: 'Principal termelétrica de base de Manaus, alimentada por gás natural do gasoduto Urucu-Coari-Manaus no coração da Amazônia.',
    technicalDetails: {
      commissionYear: 2017,
      turbinesOrUnits: 'Ciclo combinado (2 turbinas a gás + 1 a vapor)',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'termica-baixada-fluminense',
    name: 'UTE Baixada Fluminense',
    type: 'termica',
    capacityMW: 530,
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Seropédica',
    operator: 'Petrobras',
    coordinates: [-43.7000, -22.7500],
    description: 'Localizada no nó logístico do Arco Metropolitano do RJ, gera energia em ciclo combinado a partir de gás natural entregue pelo Gasduc.',
    technicalDetails: {
      commissionYear: 2014,
      turbinesOrUnits: '1 turbina a gás + 1 turbina a vapor',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'termica-cuiaba',
    name: 'UTE Governador Mário Covas (Cuiabá)',
    type: 'termica',
    capacityMW: 529,
    subsystem: 'SE/CO',
    state: 'MT',
    riverOrRegion: 'Cuiabá',
    operator: 'Âmbar Energia',
    coordinates: [-56.0500, -15.6500],
    description: 'Conectada ao gasoduto lateral Bolívia-Mato Grosso, crucial para a estabilidade elétrica e controle de tensão no Centro-Oeste.',
    technicalDetails: {
      commissionYear: 2002,
      turbinesOrUnits: 'Ciclo combinado a gás natural',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'termica-santa-cruz',
    name: 'UTE Santa Cruz',
    type: 'termica',
    capacityMW: 500,
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Rio de Janeiro (Zona Oeste / Santa Cruz)',
    operator: 'Eletrobras Furnas',
    coordinates: [-43.6833, -22.9167],
    description: 'Histórica usina termelétrica da Baía de Sepetiba, modernizada para ciclo combinado a gás natural para segurança de suprimento da cidade do Rio.',
    technicalDetails: {
      commissionYear: 1967,
      turbinesOrUnits: 'Ciclo combinado moderno a gás',
      gridConnectionVoltage: '138 kV / 500 kV'
    }
  },
  {
    id: 'termica-termopernambuco',
    name: 'UTE Termopernambuco',
    type: 'termica',
    capacityMW: 498,
    subsystem: 'NE',
    state: 'PE',
    riverOrRegion: 'Complexo Industrial e Portuário de Suape (Ipojuca)',
    operator: 'Neoenergia',
    coordinates: [-35.0000, -8.4000],
    description: 'Instalada no Complexo de Suape, gera eletricidade em ciclo combinado a gás natural para abastecimento do litoral e pólo fabril pernambucano.',
    technicalDetails: {
      commissionYear: 2004,
      turbinesOrUnits: '2 turbinas a gás + 1 a vapor (Alstom)',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'termica-candiota-3',
    name: 'UTE Candiota III (Fase C)',
    type: 'termica',
    capacityMW: 350,
    subsystem: 'S',
    state: 'RS',
    riverOrRegion: 'Candiota / Campanha Gaúcha',
    operator: 'Âmbar Energia',
    coordinates: [-53.7200, -31.5500],
    description: 'Situada na maior jazida de carvão mineral a céu aberto do país, concebida para suprimento de base na fronteira sul do SIN.',
    technicalDetails: {
      commissionYear: 2011,
      turbinesOrUnits: '1 turbo-gerador a vapor (carvão pulverizado)',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'biomassa-sao-martinho',
    name: 'UTE São Martinho (Biomassa)',
    type: 'termica',
    capacityMW: 210,
    subsystem: 'SE/CO',
    state: 'SP',
    riverOrRegion: 'Pradópolis (Ribeirão Preto)',
    operator: 'Usina São Martinho',
    coordinates: [-48.0667, -21.3667],
    description: 'Maior termelétrica de cogeração a partir de biomassa de cana-de-açúcar (bagaço e palha) do planeta, exportando energia limpa no pico da safra.',
    technicalDetails: {
      commissionYear: 2009,
      turbinesOrUnits: 'Caldeiras de alta pressão e turbogeradores a vapor',
      gridConnectionVoltage: '138 kV'
    }
  }
];

export const majorTransmissionLines: TransmissionLineFeature[] = [
  {
    id: 'linha-belo-monte-rio',
    name: 'Linhão de Belo Monte II (Xingu ➔ Terminal Rio)',
    voltageKV: 800,
    type: 'CC',
    lengthKm: 2543,
    from: 'SE Xingu (Anapu/Altamira - PA)',
    to: 'SE Terminal Rio (Nova Iguaçu/Paracambi - RJ)',
    concessionaire: 'XRTE (State Grid Brasil)',
    coordinates: [
      [-51.7778, -3.1256],
      [-49.8000, -6.5000],
      [-48.5000, -10.2000],
      [-47.8000, -14.5000],
      [-46.0000, -18.5000],
      [-44.2000, -21.5000],
      [-43.6000, -22.7500]
    ],
    technicalDetails: {
      converterTechnology: 'UHVDC ±800 kV LCC (Line Commutated Converter)',
      towerCount: 4448,
      substations: ['SE Xingu (PA)', 'SE Terminal Rio (RJ)']
    }
  },
  {
    id: 'linha-belo-monte-estreito',
    name: 'Linhão de Belo Monte I (Xingu ➔ Estreito)',
    voltageKV: 800,
    type: 'CC',
    lengthKm: 2092,
    from: 'SE Xingu (Altamira - PA)',
    to: 'SE Estreito (Ibiraci/Franca - MG/SP)',
    concessionaire: 'BMTE (State Grid / Eletrobras)',
    coordinates: [
      [-51.7778, -3.1256],
      [-50.2000, -7.5000],
      [-49.0000, -11.5000],
      [-48.6000, -15.8000],
      [-47.9000, -18.8000],
      [-47.1000, -20.4500]
    ],
    technicalDetails: {
      converterTechnology: 'UHVDC ±800 kV Bipolo 1',
      towerCount: 3950,
      substations: ['SE Xingu (PA)', 'SE Estreito (MG)']
    }
  },
  {
    id: 'linha-madeira-sp',
    name: 'Bipolo do Madeira (Porto Velho ➔ Araraquara)',
    voltageKV: 600,
    type: 'CC',
    lengthKm: 2375,
    from: 'SE Coletora Porto Velho (RO)',
    to: 'SE Araraquara 2 (SP)',
    concessionaire: 'IE Madeira / Eletrobras Furnas',
    coordinates: [
      [-63.9000, -8.8000],
      [-60.5000, -11.8000],
      [-56.0000, -14.5000],
      [-52.5000, -18.2000],
      [-49.0000, -20.8000],
      [-48.1800, -21.7900]
    ],
    technicalDetails: {
      converterTechnology: 'HVDC ±600 kV (2 x Bipolos)',
      towerCount: 4900,
      substations: ['SE Coletora Porto Velho', 'SE Araraquara 2']
    }
  },
  {
    id: 'linha-itaipu-sp',
    name: 'Tronco Itaipu ➔ Ivaiporã ➔ Tijuco Preto (SP)',
    voltageKV: 765,
    type: 'CA',
    lengthKm: 900,
    from: 'SE Foz do Iguaçu (PR)',
    to: 'SE Tijuco Preto (Cotia/SP)',
    concessionaire: 'Eletrobras Furnas',
    coordinates: [
      [-54.5889, -25.4083],
      [-51.6800, -24.2500],
      [-49.4000, -23.5000],
      [-47.0500, -23.6500]
    ],
    technicalDetails: {
      converterTechnology: '765 kV CA Tri-circuito',
      substations: ['SE Foz do Iguaçu', 'SE Ivaiporã', 'SE Tijuco Preto']
    }
  },
  {
    id: 'linha-interligacao-ne-se',
    name: 'Interligação Nordeste ➔ Sudeste (500 kV)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1350,
    from: 'SE Bom Jesus da Lapa (BA)',
    to: 'SE Neves (Belo Horizonte - MG)',
    concessionaire: 'Taesa / ISA CTEEP',
    coordinates: [
      [-43.4300, -13.2500],
      [-44.1500, -15.8000],
      [-44.3000, -18.2000],
      [-44.0500, -19.7800]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA Malha de Escoamento Eólico/Solar'
    }
  },
  {
    id: 'linha-tucurui-manaus',
    name: 'Linhão de Tucuruí (Tucuruí ➔ Macapá ➔ Manaus)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1800,
    from: 'SE Tucuruí (PA)',
    to: 'SE Eng. Lechuga (Manaus - AM)',
    concessionaire: 'Eletrobras Eletronorte',
    coordinates: [
      [-49.6469, -3.8328],
      [-51.0500, 0.0400],
      [-54.7000, -2.4300],
      [-58.4500, -3.1000],
      [-60.0200, -3.0500]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA (Inclui travessia aérea do Rio Amazonas com torres de 295 metros)'
    }
  },
  {
    id: 'anel-sudeste-500',
    name: 'Anel Metropolitano de 500 kV (Rio - São Paulo - BH)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 850,
    from: 'SE Terminal Rio (RJ)',
    to: 'SE Campinas / Tijuco Preto (SP)',
    concessionaire: 'Eletrobras Furnas / ISA CTEEP',
    coordinates: [
      [-43.6000, -22.7500],
      [-44.5000, -22.5000],
      [-45.8000, -23.1000],
      [-47.0500, -23.6500]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA Malha Crítica de Carga'
    }
  },
  {
    id: 'linha-xingo-recife',
    name: 'Linha Xingó ➔ Recife',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 480,
    from: 'SE Xingó (AL/SE/BA)',
    to: 'SE Recife II (PE)',
    concessionaire: 'Chesf',
    coordinates: [
      [-37.7958, -9.6158],
      [-36.8000, -8.9000],
      [-35.9000, -8.3000],
      [-34.9500, -8.0500]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA Malha de Escoamento Hidráulico do São Francisco'
    }
  },
  {
    id: 'linha-norte-nordeste',
    name: 'Interligação Norte-Nordeste (Imperatriz ➔ Presidente Dutra)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 480,
    from: 'SE Imperatriz (MA)',
    to: 'SE Presidente Dutra (MA)',
    concessionaire: 'Eletronorte / Chesf',
    coordinates: [
      [-47.4900, -5.5300],
      [-46.2000, -5.4500],
      [-44.4800, -5.2800]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — elo histórico que uniu os subsistemas Norte e Nordeste em 1999'
    }
  },
  {
    id: 'linha-sul-sudeste',
    name: 'Interligação Sul-Sudeste (Blumenau ➔ Ivaiporã)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 900,
    from: 'SE Blumenau (SC)',
    to: 'SE Ivaiporã (PR)',
    concessionaire: 'Eletrosul / Copel',
    coordinates: [
      [-49.0700, -26.9200],
      [-50.2000, -25.8000],
      [-51.6800, -24.2500]
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA — reforço do intercâmbio Sul-Sudeste'
    }
  },
  {
    id: 'linha-manaus-boavista',
    name: 'Linhão de Tucuruí (Manaus ➔ Boa Vista)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 715,
    from: 'SE Eng. Lechuga (Manaus - AM)',
    to: 'SE Boa Vista (RR)',
    concessionaire: 'Eletronorte',
    coordinates: [
      [-60.0200, -3.0500],
      [-60.4000, -1.0000],
      [-60.6000, 1.0000],
      [-60.6700, 2.8200]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — encerrou em 2022 o isolamento elétrico de Roraima, último estado fora do SIN'
    }
  },
  {
    id: 'linha-acre-rondonia',
    name: 'Interligação Acre-Rondônia',
    voltageKV: 230,
    type: 'CA',
    lengthKm: 480,
    from: 'SE Rio Branco (AC)',
    to: 'SE Porto Velho (RO)',
    concessionaire: 'Eletronorte',
    coordinates: [
      [-67.8100, -9.9700],
      [-65.8000, -9.3000],
      [-63.9000, -8.7600]
    ],
    technicalDetails: {
      converterTechnology: '230 kV CA — encerrou em 2012 a era dos sistemas isolados no Acre'
    }
  },
  {
    id: 'linha-brasil-uruguai',
    name: 'Interligação Brasil-Uruguai (Livramento ➔ Rivera)',
    voltageKV: 230,
    type: 'CC',
    lengthKm: 3,
    from: 'SE Livramento (RS)',
    to: 'SE Rivera (Uruguai)',
    concessionaire: 'CGT Eletrosul / UTE',
    coordinates: [
      [-55.5300, -30.8900],
      [-55.5500, -30.9000]
    ],
    technicalDetails: {
      converterTechnology: 'Estação conversora back-to-back (70 MW) — intercâmbio binacional Brasil-Uruguai'
    }
  },
  {
    id: 'linha-brasil-argentina',
    name: 'Interligação Brasil-Argentina (Garabi)',
    voltageKV: 500,
    type: 'CC',
    lengthKm: 15,
    from: 'SE Garruchos (RS)',
    to: 'SE Garabí (Argentina)',
    concessionaire: 'Eletrobras / CIEN',
    coordinates: [
      [-55.6300, -28.1800],
      [-55.7500, -27.9800]
    ],
    technicalDetails: {
      converterTechnology: 'Estação conversora back-to-back HVDC (2.200 MW) — maior intercâmbio binacional do SIN'
    }
  },
  {
    id: 'linha-saosimao-brasilia',
    name: 'Linha São Simão ➔ Brasília',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 430,
    from: 'SE São Simão (MG/GO)',
    to: 'SE Brasília Sul (DF)',
    concessionaire: 'Furnas',
    coordinates: [
      [-50.5000, -18.9833],
      [-49.3000, -17.5000],
      [-47.9000, -15.8000]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — escoamento da cascata do Paranaíba para o Distrito Federal'
    }
  },
  {
    id: 'bipolo-itaipu-ibiuna',
    name: 'Bipolo de Itaipu HVDC (Foz do Iguaçu ➔ Ibiúna)',
    voltageKV: 600,
    type: 'CC',
    lengthKm: 810,
    from: 'SE Foz do Iguaçu (PR)',
    to: 'SE Ibiúna (Cotia / Ibiúna - SP)',
    concessionaire: 'Eletrobras Furnas',
    coordinates: [
      [-54.5889, -25.4083],
      [-52.5000, -24.8000],
      [-49.8000, -24.0000],
      [-47.1800, -23.6500]
    ],
    technicalDetails: {
      converterTechnology: 'HVDC ±600 kV (Bipolos 1 e 2) — converte os 50 Hz do setor paraguaio para os 60 Hz da Grande SP',
      substations: ['SE Foz do Iguaçu', 'SE Ibiúna']
    }
  },
  {
    id: 'linha-norte-sul-500',
    name: 'Tronco Norte-Sul (Imperatriz ➔ Serra da Mesa ➔ Brasília)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1280,
    from: 'SE Imperatriz (MA)',
    to: 'SE Samambaia (DF)',
    concessionaire: 'Taesa / Eletronorte',
    coordinates: [
      [-47.4900, -5.5300],
      [-48.2000, -8.0500],
      [-48.5500, -10.2000],
      [-49.0000, -11.7500],
      [-48.3300, -13.8300],
      [-48.0800, -15.8700]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — espinha dorsal histórica que selou a integração elétrica do Norte com o Sudeste em 1999'
    }
  },
  {
    id: 'linha-telespires-seco',
    name: 'Linhão Teles Pires (Paranaíta ➔ Ribeirãozinho ➔ Rio Verde)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1050,
    from: 'SE Coletora Paranaíta (MT)',
    to: 'SE Ribeirãozinho (MT/GO)',
    concessionaire: 'Matrinchã Transmissora / State Grid',
    coordinates: [
      [-56.4500, -9.6000],
      [-55.5000, -11.9000],
      [-54.5000, -14.3000],
      [-53.1500, -16.4500]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — escoamento da cascata hidrelétrica do Rio Teles Pires cruzando o Centro-Oeste'
    }
  },
  {
    id: 'linha-tucurui-imperatriz',
    name: 'Linha Tucuruí ➔ Marabá ➔ Imperatriz',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 540,
    from: 'SE Tucuruí (PA)',
    to: 'SE Imperatriz (MA)',
    concessionaire: 'Eletronorte',
    coordinates: [
      [-49.6469, -3.8328],
      [-49.1200, -5.3500],
      [-47.4900, -5.5300]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — conecta a potência de Tucuruí ao polo mínero-metalúrgico de Carajás e ao nó de Imperatriz'
    }
  },
  {
    id: 'linha-sertao-salvador',
    name: 'Corredor Renováveis Bahia (Morro do Chapéu ➔ Sapeaçu ➔ Camaçari)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 420,
    from: 'SE Morro do Chapéu II (BA)',
    to: 'SE Camaçari Polo (BA)',
    concessionaire: 'Neoenergia / Chesf',
    coordinates: [
      [-41.1500, -11.5500],
      [-40.0000, -12.3000],
      [-39.0500, -12.7000],
      [-38.3000, -12.7000]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — escoa a intensa produção eólica da Chapada Diamantina para o polo petroquímico e Salvador'
    }
  },
  {
    id: 'linha-acu-campina-recife',
    name: 'Corredor Potiguar/Borborema (Açu ➔ Campina Grande ➔ Suape)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 510,
    from: 'SE Açu III (RN)',
    to: 'SE Suape II (PE)',
    concessionaire: 'Taesa / Chesf',
    coordinates: [
      [-36.9000, -5.5800],
      [-36.2000, -6.5000],
      [-35.9000, -7.2200],
      [-35.0500, -8.3800]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — principal rota de escoamento eólico dos parques potiguares e paraibanos rumo ao Recife'
    }
  },
  {
    id: 'linha-pauloafonso-salvador',
    name: 'Linha Paulo Afonso ➔ Camaçari (Tronco Chesf)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 430,
    from: 'SE Paulo Afonso (BA)',
    to: 'SE Camaçari (BA)',
    concessionaire: 'Chesf',
    coordinates: [
      [-38.2200, -9.4000],
      [-38.5000, -10.5000],
      [-38.4500, -11.8000],
      [-38.3000, -12.7000]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — linha tronco clássica da Chesf transportando energia do Rio São Francisco para a RMS'
    }
  },
  {
    id: 'linha-furnas-campinas',
    name: 'Tronco Furnas ➔ Campinas (500 kV)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 340,
    from: 'SE Furnas (São José da Barra - MG)',
    to: 'SE Campinas (SP)',
    concessionaire: 'Eletrobras Furnas',
    coordinates: [
      [-46.3167, -20.6667],
      [-46.7000, -21.6000],
      [-47.0600, -22.9000]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — corredor pioneiro integrando o Lago de Furnas ao polo industrial paulista'
    }
  },
  {
    id: 'linha-ilhasolteira-araraquara',
    name: 'Linha Ilha Solteira ➔ Araraquara (Tronco Rio Paraná)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 380,
    from: 'SE Ilha Solteira (SP)',
    to: 'SE Araraquara (SP)',
    concessionaire: 'ISA CTEEP',
    coordinates: [
      [-51.3667, -20.4333],
      [-49.8000, -21.0000],
      [-48.1800, -21.7900]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — conecta as hidrelétricas da calha do Paraná ao entroncamento energético de Araraquara'
    }
  },
  {
    id: 'linha-iguacu-curitiba',
    name: 'Corredor Iguaçu ➔ Curitiba Leste (525 kV)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 410,
    from: 'SE Foz do Areia (PR)',
    to: 'SE Curitiba Leste (Bateias - PR)',
    concessionaire: 'Copel GeT',
    coordinates: [
      [-51.6600, -26.0100],
      [-50.5000, -25.7000],
      [-49.2700, -25.4200]
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA — escoa as usinas de Foz do Areia, Segredo e Salto Santiago até Curitiba'
    }
  },
  {
    id: 'linha-curitiba-blumenau',
    name: 'Linha Curitiba ➔ Joinville ➔ Blumenau',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 220,
    from: 'SE Curitiba Leste (PR)',
    to: 'SE Blumenau (SC)',
    concessionaire: 'Copel / Eletrosul',
    coordinates: [
      [-49.2700, -25.4200],
      [-48.8500, -26.3000],
      [-49.0700, -26.9200]
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA — corredor litorâneo abastecendo os polos têxtil e metalmecânico de Joinville e Vale do Itajaí'
    }
  },
  {
    id: 'linha-ita-portoalegre',
    name: 'Linha Itá ➔ Caxias do Sul ➔ Nova Santa Rita (Porto Alegre)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 390,
    from: 'SE Itá (SC/RS)',
    to: 'SE Nova Santa Rita (RS)',
    concessionaire: 'CGT Eletrosul',
    coordinates: [
      [-52.3800, -27.2800],
      [-51.1800, -29.1700],
      [-51.2700, -29.8500]
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA — rota principal que alimenta a Grande Porto Alegre a partir da bacia do Rio Uruguai'
    }
  },
  {
    id: 'linha-brasilia-cuiaba',
    name: 'Corredor Trans-Cerrado (Brasília ➔ Goiânia ➔ Rio Verde ➔ Cuiabá)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 980,
    from: 'SE Samambaia (DF)',
    to: 'SE Cuiabá (MT)',
    concessionaire: 'Furnas / IE Paranaíba',
    coordinates: [
      [-48.0800, -15.8700],
      [-49.2500, -16.6800],
      [-50.9200, -17.7900],
      [-54.6300, -16.4700],
      [-56.0900, -15.6000]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — conecta o polo agroindustrial do Mato Grosso e a capital mato-grossense ao anel Centro-Oeste'
    }
  },
  {
    id: 'linha-acu-rio',
    name: 'Linha GNA Porto do Açu ➔ Terminal Rio',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 345,
    from: 'SE GNA Porto do Açu (RJ)',
    to: 'SE Terminal Rio (Nova Iguaçu - RJ)',
    concessionaire: 'GNA / Eletrobras Furnas',
    coordinates: [
      [-41.0500, -21.8333],
      [-41.3200, -21.7500],
      [-42.4000, -22.3000],
      [-43.6000, -22.7500]
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — conecta a mega usina a GNL de Porto do Açu ao centro de consumo metropolitano do RJ'
    }
  },
  {
    id: 'linha-gracaaranha-silvania',
    name: 'Linhão UHVDC Nordeste ➔ Centro-Oeste (Graça Aranha ➔ Silvânia)',
    voltageKV: 800,
    type: 'CC',
    lengthKm: 1468,
    from: 'SE Graça Aranha (MA)',
    to: 'SE Silvânia (GO)',
    concessionaire: 'State Grid Brasil (Bipolo 3)',
    coordinates: [
      [-44.2500, -5.0800],
      [-46.0000, -7.5000],
      [-47.2000, -10.5000],
      [-47.8000, -13.5000],
      [-48.6000, -16.6500]
    ],
    technicalDetails: {
      converterTechnology: 'UHVDC ±800 kV — projeto histórico do Leilão de Transmissão 01/2023 para escoamento maciço de solar/eólica do NE para o Sudeste'
    }
  }
];

export const subsystems = [
  { id: 'SE_CO', name: 'Sudeste / Centro-Oeste', loadShare: '58.4%', center: [-47.92, -18.8], desc: 'Centro de gravidade do consumo e capacidade de regularização plurianual dos reservatórios.' },
  { id: 'S', name: 'Sul', loadShare: '17.2%', center: [-51.21, -27.5], desc: 'Polo hidroelétrico do Iguaçu/Uruguai e interligações internacionais com Argentina e Uruguai.' },
  { id: 'NE', name: 'Nordeste', loadShare: '16.8%', center: [-39.50, -9.5], desc: 'Exportador líquido estrutural de energia renovável (eólica noturna e solar diurna).' },
  { id: 'N', name: 'Norte', loadShare: '7.6%', center: [-52.50, -4.2], desc: 'Supergerador a fio d\'água (Belo Monte/Tucuruí) drenado para o centro de carga nacional via UHVDC.' }
];
