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

export const liveGridTelemetry = {
  frequencyHz: 60.00,
  instantaneousLoadMW: 85420,
  peakRecordMW: 105150,
  renewableSharePct: 84.8,
  systemStatus: 'NOMINAL // DESPACHO ONS 100% INTEGRADO',
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
  }
];

export const subsystems = [
  { id: 'SE_CO', name: 'Sudeste / Centro-Oeste', loadShare: '58.4%', center: [-47.92, -18.8], desc: 'Centro de gravidade do consumo e capacidade de regularização plurianual dos reservatórios.' },
  { id: 'S', name: 'Sul', loadShare: '17.2%', center: [-51.21, -27.5], desc: 'Polo hidroelétrico do Iguaçu/Uruguai e interligações internacionais com Argentina e Uruguai.' },
  { id: 'NE', name: 'Nordeste', loadShare: '16.8%', center: [-39.50, -9.5], desc: 'Exportador líquido estrutural de energia renovável (eólica noturna e solar diurna).' },
  { id: 'N', name: 'Norte', loadShare: '7.6%', center: [-52.50, -4.2], desc: 'Supergerador a fio d\'água (Belo Monte/Tucuruí) drenado para o centro de carga nacional via UHVDC.' }
];
