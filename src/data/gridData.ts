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
}

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
    description: 'Segunda maior usina do mundo em geração e ápice da engenharia hidroelétrica. Possui 20 unidades geradoras de 700 MW cada.'
  },
  {
    id: 'belo-monte',
    name: 'UHE Belo Monte',
    type: 'hidro',
    capacityMW: 11233,
    subsystem: 'N',
    state: 'PA',
    riverOrRegion: 'Rio Xingu (Altamira)',
    operator: 'Norte Energia',
    coordinates: [-51.7778, -3.1256],
    description: 'A maior usina puramente brasileira. Opera a fio d\'água, com vazão altamente sazonal, escoando sua energia para o Sudeste via dois superlinhões de ±800 kV CC.'
  },
  {
    id: 'tucurui',
    name: 'UHE Tucuruí',
    type: 'hidro',
    capacityMW: 8370,
    subsystem: 'N',
    state: 'PA',
    riverOrRegion: 'Rio Tocantins',
    operator: 'Eletrobras Eletronorte',
    coordinates: [-49.6469, -3.8328],
    description: 'Gigante da Amazônia Oriental, essencial para o suprimento de indústrias de alumínio e interligação com o Nordeste e Sudeste.'
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
    description: 'Complexo do Rio Madeira com turbinas bulbo de alta tecnologia para baixa queda d\'água.'
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
    description: 'Irmã de Jirau, escoa energia via o Bipolo do Madeira (linhas de corrente contínua até Araraquara em SP).'
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
    description: 'A âncora da regulação hídrica e elétrica do Rio São Francisco no Nordeste brasileiro.'
  },
  {
    id: 'paulo-afonso',
    name: 'Complexo Paulo Afonso',
    type: 'hidro',
    capacityMW: 4279,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Rio São Francisco',
    operator: 'Eletrobras Chesf',
    coordinates: [-38.2167, -9.4000],
    description: 'Berço da eletrificação do semiárido nordestino, composto por quatro grandes usinas escalonadas.'
  },
  {
    id: 'angra-nuclear',
    name: 'CNAAA (Angra 1 e 2)',
    type: 'nuclear',
    capacityMW: 1990,
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Praia de Itaorna (Angra dos Reis)',
    operator: 'Eletronuclear',
    coordinates: [-44.4578, -23.0078],
    description: 'Geração de base limpa (zero emissão direta) essencial para garantir estabilidade e tensão na ponta de carga do Rio de Janeiro.'
  },
  {
    id: 'eolica-alto-sertao',
    name: 'Complexo Eólico Alto Sertão I, II e III',
    type: 'eolica',
    capacityMW: 1200,
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Caetité / Igaporã',
    operator: 'Renova Energia / AES Brasil',
    coordinates: [-42.4800, -14.0700],
    description: 'Um dos maiores complexos eólicos da América do Sul, aproveitando os ventos constantes e unidirecionais do sertão baiano.'
  },
  {
    id: 'solar-pirapora',
    name: 'Complexo Solar Pirapora',
    type: 'solar',
    capacityMW: 400,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Pirapora (Norte de Minas Gerais)',
    operator: 'EDF Renewables / Omega',
    coordinates: [-44.9358, -17.3458],
    description: 'Pioneiro em energia solar centralizada de altíssima escala, às margens do Rio São Francisco.'
  },
  {
    id: 'solar-janauba',
    name: 'Complexo Solar Janaúba',
    type: 'solar',
    capacityMW: 1200,
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Janaúba (Norte de Minas Gerais)',
    operator: 'Elera Renováveis',
    coordinates: [-43.3089, -15.8028],
    description: 'Um dos maiores parques solares do planeta, com mais de 2,2 milhões de módulos fotovoltaicos instalados.'
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
    description: 'Maior termelétrica a gás natural da América Latina, abastecida por GNL regaseificado no mar para garantir segurança de despacho.'
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    id: 'linha-tucurui-manaus',
    name: 'Linhão de Tucuruí (Tucuruí ➔ Macapá ➔ Manaus)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1800,
    from: 'SE Tucuruí (PA)',
    to: 'SE Eng. Lechuga (Manaus - AM)',
    concessionaire: 'Eletrobras Eletronorte / Abengoa',
    coordinates: [
      [-49.6469, -3.8328],
      [-51.0500, 0.0400],
      [-54.7000, -2.4300],
      [-58.4500, -3.1000],
      [-60.0200, -3.0500]
    ]
  },
  {
    id: 'anel-sudeste-500',
    name: 'Anel Metropolitano de 500 kV (Rio - São Paulo - Belo Horizonte)',
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
    ]
  }
];

export const subsystems = [
  { id: 'SE_CO', name: 'Sudeste / Centro-Oeste', loadShare: '58%', icon: '🏙️', center: [-47.92, -18.8], desc: 'Maior centro de carga e capacidade de armazenamento dos reservatórios do país.' },
  { id: 'S', name: 'Sul', loadShare: '17%', icon: '🌾', center: [-51.21, -27.5], desc: 'Forte presença de Itaipu, hidrelétricas em cascata e biomassa.' },
  { id: 'NE', name: 'Nordeste', loadShare: '17%', icon: '💨', center: [-39.50, -9.5], desc: 'Grande exportador de energia limpa graças aos recordes diários de eólica e solar.' },
  { id: 'N', name: 'Norte', loadShare: '8%', icon: '🌳', center: [-52.50, -4.2], desc: 'Berço das usinas a fio d\'água (Belo Monte, Tucuruí, Madeira), interligado por megavoltagens.' }
];
