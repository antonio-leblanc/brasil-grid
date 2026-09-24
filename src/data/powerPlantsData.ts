import type { PowerPlantFeature } from './gridData';

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
