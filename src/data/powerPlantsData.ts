import type { PowerPlantFeature } from './gridData';

export const majorPowerPlants: PowerPlantFeature[] = [
  {
    id: 'itaipu',
    name: 'UHE Itaipu Binacional',
    type: 'hidro',
    capacityMW: 14000,
    cegs: ['UHE.PH.PR.001161-4.1'],
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Paraná (Foz do Iguaçu)',
    operator: 'Itaipu Binacional (Brasil / Paraguai)',
    coordinates: [-54.5889, -25.4083],
    description: 'Segunda maior usina do mundo em geração histórica. Binacional, com 20 unidades Francis de 700 MW: 10 em 60 Hz (parte brasileira, 7.000 MW outorgados pela ANEEL) e 10 em 50 Hz (parte paraguaia). A energia paraguaia não consumida no Paraguai é cedida ao Brasil e chega ao SIN pelos bipolos de ±600 kV até Ibiúna, por isso o ponto no mapa mostra os 14.000 MW da usina inteira.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.PR.001161-4.1 (Itaipu, parte brasileira: 7.000 MW outorgados; o setor paraguaio de 50 Hz não tem outorga ANEEL)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'Itaipu Binacional — Dados Técnicos Oficiais',
        url: 'https://www.itaipu.gov.br/energia/caracteristicas-da-usina',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1984,
      turbinesOrUnits: '20 x 700 MW (Francis) — 10 em 50 Hz e 10 em 60 Hz',
      flowOrEfficiency: 'Vazão nominal: 14.000 m³/s',
      gridConnectionVoltage: '500 kV (CA) & ±600 kV (CC)'
    }
  },
  {
    id: 'belo-monte',
    name: 'UHE Belo Monte',
    type: 'hidro',
    capacityMW: 11233.1,
    cegs: ['UHE.PH.PA.030354-2.1'],
    subsystem: 'N',
    state: 'PA',
    riverOrRegion: 'Rio Xingu (Altamira/Vitória do Xingu)',
    operator: 'Norte Energia S.A. (Axia Energia / Neoenergia)',
    coordinates: [-51.7778, -3.1256],
    description: 'Maior hidrelétrica 100% brasileira. Usina a fio d\'água altamente sazonal, dividida entre o Sítio Belo Monte (11.000 MW) e o Vertedouro Pimental (233,1 MW), com escoamento em ±800 kV UHVDC.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.PA.030354-2.1 (Belo Monte, inclui a casa de força de Pimental)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Norte Energia — Ficha Técnica Belo Monte',
        url: 'https://www.norteenergiasa.com.br/pt-br/uhe-belo-monte/usina',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2016,
      turbinesOrUnits: '18 x 611,11 MW (Belo Monte Francis) + 6 x 38,85 MW + 3 x 2,14 MW (Pimental Bulbo)',
      flowOrEfficiency: 'Queda líquida nominal: ~89 metros',
      gridConnectionVoltage: '±800 kV UHVDC (Bipolos 1 e 2)'
    }
  },
  {
    id: 'tucurui',
    name: 'UHE Tucuruí',
    type: 'hidro',
    capacityMW: 8535,
    cegs: ['UHE.PH.PA.002889-4.1'],
    subsystem: 'N',
    state: 'PA',
    riverOrRegion: 'Rio Tocantins (Tucuruí)',
    operator: 'Axia Energia (Eletronorte)',
    coordinates: [-49.6469, -3.8328],
    description: 'Âncora industrial da Amazônia Oriental. Alimentador crítico dos complexos eletrointensivos de alumínio e interligação com os subsistemas Nordeste e Sudeste.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.PA.002889-4.1 (Tucuruí)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — Cadastro de Capacidade de Geração', url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1984,
      turbinesOrUnits: '24 unidades geradoras: 12 x 350 MW (Fase I) + 11 x 370 MW + 1 x 370 MW + 2 x 15 MW aux (Fase II)',
      flowOrEfficiency: 'Vazão máxima do vertedouro: 110.000 m³/s',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'jirau',
    name: 'UHE Jirau',
    type: 'hidro',
    capacityMW: 3750,
    cegs: ['UHE.PH.RO.029736-4.1'],
    subsystem: 'N',
    state: 'RO',
    riverOrRegion: 'Rio Madeira (Porto Velho)',
    operator: 'ESBR — Energia Sustentável do Brasil (Engie / Axia Energia)',
    coordinates: [-64.6547, -9.2647],
    description: 'Complexo de engenharia no Rio Madeira equipado com turbinas bulbo de alto rendimento para baixas quedas d\'água.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.RO.029736-4.1 (Jirau)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — Cadastro de Capacidade de Geração', url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 2013,
      turbinesOrUnits: '50 turbinas tipo Bulbo de 75 MW',
      flowOrEfficiency: 'Queda líquida nominal: 15,2 metros',
      gridConnectionVoltage: '500 kV ➔ Conversora Coletora Porto Velho ±600 kV'
    }
  },
  {
    id: 'santo-antonio',
    name: 'UHE Santo Antônio',
    type: 'hidro',
    capacityMW: 3568,
    cegs: ['UHE.PH.RO.029707-0.1'],
    subsystem: 'N',
    state: 'RO',
    riverOrRegion: 'Rio Madeira (Porto Velho)',
    operator: 'Santo Antônio Energia S.A. (Axia Energia)',
    coordinates: [-63.9536, -8.8028],
    description: 'Opera a fio d\'água em conjunto com Jirau. Sua energia viaja pelo Bipolo do Madeira até a subestação de Araraquara (SP).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.RO.029707-0.1 (Santo Antônio)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — Cadastro de Capacidade de Geração', url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 2012,
      turbinesOrUnits: '50 turbinas tipo Bulbo (44 x 71,6 MW + 6 x 69,59 MW)',
      flowOrEfficiency: 'Vazão nominal: 24.000 m³/s',
      gridConnectionVoltage: '500 kV ➔ Conversora Coletora Porto Velho ±600 kV'
    }
  },
  {
    id: 'xingó',
    name: 'UHE Xingó',
    type: 'hidro',
    capacityMW: 3162,
    cegs: ['UHE.PH.SE.027053-9.1'],
    subsystem: 'NE',
    state: 'AL/SE',
    riverOrRegion: 'Rio São Francisco (Canindé/Piranhas)',
    operator: 'Axia Energia (Chesf)',
    coordinates: [-37.7958, -9.6158],
    description: 'Chave mestre da segurança eletroenergética do Nordeste no baixo São Francisco, com vertedouro encravado no cânion.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.SE.027053-9.1 (Xingó)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — Cadastro de Capacidade de Geração', url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1994,
      turbinesOrUnits: '6 x 527 MW (Francis)',
      flowOrEfficiency: 'Queda nominal: 118 metros',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'paulo-afonso',
    name: 'Complexo Paulo Afonso (I-IV + Apolônio Sales)',
    type: 'hidro',
    capacityMW: 4279.6,
    cegs: ['UHE.PH.BA.002012-5.1', 'UHE.PH.BA.027048-2.1', 'UHE.PH.BA.027049-0.1', 'UHE.PH.BA.027050-4.1', 'UHE.PH.AL.001510-5.1'],
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Rio São Francisco (Paulo Afonso)',
    operator: 'Axia Energia (Chesf)',
    coordinates: [-38.2167, -9.4000],
    description: 'Complexo histórico pioneiro da eletrificação nordestina. Composto por quatro usinas em Paulo Afonso (I: 180 MW, II: 443 MW, III: 794,2 MW, IV: 2.462,4 MW) e a usina de Apolônio Sales / Moxotó (400 MW).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.BA.002012-5.1, 027048-2.1, 027049-0.1 e 027050-4.1 (Paulo Afonso I-IV) & UHE.PH.AL.001510-5.1 (Apolônio Sales)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — Cadastro de Capacidade de Geração', url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1955,
      turbinesOrUnits: '23 unidades geradoras totais somadas nas 5 casas de força',
      gridConnectionVoltage: '230 kV & 500 kV'
    }
  },
  {
    id: 'angra-nuclear',
    name: 'Central Nuclear Almirante Álvaro Alberto (Angra 1 e 2)',
    type: 'nuclear',
    capacityMW: 1990,
    cegs: ['UTN.UR.RJ.000100-7.1', 'UTN.UR.RJ.000101-5.1'],
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Praia de Itaorna (Angra dos Reis)',
    operator: 'Eletronuclear',
    coordinates: [-44.4578, -23.0078],
    description: 'Geração térmica de base com zero emissão direta de carbono. Estabilidade inercial e sustentação de tensão para o polo de consumo do Grande Rio.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UTN.UR.RJ.000100-7.1 (Angra 1) e UTN.UR.RJ.000101-5.1 (Angra 2)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'Eletronuclear — Características Técnicas das Usinas',
            url: 'https://www.eletronuclear.gov.br/nossas-atividades/usinas-nucleares',
            accessedAt: '2026-09-25'
      }
],
    technicalDetails: {
      commissionYear: 1985,
      turbinesOrUnits: 'Angra 1 (640 MW - PWR Westinghouse) + Angra 2 (1.350 MW - PWR Siemens)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'eolica-alto-sertao',
    name: 'Complexo Eólico Alto Sertão (I, II e III)',
    type: 'eolica',
    capacityMW: 1055.2,
    cegs: ['EOL.CV.BA.030314-3.1', 'EOL.CV.BA.030315-1.1', 'EOL.CV.BA.030316-0.1', 'EOL.CV.BA.030317-8.1', 'EOL.CV.BA.030318-6.1', 'EOL.CV.BA.030319-4.1', 'EOL.CV.BA.030320-8.1', 'EOL.CV.BA.030321-6.1', 'EOL.CV.BA.030322-4.1', 'EOL.CV.BA.030323-2.1', 'EOL.CV.BA.030324-0.1', 'EOL.CV.BA.030328-3.1', 'EOL.CV.BA.030341-0.1', 'EOL.CV.BA.030342-9.1', 'EOL.CV.BA.030476-0.1', 'EOL.CV.BA.030490-5.1', 'EOL.CV.BA.030495-6.1', 'EOL.CV.BA.030506-5.1', 'EOL.CV.BA.030544-8.1', 'EOL.CV.BA.030546-4.1', 'EOL.CV.BA.030768-8.1', 'EOL.CV.BA.030776-9.1', 'EOL.CV.BA.030778-5.1', 'EOL.CV.BA.030779-3.1', 'EOL.CV.BA.030792-0.1', 'EOL.CV.BA.030793-9.1', 'EOL.CV.BA.030802-1.1', 'EOL.CV.BA.030803-0.1', 'EOL.CV.BA.030837-4.1', 'EOL.CV.BA.031402-1.1', 'EOL.CV.BA.031403-0.1', 'EOL.CV.BA.031404-8.1', 'EOL.CV.BA.031405-6.1', 'EOL.CV.BA.031406-4.1', 'EOL.CV.BA.031407-2.1', 'EOL.CV.BA.031418-8.1', 'EOL.CV.BA.031424-2.1', 'EOL.CV.BA.032090-0.1', 'EOL.CV.BA.032091-9.1', 'EOL.CV.BA.032093-5.1', 'EOL.CV.BA.032098-6.1', 'EOL.CV.BA.032101-0.1', 'EOL.CV.BA.032102-8.1', 'EOL.CV.BA.032104-4.1', 'EOL.CV.BA.032106-0.1', 'EOL.CV.BA.032108-7.1', 'EOL.CV.BA.032111-7.1', 'EOL.CV.BA.032113-3.1', 'EOL.CV.BA.032245-8.1', 'EOL.CV.BA.032362-4.1', 'EOL.CV.BA.032363-2.1', 'EOL.CV.BA.032364-0.1'],
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Caetité / Igaporã / Guanambi / Pindaí',
    operator: 'Auren Energia / Axia Energia / Renova Energia',
    coordinates: [-42.4800, -14.0700],
    description: 'Polo eólico pioneiro de alta densidade na serra baiana, integrando 52 parques de Alto Sertão I (294,4 MW — Brasil Ventos/Axia), Alto Sertão II (386,1 MW — Auren) e Alto Sertão III (374,7 MW — Renova).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 52 CEGs em operação de Alto Sertão I (14 parques), II (15 parques) e III (23 parques)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Auren Energia — Portfólio de Geração Eólica (Complexo Alto Sertão II)',
        url: 'https://www.aurenenergia.com.br/geracao-de-energia/',
        accessedAt: '2026-10-18'
      },
      {
        label: 'BNDES — Green Bond Report (Alto Sertão I, II e III)',
        url: 'https://web.bndes.gov.br/bib/jspui/bitstream/1408/14763/1/BNDES_Relatorio_Green_Bond_ingles_P_BD.pdf',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2012,
      turbinesOrUnits: '52 parques eólicos com aerogeradores GE / Alstom',
      gridConnectionVoltage: '230 kV ➔ 500 kV'
    }
  },
  {
    id: 'solar-janauba',
    name: 'Complexo Solar Janaúba',
    type: 'solar',
    capacityMW: 1000,
    cegs: ['UFV.RS.MG.040857-3.1', 'UFV.RS.MG.040858-1.1', 'UFV.RS.MG.040859-0.1', 'UFV.RS.MG.040860-3.1', 'UFV.RS.MG.040861-1.1', 'UFV.RS.MG.040862-0.1', 'UFV.RS.MG.040863-8.1', 'UFV.RS.MG.040864-6.1', 'UFV.RS.MG.040865-4.1', 'UFV.RS.MG.040866-2.1', 'UFV.RS.MG.040867-0.1', 'UFV.RS.MG.040868-9.1', 'UFV.RS.MG.040869-7.1', 'UFV.RS.MG.040870-0.1', 'UFV.RS.MG.040871-9.1', 'UFV.RS.MG.040872-7.1', 'UFV.RS.MG.040873-5.1', 'UFV.RS.MG.040874-3.1', 'UFV.RS.MG.040875-1.1', 'UFV.RS.MG.040876-0.1'],
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Janaúba (Norte de Minas)',
    operator: 'Elera Renováveis',
    coordinates: [-43.3089, -15.8028],
    description: 'Um dos maiores complexos solares fotovoltaicos do hemisfério sul, formado por 20 UFVs de 50 MW AC outorgados (1.000 MW AC / 1,2 GWp DC na Fase 1, expandido para 1,6 GWp com o cluster Irapuru).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 20 CEGs UFV.RS.MG.040857-3.1 a 040876-0.1 (Janaúba 1 a 20 — 20 x 50 MW AC)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Elera Renováveis — Complexo Solar Janaúba',
        url: 'https://elera.com/elera-conclui-a-expansao-de-janauba-maior-complexo-solar-do-hemisferio-sul-e-das-americas/',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2023,
      turbinesOrUnits: '20 UFVs de 50 MW AC (2,2 milhões de módulos bifaciais com trackers)',
      gridConnectionVoltage: '500 kV SE Janaúba 3'
    }
  },
  {
    id: 'termica-porto-sergipe',
    name: 'UTE Porto de Sergipe I',
    type: 'termica',
    capacityMW: 1593.2,
    cegs: ['UTE.GN.SE.032228-8.1'],
    subsystem: 'NE',
    state: 'SE',
    riverOrRegion: 'Barra dos Coqueiros',
    operator: 'Eneva',
    coordinates: [-36.9800, -10.8200],
    description: 'Maior termelétrica a gás natural da América Latina (1.593,2 MW outorgados / 1.515,6 MW fiscalizados). Opera em ciclo combinado (3 turbinas a gás + 1 a vapor) integrada a terminal de regaseificação de GNL oceânico.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UTE.GN.SE.032228-8.1 (Porto de Sergipe I — 1.593,2 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Eneva RI — Nossos Ativos (Complexo Porto de Sergipe)',
        url: 'https://ri.eneva.com.br/ativos/',
        accessedAt: '2026-10-18'
      }
    ],
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
    cegs: ['UHE.PH.SP.001120-7.1'],
    subsystem: 'SE/CO',
    state: 'SP',
    riverOrRegion: 'Rio Paraná (Ilha Solteira)',
    operator: 'Rio Paraná Energia S.A. (CTG Brasil)',
    coordinates: [-51.3378, -20.4306],
    description: 'Uma das maiores usinas inteiramente nacionais do país, opera em cascata com Três Irmãos e Jupiá, sustentando boa parte da carga do interior paulista e do Mato Grosso do Sul.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.SP.001120-7.1 (Ilha Solteira)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'CTG Brasil — Usina Hidrelétrica Ilha Solteira',
        url: 'https://ctgbr.com.br/portfolio/ilha-solteira/',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1978,
      turbinesOrUnits: '20 x 172,2 MW (Francis)',
      gridConnectionVoltage: '440 kV / 138 kV'
    }
  },
  {
    id: 'sobradinho',
    name: 'UHE Sobradinho',
    type: 'hidro',
    capacityMW: 1050.3,
    cegs: ['UHE.PH.BA.002755-3.1'],
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Rio São Francisco (Sobradinho)',
    operator: 'Chesf',
    coordinates: [-40.8253, -9.4306],
    description: 'Reservatório multianual que regula a vazão de todo o baixo São Francisco, viabilizando Paulo Afonso e Xingó a jusante — peça-chave da segurança hídrica e energética do semiárido nordestino.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.BA.002755-3.1 (Sobradinho)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.GO.002731-6.1'],
    subsystem: 'SE/CO',
    state: 'GO',
    riverOrRegion: 'Rio Tocantins (Minaçu)',
    operator: 'Furnas',
    coordinates: [-48.3167, -13.8500],
    description: 'Maior reservatório artificial do país em volume, funciona como uma bateria hídrica de longo prazo para o subsistema Sudeste/Centro-Oeste em anos secos.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.GO.002731-6.1 (Serra da Mesa)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.PR.000984-9.1'],
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (Pinhão/Bituruna)',
    operator: 'Copel GeT',
    coordinates: [-51.8867, -26.0272],
    description: 'Cabeça da cascata do Iguaçu, com uma das maiores barragens em altura da América do Sul — âncora do suprimento do sistema paranaense.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.PR.000984-9.1 (Gov. Bento Munhoz da Rocha Netto)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'Copel GeT — Usina Bento Munhoz (Foz do Areia)',
        url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1980,
      turbinesOrUnits: '4 x 419 MW (Francis)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'ita',
    name: 'UHE Itá',
    type: 'hidro',
    capacityMW: 1450,
    cegs: ['UHE.PH.RS.001152-5.1'],
    subsystem: 'S',
    state: 'SC',
    riverOrRegion: 'Rio Uruguai (Itá/Aratiba)',
    operator: 'Consórcio Itá (Engie/Copel/Celesc)',
    coordinates: [-52.3308, -27.2794],
    description: 'Principal usina da bacia do Uruguai na divisa SC/RS, com papel relevante no intercâmbio energético entre os estados do Sul.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.RS.001152-5.1 (Itá)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 1216,
    cegs: ['UHE.PH.MG.001007-3.1'],
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Rio Grande (São José da Barra)',
    operator: 'Furnas Centrais Elétricas',
    coordinates: [-46.3167, -20.6667],
    description: 'Uma das usinas pioneiras da interligação nacional — deu origem ao nome da estatal Furnas — e segue central no abastecimento do Sudeste.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.MG.001007-3.1 (Furnas)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 1440,
    cegs: ['UHE.PH.MG.001417-6.1'],
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Rio Grande (Fronteira/Icém)',
    operator: 'Axia Energia (Furnas)',
    coordinates: [-49.2000, -20.4000],
    description: 'Parte estratégica da cascata do Rio Grande na divisa MG/SP, reforça o corredor de escoamento entre o Triângulo Mineiro e o interior paulista com 8 turbinas Francis de 180 MW.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.MG.001417-6.1 (Marimbondo)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'Furnas / Axia Energia — Usina Hidrelétrica de Marimbondo',
        url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1975,
      turbinesOrUnits: '8 x 180 MW (Francis)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'salto-caxias',
    name: 'UHE Salto Caxias',
    type: 'hidro',
    capacityMW: 1240,
    cegs: ['UHE.PH.PR.002591-7.1'],
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (Nova Prata do Iguaçu)',
    operator: 'Copel GeT',
    coordinates: [-53.5000, -25.5500],
    description: 'Última grande usina da cascata do Iguaçu antes da fronteira com a Argentina, próxima à região das Cataratas.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.PR.002591-7.1 (Gov. José Richa / Salto Caxias)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.GO.002704-9.1'],
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Rio Paranaíba (divisa MG/GO)',
    operator: 'SPIC Brasil (UHE São Simão Energia S.A.)',
    coordinates: [-50.5000, -18.9833],
    description: 'Uma das maiores usinas inteiramente em território nacional na bacia do Paranaíba, ancorando o suprimento do Triângulo Mineiro e de Goiás. Concessão arrematada e operada pela SPIC Brasil.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.GO.002704-9.1 (São Simão)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'SPIC Brasil — Usina Hidrelétrica São Simão',
        url: 'https://spicbrasil.com.br/sao-simao/',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1978,
      turbinesOrUnits: '6 x 285 MW (Francis)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'lagoa-dos-ventos',
    name: 'Complexo Eólico Lagoa dos Ventos (Fases I e II)',
    type: 'eolica',
    capacityMW: 716.6,
    cegs: ['EOL.CV.PI.033005-1.1', 'EOL.CV.PI.033006-0.1', 'EOL.CV.PI.033007-8.1', 'EOL.CV.PI.033008-6.1', 'EOL.CV.PI.033009-4.1', 'EOL.CV.PI.033010-8.1', 'EOL.CV.PI.033011-6.1', 'EOL.CV.PI.033012-4.1', 'EOL.CV.PI.033013-2.1', 'EOL.CV.PI.033014-0.1', 'EOL.CV.PI.033015-9.1', 'EOL.CV.PI.033016-7.1', 'EOL.CV.PI.033017-5.1', 'EOL.CV.PI.033018-3.1', 'EOL.CV.PI.033019-1.1', 'EOL.CV.PI.033020-5.1', 'EOL.CV.PI.033021-3.1', 'EOL.CV.PI.033022-1.1', 'EOL.CV.PI.033023-0.1', 'EOL.CV.PI.033024-8.1', 'EOL.CV.PI.033025-6.1'],
    subsystem: 'NE',
    state: 'PI',
    riverOrRegion: 'Lagoa do Barro do Piauí / Queimada Nova / Dom Inocêncio',
    operator: 'Enel Green Power',
    coordinates: [-41.9000, -8.3500],
    description: 'Um dos maiores complexos eólicos da América Latina, formado nas Fases I e II por 21 parques Ventos de Santa Ângela (716,6 MW outorgados, expandidos na Fase III com mais 396 MW).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 21 CEGs EOL.CV.PI.033005-1.1 a 033025-6.1 (Ventos de Santa Ângela 01 a 21 — 716,55 MW)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Enel Green Power — Parque Eólico Lagoa dos Ventos',
        url: 'https://www.enelgreenpower.com/pt/nossos-projetos/highlights/parque-eolico-lagoa-dos-ventos',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2021,
      gridConnectionVoltage: '230 kV / 500 kV'
    }
  },
  {
    id: 'rio-do-vento',
    name: 'Complexo Eólico Rio do Vento',
    type: 'eolica',
    capacityMW: 1038.2,
    cegs: ['EOL.CV.RN.038310-4.1', 'EOL.CV.RN.038318-0.1', 'EOL.CV.RN.038319-8.1', 'EOL.CV.RN.038320-1.1', 'EOL.CV.RN.038321-0.1', 'EOL.CV.RN.038322-8.1', 'EOL.CV.RN.038323-6.1', 'EOL.CV.RN.040625-2.1', 'EOL.CV.RN.032593-7.1', 'EOL.CV.RN.033681-5.1', 'EOL.CV.RN.034937-2.1', 'EOL.CV.RN.033690-4.1', 'EOL.CV.RN.033691-2.1', 'EOL.CV.RN.045010-3.1', 'EOL.CV.RN.045011-1.1', 'EOL.CV.RN.045012-0.1'],
    subsystem: 'NE',
    state: 'RN',
    riverOrRegion: 'Caiçara do Rio do Vento / Riachuelo / Bento Fernandes / Ruy Barbosa / Lajes / São Tomé',
    operator: 'Casa dos Ventos',
    coordinates: [-36.2500, -5.6833],
    description: 'Um dos maiores clusters eólicos do planeta (1.038,2 MW em 16 parques Ventos de Santa Martina, Ventos de São Januário 23 e Ventos de Santa Leia), aproveitando os ventos alísios do interior potiguar.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 16 CEGs de Rio do Vento Fase I (504,0 MW) e Expansão (534,2 MW)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Casa dos Ventos — Complexo Eólico Rio do Vento e Expansão',
        url: 'https://casadosventos.com.br/en/the-casa-dos-ventos/rio-do-vento-expansion',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2021,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'osorio',
    name: 'Complexo Eólico de Osório',
    type: 'eolica',
    capacityMW: 317.9,
    cegs: ['EOL.CV.RS.028810-1.1', 'EOL.CV.RS.028811-0.1', 'EOL.CV.RS.028864-0.1', 'EOL.CV.RS.030286-4.1', 'EOL.CV.RS.030330-5.1', 'EOL.CV.RS.030381-0.1', 'EOL.CV.RS.030449-2.1', 'EOL.CV.RS.030734-3.1', 'EOL.CV.RS.030894-3.1'],
    subsystem: 'S',
    state: 'RS',
    riverOrRegion: 'Osório (Litoral Norte)',
    operator: 'Statkraft (Ventos do Sul / Ventos do Litoral / Ventos da Lagoa / Ventos dos Índios)',
    coordinates: [-50.2667, -29.8833],
    description: 'Marco pioneiro da energia eólica comercial no Brasil: inaugurado em 2006 com 150 MW (Osório, Sangradouro e Índios) e posteriormente expandido para 9 parques e 317,9 MW outorgados.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 9 CEGs em operação em Osório (Osório 1-3, Sangradouro 1-3 e Índios 1-3 — 317,9 MW)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Statkraft Brasil — Complexo Eólico de Osório',
        url: 'https://www.statkraft.com.br/onde-operamos/brasil/complexo-eolico-osorio/',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2006,
      gridConnectionVoltage: '230 kV / 69 kV'
    }
  },
  {
    id: 'pirapora',
    name: 'Complexo Solar Pirapora',
    type: 'solar',
    capacityMW: 329,
    cegs: ['UFV.RS.MG.032339-0.1', 'UFV.RS.MG.032340-3.1', 'UFV.RS.MG.032341-1.1', 'UFV.RS.MG.033185-6.1', 'UFV.RS.MG.033186-4.1', 'UFV.RS.MG.033187-2.1', 'UFV.RS.MG.033188-0.1', 'UFV.RS.MG.033189-9.1', 'UFV.RS.MG.033190-2.1', 'UFV.RS.MG.033192-9.1', 'UFV.RS.MG.033193-7.1'],
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Pirapora',
    operator: 'EDF Power Solutions (ex-Omega / Canadian Solar)',
    coordinates: [-44.9333, -17.3639],
    description: 'Um dos primeiros grandes complexos fotovoltaicos utility-scale do país, composto por 11 UFVs (Pirapora 2 a 7, 9 e 10 + Vazante 1 a 3), totalizando 329 MW outorgados (321 MW AC / ~400 MWp DC).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 11 CEGs (UFV Pirapora 2 a 7, 9 e 10 + UFV Vazante 1 a 3 — 329,0 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'EDF Power Solutions Brasil — Projetos Solares (Complexo Solar Pirapora)',
        url: 'https://brazil.edf-powersolutions.com/nossos-projetos/solares/',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2017,
      gridConnectionVoltage: '138 kV / 230 kV'
    }
  },
  {
    id: 'ituverava',
    name: 'Complexo Fotovoltaico Ituverava',
    type: 'solar',
    capacityMW: 196,
    cegs: ['UFV.RS.BA.032316-0.1', 'UFV.RS.BA.032317-9.1', 'UFV.RS.BA.032318-7.1', 'UFV.RS.BA.032319-5.1', 'UFV.RS.BA.032320-9.1', 'UFV.RS.BA.032321-7.1', 'UFV.RS.BA.032322-5.1'],
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Tabocas do Brejo Velho',
    operator: 'Enel Green Power',
    coordinates: [-43.4000, -13.1500],
    description: 'Pioneiro parque solar de larga escala no oeste baiano, formado por 7 UFVs (Ituverava 1 a 7) que somam 196 MW AC outorgados (254 MWp DC instalados).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 7 CEGs UFV.RS.BA.032316-0.1 a 032322-5.1 (Ituverava 1 a 7 — 196,0 MW AC)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Enel Brasil — Enel inicia operação do Parque Solar Ituverava (254 MWp / 196 MW AC)',
        url: 'https://www.enel.com.br/en/media/news/d201709-enel-operates-the-largest-solar-plants-in-south-america.html',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2017,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'norte-fluminense',
    name: 'UTE Norte Fluminense',
    type: 'termica',
    capacityMW: 826.8,
    cegs: ['UTE.GN.RJ.001544-0.1'],
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Macaé',
    operator: 'EDF Power Solutions (UTE Norte Fluminense S.A.)',
    coordinates: [-41.7833, -22.2833],
    description: 'Termelétrica a gás natural em ciclo combinado (826,8 MW outorgados / 869 MW fiscalizados) em Macaé, essencial para o suprimento da região metropolitana do Rio de Janeiro.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UTE.GN.RJ.001544-0.1 (Norte Fluminense — 826,78 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'EDF Power Solutions — UTE Norte Fluminense',
        url: 'https://brazil.edf-powersolutions.com/2025/11/07/edf-power-solutions-inaugura-planta-piloto-de-hidrogenio-na-usina-termeletrica-norte-fluminense/',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2004,
      gridConnectionVoltage: '345 kV'
    }
  },
  {
    id: 'teles-pires',
    name: 'UHE Teles Pires',
    type: 'hidro',
    capacityMW: 1819.8,
    cegs: ['UHE.PH.PA.030557-0.1'],
    subsystem: 'N',
    state: 'PA/MT',
    riverOrRegion: 'Rio Teles Pires (Paranaíta / Apiacás)',
    operator: 'CHTP — Cia Hidrelétrica Teles Pires (Neoenergia / Axia Energia)',
    coordinates: [-56.4744, -9.3444],
    description: 'Aproveitamento a fio d\'água de grande porte no Rio Teles Pires, escoando energia gerada na Amazônia Meridional para o Centro-Oeste e Sudeste.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.PA.030557-0.1 (Teles Pires)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'Neoenergia — UHE Teles Pires',
        url: 'https://www.neoenergia.com/nossos-negocios/geracao/hidreletricas/teles-pires/',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 2015,
      turbinesOrUnits: '5 x 363,96 MW (Francis)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'porto-primavera',
    name: 'UHE Porto Primavera (Eng. Sérgio Motta)',
    type: 'hidro',
    capacityMW: 1540,
    cegs: ['UHE.PH.SP.002127-0.1'],
    subsystem: 'SE/CO',
    state: 'SP/MS',
    riverOrRegion: 'Rio Paraná (Rosana / Batayporã)',
    operator: 'Auren Energia S.A.',
    coordinates: [-52.9556, -22.4833],
    description: 'Possui o mais extenso lago em barragem de terra do Brasil e a maior eclusa de navegação fluvial da Hidrovia Tietê-Paraná.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.SP.002127-0.1 (Porto Primavera / Engenheiro Sérgio Motta)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'Auren Energia — Usina Porto Primavera',
        url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
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
    cegs: ['UHE.PH.PR.002672-7.1'],
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (Saudade do Iguaçu)',
    operator: 'Engie Brasil',
    coordinates: [-52.6103, -25.6144],
    description: 'Segunda maior usina do Rio Iguaçu em capacidade, fundamental no suporte de potência e controle de frequência para os subsistemas Sul e Sudeste.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.PR.002672-7.1 (Salto Santiago)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.SC.001356-0.1'],
    subsystem: 'S',
    state: 'RS/SC',
    riverOrRegion: 'Rio Pelotas (Machadinho / Piratuba)',
    operator: 'Consórcio Machadinho (Engie Brasil)',
    coordinates: [-51.7889, -27.5306],
    description: 'Imponente usina de concreto compactado a rolo na divisa gaúcho-catarinense, integrando a cascata hidrelétrica da Bacia do Rio Uruguai.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.SC.001356-0.1 (Machadinho)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.MA.028863-2.1'],
    subsystem: 'N',
    state: 'MA/TO',
    riverOrRegion: 'Rio Tocantins (Estreito / Aguiarnópolis)',
    operator: 'CESTE (Engie / Vale / Alcoa)',
    coordinates: [-47.4528, -6.5417],
    description: 'Aproveitamento a fio d\'água no Médio Tocantins com turbinas tipo bulbo de grande vazão, suprindo a indústria mineral e a interligação regional.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.MA.028863-2.1 (Estreito)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.MG.027115-2.1'],
    subsystem: 'SE/CO',
    state: 'MG/GO',
    riverOrRegion: 'Rio Paranaíba (Araguari / Catalão)',
    operator: 'Cemig',
    coordinates: [-47.9861, -18.4417],
    description: 'Importante usina de cabeceira do Rio Paranaíba com grande reservatório de acumulação e regularização plurianual para o SIN.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.MG.027115-2.1 (Theodomiro Carneiro Santiago / Emborcação)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
    technicalDetails: {
      commissionYear: 1982,
      turbinesOrUnits: '4 x 298 MW (Francis)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'solar-futura',
    name: 'Complexo Solar Futura I',
    type: 'solar',
    capacityMW: 692.4,
    cegs: ['UFV.RS.BA.037479-2.1', 'UFV.RS.BA.037480-6.1', 'UFV.RS.BA.037481-4.1', 'UFV.RS.BA.037482-2.1', 'UFV.RS.BA.037483-0.1', 'UFV.RS.BA.037484-9.1', 'UFV.RS.BA.037485-7.1', 'UFV.RS.BA.037486-5.1', 'UFV.RS.BA.037487-3.1', 'UFV.RS.BA.037488-1.1', 'UFV.RS.BA.037489-0.1', 'UFV.RS.BA.037490-3.1', 'UFV.RS.BA.037491-1.1', 'UFV.RS.BA.037492-0.1', 'UFV.RS.BA.037493-8.1', 'UFV.RS.BA.037494-6.1', 'UFV.RS.BA.037495-4.1', 'UFV.RS.BA.037496-2.1', 'UFV.RS.BA.037497-0.1', 'UFV.RS.BA.037498-9.1', 'UFV.RS.BA.037499-7.1', 'UFV.RS.BA.037500-4.1'],
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Juazeiro',
    operator: 'Eneva',
    coordinates: [-40.5000, -9.6000],
    description: 'Um dos maiores complexos fotovoltaicos das Américas, formado por 22 UFVs (Futura 1 a 22) que somam 692,4 MW AC outorgados (852 MWp DC) com cerca de 1,4 milhão de módulos bifaciais em Juazeiro.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 22 CEGs UFV.RS.BA.037479-2.1 a 037500-4.1 (Futura 1 a 22 — 692,45 MW AC outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Eneva — Eneva dá início à operação do Complexo Solar Futura I na Bahia',
        url: 'https://www.eneva.com.br/imprensa/noticias/eneva-da-inicio-a-operacao-de-um-dos-maiores-complexos-solares-das-americas-futura-i-na-bahia/',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2023,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'solar-sao-goncalo',
    name: 'Complexo Solar São Gonçalo',
    type: 'solar',
    capacityMW: 790.4,
    cegs: ['UFV.RS.PI.033841-9.1', 'UFV.RS.PI.033842-7.1', 'UFV.RS.PI.033843-5.1', 'UFV.RS.PI.033844-3.1', 'UFV.RS.PI.033845-1.1', 'UFV.RS.PI.033846-0.1', 'UFV.RS.PI.033847-8.1', 'UFV.RS.PI.033849-4.1', 'UFV.RS.PI.037577-2.1', 'UFV.RS.PI.037578-0.1', 'UFV.RS.PI.037579-9.1', 'UFV.RS.PI.037581-0.1', 'UFV.RS.PI.037582-9.1', 'UFV.RS.PI.037584-5.1', 'UFV.RS.PI.037585-3.1', 'UFV.RS.PI.037586-1.1', 'UFV.RS.PI.037588-8.1', 'UFV.RS.PI.037589-6.1'],
    subsystem: 'NE',
    state: 'PI',
    riverOrRegion: 'São Gonçalo do Gurguéia',
    operator: 'Enel Green Power',
    coordinates: [-42.8500, -9.8000],
    description: 'Gigantesca instalação solar no semiárido piauiense composta por 18 UFVs em operação (790,4 MW AC outorgados / 864 MWp DC), pioneira em larga escala no uso de módulos bifaciais no Brasil.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 18 CEGs UFV São Gonçalo em operação (790,37 MW AC outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Enel Green Power — Parque Solar São Gonçalo',
        url: 'https://www.enelgreenpower.com/our-projects/highlights/sao-goncalo-solar-project',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2020,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'eolica-chafariz',
    name: 'Complexo Eólico Chafariz',
    type: 'eolica',
    capacityMW: 471.2,
    cegs: ['EOL.CV.PB.034639-0.1', 'EOL.CV.PB.034640-3.1', 'EOL.CV.PB.034642-0.1', 'EOL.CV.PB.034644-6.1', 'EOL.CV.PB.034646-2.1', 'EOL.CV.PB.035181-4.1', 'EOL.CV.PB.035184-9.1', 'EOL.CV.PB.035240-3.1', 'EOL.CV.PB.035241-1.1', 'EOL.CV.PB.035242-0.1', 'EOL.CV.PB.037952-2.1', 'EOL.CV.PB.037953-0.1', 'EOL.CV.PB.037958-1.1', 'EOL.CV.PB.038029-6.1', 'EOL.CV.PB.038030-0.1'],
    subsystem: 'NE',
    state: 'PB',
    riverOrRegion: 'Santa Luzia / Areia de Baraúnas / São José do Sabugi / São Mamede',
    operator: 'Neoenergia Renováveis',
    coordinates: [-36.8800, -6.8700],
    description: 'Polo eólico de alta produtividade no sertão paraibano composto por 15 parques (Chafariz 1 a 7, Canoas 2 a 4, Ventos de Arapuá 1 a 3 e Lagoa 3 e 4 — 471,2 MW) e 136 aerogeradores, conectado à SE Santa Luzia II (500 kV).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 15 CEGs do Complexo Eólico Chafariz (471,24 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Neoenergia — Complexo Renovável Neoenergia (Chafariz e Luzia)',
        url: 'https://www.neoenergia.com/w/complexo-renovavel-neoenergia-brasil-tem-o-primeiro-complexo-de-geracao-associada-de-energia',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2022,
      gridConnectionVoltage: '500 kV / 230 kV'
    }
  },
  {
    id: 'eolica-morro-do-chapeu',
    name: 'Complexo Eólico Morro do Chapéu Sul (I e II)',
    type: 'eolica',
    capacityMW: 524.8,
    cegs: ['EOL.CV.BA.032759-0.1', 'EOL.CV.BA.032884-7.1', 'EOL.CV.BA.033648-3.1', 'EOL.CV.BA.033649-1.1', 'EOL.CV.BA.033650-5.1', 'EOL.CV.BA.033652-1.1', 'EOL.CV.BA.034507-5.1', 'EOL.CV.BA.034508-3.1', 'EOL.CV.BA.034509-1.1', 'EOL.CV.BA.034511-3.1', 'EOL.CV.BA.034512-1.1', 'EOL.CV.BA.034513-0.1', 'EOL.CV.BA.034514-8.1', 'EOL.CV.BA.034661-6.1', 'EOL.CV.BA.034692-6.1'],
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Morro do Chapéu',
    operator: 'Enel Green Power',
    coordinates: [-41.1500, -11.5500],
    description: 'Situado nas cristas de altitude da Chapada Diamantina baiana, reúne 15 parques de Morro do Chapéu Sul I (172,0 MW) e Morro do Chapéu Sul II (352,8 MW), totalizando 524,8 MW.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 15 CEGs de Morro do Chapéu Sul I (6 parques) e II (9 parques Ventos de Santa Esperança — 524,8 MW)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Enel Brasil — Parque Eólico Morro do Chapéu Sul II inicia operação',
        url: 'https://www.enel.com.br/pt-saopaulo/midia/news/d202111-parque-eolico-morro-chapeu-sul-inicia-operacao.html',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2018,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'termica-gna-1',
    name: 'UTE GNA I (Gás Natural Açu)',
    type: 'termica',
    capacityMW: 1338.3,
    cegs: ['UTE.GN.RJ.032955-0.2'],
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Porto do Açu (São João da Barra)',
    operator: 'GNA (bp / Siemens / SPIC / Prumo)',
    coordinates: [-41.0500, -21.8333],
    description: 'Segunda maior termelétrica a gás natural do Brasil. Opera em ciclo combinado a partir de GNL recebido na FSRU do terminal portuário do Açu.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UTE.GN.RJ.032955-0.2 (GNA I / Novo Tempo)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 1886.1,
    cegs: ['UTE.GN.MA.030196-5.1', 'UTE.GN.MA.030202-3.1', 'UTE.GN.MA.030203-1.1', 'UTE.GN.MA.030800-5.1', 'UTE.GN.MA.031193-6.1', 'UTE.GN.MA.040562-0.1'],
    subsystem: 'NE',
    state: 'MA',
    riverOrRegion: 'Santo Antônio dos Lopes (Bacia do Parnaíba)',
    operator: 'Eneva',
    coordinates: [-44.6000, -4.8500],
    description: 'Pioneiro complexo integrado Reservoir-to-Wire (R2W) da América Latina: 6 usinas a gás natural em operação (Maranhão III, IV e V, Nova Venécia 2, Parnaíba IV e Parnaíba V — 1.886,1 MW outorgados) abastecidas pelos campos terrestres da Bacia do Parnaíba.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 6 CEGs em operação do Complexo Parnaíba (Parnaíba I-V — 1.886,06 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Eneva — Modelo Reservoir-to-Wire (Complexo Parnaíba)',
        url: 'https://www.eneva.com.br/pioneirismo/r2w-reservoir-to-wire/',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2013,
      turbinesOrUnits: 'Ciclos simples e combinados a gás natural (6 usinas em operação)',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'uhe-itumbiara',
    name: 'UHE Itumbiara',
    type: 'hidro',
    capacityMW: 2082,
    cegs: ['UHE.PH.MG.001194-0.1'],
    subsystem: 'SE/CO',
    state: 'MG/GO',
    riverOrRegion: 'Rio Paranaíba (Itumbiara / Araporã)',
    operator: 'Axia Energia (Furnas)',
    coordinates: [-49.2000, -18.4167],
    description: 'Maior hidrelétrica do complexo de Furnas em capacidade instalada e uma das maiores barragens de terra/enrocamento do mundo, chave para a regularização do Paranaíba.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.MG.001194-0.1 (Itumbiara)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'Furnas / Axia Energia — Usina Hidrelétrica de Itumbiara',
        url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
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
    capacityMW: 1551.2,
    cegs: ['UHE.PH.SP.001282-3.1'],
    subsystem: 'SE/CO',
    state: 'SP/MS',
    riverOrRegion: 'Rio Paraná (Castilho / Três Lagoas)',
    operator: 'Rio Paraná Energia S.A. (CTG Brasil)',
    coordinates: [-51.7778, -20.7833],
    description: 'Localizada no Rio Paraná logo a jusante da foz do Rio Tietê, opera em conjunto com Ilha Solteira no histórico Complexo de Urubupungá.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.SP.001282-3.1 (Jupiá / Engenheiro Souza Dias)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'CTG Brasil — Usina Hidrelétrica Jupiá',
        url: 'https://ctgbr.com.br/portfolio/jupia/',
        accessedAt: '2026-09-25'
      }
    ],
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
    capacityMW: 1479.6,
    cegs: ['UHE.PH.PE.001174-6.1'],
    subsystem: 'NE',
    state: 'PE/BA',
    riverOrRegion: 'Rio São Francisco (Petrolândia)',
    operator: 'Axia Energia (Chesf)',
    coordinates: [-38.3167, -9.1333],
    description: 'Aproveitamento central da Chesf no submédio São Francisco, cujo reservatório regulariza as vazões que seguem para o complexo de Paulo Afonso e Xingó.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UHE.PH.PE.001174-6.1 (Luiz Gonzaga / Itaparica)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-09-25'
      },
      {
        label: 'Chesf / Axia Energia — Usina Hidrelétrica Luiz Gonzaga',
        url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      commissionYear: 1988,
      turbinesOrUnits: '6 x 246,6 MW (Francis)',
      gridConnectionVoltage: '500 kV / 230 kV'
    }
  },
  {
    id: 'uhe-agua-vermelha',
    name: 'UHE Água Vermelha (José Ermírio de Moraes)',
    type: 'hidro',
    capacityMW: 1396.2,
    cegs: ['UHE.PH.MG.000041-8.1'],
    subsystem: 'SE/CO',
    state: 'SP/MG',
    riverOrRegion: 'Rio Grande (Ouroeste / Iturama)',
    operator: 'Auren Energia',
    coordinates: [-50.3444, -19.8667],
    description: 'Maior usina da bacia do Rio Grande, localizada próxima à confluência com o Rio Paranaíba para a formação do Rio Paraná.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.MG.000041-8.1 (Água Vermelha / José Ermírio de Moraes)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.PR.002715-4.1'],
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (Mangueirinha / Reserva do Iguaçu)',
    operator: 'Copel GeT',
    coordinates: [-52.1000, -25.7833],
    description: 'Usina de grande porte no médio Rio Iguaçu com imponente barragem de enrocamento com face de concreto de 145 metros de altura.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.PR.002715-4.1 (Gov. Ney Braga / Segredo)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 1103.7,
    cegs: ['UHE.PH.PR.002659-0.1'],
    subsystem: 'S',
    state: 'PR',
    riverOrRegion: 'Rio Iguaçu (São Jorge d\'Oeste / Quedas do Iguaçu)',
    operator: 'Engie Brasil',
    coordinates: [-53.0000, -25.5333],
    description: 'Elo intermediário estratégico na cascata do Iguaçu, situada a jusante de Salto Santiago e a montante de Salto Caxias.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.PR.002659-0.1 (Salto Osório)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
    technicalDetails: {
      commissionYear: 1975,
      turbinesOrUnits: '6 unidades Francis',
      gridConnectionVoltage: '525 kV / 230 kV'
    }
  },
  {
    id: 'uhe-lajeado',
    name: 'UHE Luís Eduardo Magalhães (Lajeado)',
    type: 'hidro',
    capacityMW: 902.5,
    cegs: ['UHE.PH.TO.001304-8.1'],
    subsystem: 'N',
    state: 'TO',
    riverOrRegion: 'Rio Tocantins (Miracema do Tocantins / Lajeado)',
    operator: 'Investco (EDP / CPFL / CELESC)',
    coordinates: [-48.3667, -9.7500],
    description: 'Aproveitamento central no Rio Tocantins próximo à capital Palmas, com turbinas Kaplan de alta vazão e canal de transposição hidroviário.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.TO.001304-8.1 (Luís Eduardo Magalhães / Lajeado)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.SC.027401-1.1'],
    subsystem: 'S',
    state: 'SC',
    riverOrRegion: 'Rio Canoas (Campos Novos / Celso Ramos)',
    operator: 'Enercan (CPFL / Votorantim / Celesc)',
    coordinates: [-51.3167, -27.6000],
    description: 'Possui uma das barragens de enrocamento com face de concreto mais altas do mundo (202 metros de altura), situada na bacia do Rio Uruguai.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.SC.027401-1.1 (Campos Novos)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 807.5,
    cegs: ['UHE.PH.SP.002873-8.1'],
    subsystem: 'SE/CO',
    state: 'SP',
    riverOrRegion: 'Rio Tietê (Pereira Barreto / Andradina)',
    operator: 'Tietê Energia',
    coordinates: [-51.3000, -20.6500],
    description: 'Última e maior usina da cascata do Rio Tietê antes da foz no Rio Paraná, interligada por canal navegável ao reservatório de Ilha Solteira.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.SP.002873-8.1 (Três Irmãos)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.PA.031444-7.1'],
    subsystem: 'N',
    state: 'MT/PA',
    riverOrRegion: 'Rio Teles Pires (Paranaíta / Jacareacanga)',
    operator: 'Empresa de Energia São Manoel (EDP / Furnas / CTG)',
    coordinates: [-57.1833, -9.1833],
    description: 'Localizada a jusante da UHE Teles Pires na fronteira do Mato Grosso com o Pará, opera a fio d\'água conectada ao sistema de transmissão 500 kV.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.PA.031444-7.1 (São Manoel)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.RS.027556-5.1'],
    subsystem: 'S',
    state: 'RS/SC',
    riverOrRegion: 'Rio Pelotas (Anita Garibaldi / Pinhal da Serra)',
    operator: 'BAESA (CPFL / Alcoa / Votorantim)',
    coordinates: [-51.1833, -27.7833],
    description: 'Barragem de 185 metros de altura na cabeceira do Rio Pelotas/Uruguai, escoando potência diretamente para as redes de 525 kV do Subsistema Sul.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.RS.027556-5.1 (Barra Grande)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UHE.PH.GO.000528-2.1'],
    subsystem: 'SE/CO',
    state: 'GO/MG',
    riverOrRegion: 'Rio Paranaíba (Cachoeira Dourada)',
    operator: 'Enel Green Power',
    coordinates: [-49.4833, -18.4833],
    description: 'Histórica usina projetada originalmente para viabilizar a construção e o pioneiro suprimento elétrico de Brasília nos anos 1950.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.GO.000528-2.1 (Cachoeira Dourada)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 643,
    cegs: ['UHE.PH.SP.000657-2.1'],
    subsystem: 'SE/CO',
    state: 'SP/PR',
    riverOrRegion: 'Rio Paranapanema (Taciba / Primeiro de Maio)',
    operator: 'CTG Brasil',
    coordinates: [-51.3500, -22.6500],
    description: 'Maior hidrelétrica da calha do Rio Paranapanema em capacidade nominal instalada, com vasto lago de acumulação e amortecimento.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.SP.000657-2.1 (Capivara / Mackenzie)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
    technicalDetails: {
      commissionYear: 1977,
      turbinesOrUnits: '4 unidades Francis',
      gridConnectionVoltage: '440 kV'
    }
  },
  {
    id: 'uhe-peixe-angical',
    name: 'UHE Peixe Angical',
    type: 'hidro',
    capacityMW: 498.8,
    cegs: ['UHE.PH.TO.028353-3.1'],
    subsystem: 'N',
    state: 'TO',
    riverOrRegion: 'Rio Tocantins (Peixe / São Salvador)',
    operator: 'Enerpeixe (EDP Brasil)',
    coordinates: [-48.6500, -12.2833],
    description: 'Aproveitamento a fio d\'água no Alto/Médio Tocantins, com turbinas tipo Kaplan operando sob baixas quedas e vazões sazonais elevadas.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.TO.028353-3.1 (Peixe Angical)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
    technicalDetails: {
      commissionYear: 2006,
      turbinesOrUnits: '3 unidades Kaplan',
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'uhe-tres-marias',
    name: 'UHE Três Marias (Bernardo Mascarenhas)',
    type: 'hidro',
    capacityMW: 396,
    cegs: ['UHE.PH.MG.027113-6.1'],
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Rio São Francisco (Três Marias)',
    operator: 'Cemig',
    coordinates: [-45.2600, -18.2100],
    description: 'A histórica caixa d\'água de cabeceira do Rio São Francisco, fundamental para a regularização plurianual da bacia e perenização até o Nordeste.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.MG.027113-6.1 (Três Marias / Bernardo Mascarenhas)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 249.8,
    cegs: ['UHE.PH.AM.000190-2.1'],
    subsystem: 'N',
    state: 'AM',
    riverOrRegion: 'Rio Uatumã (Presidente Figueiredo)',
    operator: 'Eletronorte',
    coordinates: [-59.4833, -1.9167],
    description: 'Construída na década de 1980 para abastecer Manaus em meio à floresta amazônica. Possui um dos maiores espelhos d\'água do país por MW instalado.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.AM.000190-2.1 (Balbina)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 216.8,
    cegs: ['UHE.PH.RO.002687-5.1'],
    subsystem: 'N',
    state: 'RO',
    riverOrRegion: 'Rio Jamari (Candeias do Jamari)',
    operator: 'Eletronorte',
    coordinates: [-63.4500, -8.7500],
    description: 'Primeira grande hidrelétrica de Rondônia, fundamental na formação da rede regional antes da chegada das megauzinas do Madeira.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UHE.PH.RO.002687-5.1 (Samuel)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
    technicalDetails: {
      commissionYear: 1989,
      turbinesOrUnits: '5 unidades Kaplan',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'eolica-serra-do-mel',
    name: 'Complexo Eólico Serra do Mel (Cluster Serra Branca)',
    type: 'eolica',
    capacityMW: 1047.7,
    cegs: ['EOL.CV.RN.030895-1.2', 'EOL.CV.RN.030902-8.2', 'EOL.CV.RN.030914-1.2', 'EOL.CV.RN.030915-0.2', 'EOL.CV.RN.031750-0.1', 'EOL.CV.RN.031757-8.1', 'EOL.CV.RN.031759-4.1', 'EOL.CV.RN.031765-9.1', 'EOL.CV.RN.033752-8.1', 'EOL.CV.RN.033753-6.1', 'EOL.CV.RN.036973-0.1', 'EOL.CV.RN.036974-8.1', 'EOL.CV.RN.036975-6.1', 'EOL.CV.RN.036976-4.1', 'EOL.CV.RN.036977-2.1', 'EOL.CV.RN.036979-9.1', 'EOL.CV.RN.036980-2.1', 'EOL.CV.RN.036981-0.1', 'EOL.CV.RN.036984-5.1', 'EOL.CV.RN.036985-3.1', 'EOL.CV.RN.038140-3.1', 'EOL.CV.RN.038141-1.1', 'EOL.CV.RN.038142-0.1', 'EOL.CV.RN.038143-8.1', 'EOL.CV.RN.038144-6.1', 'EOL.CV.RN.038325-2.1', 'EOL.CV.RN.038326-0.1', 'EOL.CV.RN.038327-9.1', 'EOL.CV.RN.040594-9.1', 'EOL.CV.RN.040595-7.1', 'EOL.CV.RN.040596-5.1', 'EOL.CV.RN.040597-3.1', 'EOL.CV.RN.040598-1.1'],
    subsystem: 'NE',
    state: 'RN',
    riverOrRegion: 'Serra do Mel',
    operator: 'Voltalia',
    coordinates: [-37.0300, -5.1700],
    description: 'Um dos maiores clusters eólicos integrados do mundo no município de Serra do Mel (33 parques: Vamcruz, Serra Pará, Vila Acre/RN/PI/SE e VSM 1 a 4 — 1.047,7 MW outorgados), beneficiado por ventos alísios constantes.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 33 CEGs em operação em Serra do Mel (1.047,66 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Voltalia — Relatório de Sustentabilidade / Cluster Serra Branca (Serra do Mel)',
        url: 'https://www.voltalia.com/static-files/67c005fe-f973-4c6d-bf08-cad0ce964c74',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2021,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'eolica-santa-vitoria',
    name: 'Complexo Eólico Chuí / Campos Neutrais',
    type: 'eolica',
    capacityMW: 582.8,
    cegs: ['EOL.CV.RS.030740-8.1', 'EOL.CV.RS.030741-6.1', 'EOL.CV.RS.030742-4.1', 'EOL.CV.RS.030745-9.1', 'EOL.CV.RS.030746-7.1', 'EOL.CV.RS.030747-5.1', 'EOL.CV.RS.030748-3.1', 'EOL.CV.RS.030749-1.1', 'EOL.CV.RS.030754-8.1', 'EOL.CV.RS.030755-6.1', 'EOL.CV.RS.030760-2.1', 'EOL.CV.RS.030767-0.1', 'EOL.CV.RS.030790-4.1', 'EOL.CV.RS.030791-2.1', 'EOL.CV.RS.030829-3.1', 'EOL.CV.RS.030844-7.1', 'EOL.CV.RS.031517-6.1', 'EOL.CV.RS.031539-7.1', 'EOL.CV.RS.031541-9.1', 'EOL.CV.RS.031557-5.1', 'EOL.CV.RS.031558-3.1', 'EOL.CV.RS.031559-1.1', 'EOL.CV.RS.031561-3.1', 'EOL.CV.RS.031578-8.1', 'EOL.CV.RS.031600-8.1', 'EOL.CV.RS.031601-6.1', 'EOL.CV.RS.031602-4.1', 'EOL.CV.RS.031610-5.1'],
    subsystem: 'S',
    state: 'RS',
    riverOrRegion: 'Santa Vitória do Palmar / Chuí',
    operator: 'Serena Energia (ex-Omega Energia)',
    coordinates: [-52.5500, -33.5200],
    description: 'Conjunto eólico mais meridional do Brasil na fronteira sul gaúcha junto à Lagoa Mirim, formado por 28 parques dos subcomplexos Geribatu (258 MW), Chuí (161,9 MW) e Hermenegildo (162,9 MW), totalizando 582,8 MW.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 28 CEGs do Complexo Chuí / Campos Neutrais (Geribatu, Chuí e Hermenegildo — 582,79 MW)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Eletrobras — Complexo Eólico Campos Neutrais (Geribatu, Chuí e Hermenegildo — 583 MW)',
        url: 'https://www.eletrobras.com/pt/Paginas/Noticia.aspx?ID=1442',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2015,
      gridConnectionVoltage: '525 kV'
    }
  },
  {
    id: 'eolica-ventos-araripe',
    name: 'Complexo Eólico Ventos do Araripe III',
    type: 'eolica',
    capacityMW: 357.9,
    cegs: ['EOL.CV.PE.031761-6.1', 'EOL.CV.PE.031762-4.1', 'EOL.CV.PE.031763-2.1', 'EOL.CV.PE.032365-9.1', 'EOL.CV.PE.031764-0.1', 'EOL.CV.PI.031746-2.2', 'EOL.CV.PI.031747-0.2', 'EOL.CV.PI.031766-7.1', 'EOL.CV.PI.031749-7.1', 'EOL.CV.PI.031767-5.1', 'EOL.CV.PI.032366-7.1', 'EOL.CV.PI.032367-5.1', 'EOL.CV.PI.033667-0.1', 'EOL.CV.PI.032368-3.1'],
    subsystem: 'NE',
    state: 'PI/PE',
    riverOrRegion: 'Chapada do Araripe (Simões / Curral Novo do Piauí / Araripina)',
    operator: 'Auren Energia (desenvolvido pela Casa dos Ventos)',
    coordinates: [-40.7500, -7.6500],
    description: 'Instalado no topo da Chapada do Araripe (900 m de altitude) na divisa PI/PE, reúne 14 parques (Ventos de Santo Estevão, Santo Augusto, Santo Onofre IV e São Virgílio) que somam 357,9 MW outorgados.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 14 CEGs de Ventos do Araripe III em PI e PE (357,90 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Auren Energia RI — Central de Resultados Ventos do Araripe III',
        url: 'https://ri.aurenenergia.com.br/informacoes-financeiras/central-de-resultados-ventos-do-araripe-lll/',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2017,
      gridConnectionVoltage: '230 kV / 500 kV'
    }
  },
  {
    id: 'eolica-coxilha-negra',
    name: 'Complexo Eólico Coxilha Negra',
    type: 'eolica',
    capacityMW: 302.4,
    cegs: ['EOL.CV.RS.032236-9.1', 'EOL.CV.RS.032237-7.1', 'EOL.CV.RS.033807-9.1'],
    subsystem: 'S',
    state: 'RS',
    riverOrRegion: 'Santana do Livramento (Fronteira Oeste)',
    operator: 'Axia Energia Sul (CGT Eletrosul)',
    coordinates: [-55.5300, -30.8500],
    description: 'Polo eólico estratégico nos pampas da fronteira Brasil-Uruguai, composto pelos parques Coxilha Negra 2 (100,8 MW), Coxilha Negra 3 (105,0 MW) e Coxilha Negra 4 (96,6 MW), totalizando 302,4 MW e 72 aerogeradores.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 3 CEGs EOL.CV.RS.032236-9.1, 032237-7.1 e 033807-9.1 (Coxilha Negra 2, 3 e 4 — 302,4 MW)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Axia Energia — Complexo Eólico Coxilha Negra (302,4 MW)',
        url: 'https://axia.com.br/w/complexo-eolico-coxilha-negra',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2024,
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'solar-mendubim',
    name: 'Complexo Solar Mendubim',
    type: 'solar',
    capacityMW: 452.6,
    cegs: ['UFV.RS.RN.037749-0.1', 'UFV.RS.RN.037750-3.1', 'UFV.RS.RN.037751-1.1', 'UFV.RS.RN.037752-0.1', 'UFV.RS.RN.037753-8.1', 'UFV.RS.RN.037754-6.1', 'UFV.RS.RN.037755-4.1', 'UFV.RS.RN.037769-4.1', 'UFV.RS.RN.037770-8.1', 'UFV.RS.RN.037771-6.1', 'UFV.RS.RN.037772-4.1', 'UFV.RS.RN.037773-2.1', 'UFV.RS.RN.037774-0.1'],
    subsystem: 'NE',
    state: 'RN',
    riverOrRegion: 'Açu',
    operator: 'Scatec / Equinor / Hydro Rein',
    coordinates: [-36.9100, -5.5800],
    description: 'Parque fotovoltaico de grande porte no polo de Açu formado por 13 UFVs (Mendubim I a XIII) que somam 452,6 MW AC outorgados (531 MWp DC), voltado à autoprodução industrial e mercado livre.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 13 CEGs UFV Mendubim I a XIII (452,59 MW AC outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Equinor Brasil — Complexo Solar Mendubim inicia operação comercial no RN',
        url: 'https://www.equinor.com.br/noticias/20240306-mendubim',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2024,
      gridConnectionVoltage: '230 kV / 500 kV'
    }
  },
  {
    id: 'solar-sol-do-sertao',
    name: 'Complexo Solar Sol do Sertão',
    type: 'solar',
    capacityMW: 415,
    cegs: ['UFV.RS.BA.032049-8.1', 'UFV.RS.BA.032050-1.1', 'UFV.RS.BA.032052-8.1', 'UFV.RS.BA.032053-6.1', 'UFV.RS.BA.032059-5.1', 'UFV.RS.BA.032065-0.1', 'UFV.RS.BA.032066-8.1', 'UFV.RS.BA.032067-6.1'],
    subsystem: 'NE',
    state: 'BA',
    riverOrRegion: 'Oliveira dos Brejinhos',
    operator: 'Essentia Energia (Pátria Investimentos)',
    coordinates: [-42.8900, -12.3100],
    description: 'Mega empreendimento fotovoltaico no oeste baiano formado por 8 UFVs (415,0 MW AC outorgados / 474 MWp DC), conectado à SE Bom Jesus da Lapa II.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 8 CEGs das SPEs Sol do Sertão OB I, II e III em Oliveira dos Brejinhos (415,0 MW AC)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'BNDES — Relatório Anual (Financiamento do Complexo Solar Sol do Sertão — 415 MW AC / 474 MWp)',
        url: 'https://web.bndes.gov.br/bib/jspui/bitstream/1408/20901/1/BNDES_RA2020.pdf',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2021,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'solar-lar-do-sol',
    name: 'Complexo Solar Lar do Sol',
    type: 'solar',
    capacityMW: 495,
    cegs: ['UFV.RS.MG.037830-5.1', 'UFV.RS.MG.037831-3.1', 'UFV.RS.MG.037832-1.1', 'UFV.RS.MG.037833-0.1', 'UFV.RS.MG.037834-8.1', 'UFV.RS.MG.037835-6.1', 'UFV.RS.MG.037836-4.1', 'UFV.RS.MG.037837-2.1', 'UFV.RS.MG.037838-0.1', 'UFV.RS.MG.037839-9.1'],
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Pirapora',
    operator: 'Atlas Renewable Energy',
    coordinates: [-44.9500, -17.4000],
    description: 'Expansão do polo solar do Médio São Francisco em Pirapora, composto por 10 UFVs (Lar do Sol 1 a 10) de 49,5 MW AC cada, somando 495 MW AC outorgados (~598 MWp DC) voltados à autoprodução industrial.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 10 CEGs UFV.RS.MG.037830-5.1 a 037839-9.1 (Lar do Sol 1 a 10 — 495,0 MW AC)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Atlas Renewable Energy — Planta Solar Lar do Sol (Minas Gerais)',
        url: 'https://pt.atlasrenewableenergy.com/proyectos/planta-solar-lar-do-sol-minas-gerais-brasil/',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2023,
      gridConnectionVoltage: '230 kV / 500 kV'
    }
  },
  {
    id: 'solar-arinos',
    name: 'Complexo Solar Arinos',
    type: 'solar',
    capacityMW: 336.8,
    cegs: ['UFV.RS.MG.047299-9.1', 'UFV.RS.MG.047301-4.1', 'UFV.RS.MG.047302-2.1', 'UFV.RS.MG.047303-0.1', 'UFV.RS.MG.047314-6.1', 'UFV.RS.MG.047315-4.1', 'UFV.RS.MG.047316-2.1'],
    subsystem: 'SE/CO',
    state: 'MG',
    riverOrRegion: 'Arinos (Noroeste de MG)',
    operator: 'Newave Energia / Gerdau',
    coordinates: [-46.1000, -15.9100],
    description: 'Parque fotovoltaico no Noroeste Mineiro composto por 7 UFVs (Arinos 3, 5 a 7 e 18 a 20) de 48,12 MW AC cada, somando 336,8 MW AC outorgados (~421 MWp DC) dedicados à autoprodução siderúrgica e mercado livre.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 7 CEGs de Usina Solar Arinos SPE S.A. (Arinos 3, 5, 6, 7, 18, 19 e 20 — 336,83 MW AC)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'EPE — Relatório EPE-DEE-RE-076/2022-r0 (Garantia Física das UFVs Arinos 3, 5 a 7 e 18 a 20)',
        url: 'https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-522/topico-546/EPE-DEE-RE-076-2022-r0_CalcGF_ACL_Arinos%203,%205%20a%207%20e%2018%20a%2020.pdf',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2024,
      gridConnectionVoltage: '500 kV'
    }
  },
  {
    id: 'termica-termomacao',
    name: 'UTE Termomacaé (Mário Lago)',
    type: 'termica',
    capacityMW: 900,
    cegs: ['UTE.GN.RJ.028029-1.1'],
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Macaé',
    operator: 'Petrobras',
    coordinates: [-41.8000, -22.3500],
    description: 'Uma das maiores termelétricas a gás natural em ciclo aberto do país (900 MW outorgados / 922,6 MW fiscalizados em 20 turbinas aeroderivadas), oferecendo partida rápida e suporte de ponta ao Sudeste.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UTE.GN.RJ.028029-1.1 (Mário Lago / Termomacaé — 900,0 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Petrobras — Ativos de Gás e Energia (UTE Termomacaé / Mário Lago)',
        url: 'https://petrobras.com.br/quem-somos/gas',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2001,
      turbinesOrUnits: '20 turbogeradores aeroderivados GE LM6000 (ciclo simples)',
      gridConnectionVoltage: '345 kV'
    }
  },
  {
    id: 'termica-jorge-lacerda',
    name: 'Complexo Termelétrico Jorge Lacerda',
    type: 'termica',
    capacityMW: 740,
    cegs: ['UTE.CM.SC.001260-2.1', 'UTE.CM.SC.027093-8.1', 'UTE.CM.SC.027094-6.1'],
    subsystem: 'S',
    state: 'SC',
    riverOrRegion: 'Capivari de Baixo',
    operator: 'Diamante Geração de Energia',
    coordinates: [-49.0000, -28.4500],
    description: 'Maior complexo termelétrico a carvão mineral da América Latina, integrado pelas usinas Jorge Lacerda I e II (190 MW outorgados vigentes), III (220 MW) e IV (330 MW), totalizando 740 MW outorgados vigentes (857 MW instalados históricos).',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — 3 CEGs UTE.CM.SC.001260-2.1, 027093-8.1 e 027094-6.1 (Jorge Lacerda I/II, III e IV — 740,0 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Diamante Geração de Energia — Complexo Termelétrico Jorge Lacerda',
        url: 'https://www.diamanteenergia.com/pt/untitled/pages-header/complexo-termeletrico-jorge-lacerda',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 1965,
      turbinesOrUnits: 'Unidades a vapor (UTLA, UTLB e UTLC)',
      gridConnectionVoltage: '230 kV / 138 kV'
    }
  },
  {
    id: 'termica-maua-3',
    name: 'UTE Mauá 3',
    type: 'termica',
    capacityMW: 590.8,
    cegs: ['UTE.GN.AM.031888-4.1'],
    subsystem: 'N',
    state: 'AM',
    riverOrRegion: 'Manaus (Distrito Industrial)',
    operator: 'Eletrobras Amazonas GT',
    coordinates: [-59.9500, -3.1333],
    description: 'Principal termelétrica de base de Manaus, alimentada por gás natural do gasoduto Urucu-Coari-Manaus no coração da Amazônia.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UTE.GN.AM.031888-4.1 (Mauá 3)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UTE.GN.RJ.030769-6.1'],
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Seropédica',
    operator: 'Petrobras',
    coordinates: [-43.7000, -22.7500],
    description: 'Localizada no nó logístico do Arco Metropolitano do RJ, gera energia em ciclo combinado a partir de gás natural entregue pelo Gasduc.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UTE.GN.RJ.030769-6.1 (Baixada Fluminense)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 529.2,
    cegs: ['UTE.GN.MT.027003-2.1'],
    subsystem: 'SE/CO',
    state: 'MT',
    riverOrRegion: 'Cuiabá',
    operator: 'Âmbar Energia',
    coordinates: [-56.0500, -15.6500],
    description: 'Conectada ao gasoduto lateral Bolívia-Mato Grosso, crucial para a estabilidade elétrica e controle de tensão no Centro-Oeste.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UTE.GN.MT.027003-2.1 (Cuiabá / Mário Covas)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    cegs: ['UTE.GN.RJ.027243-4.1'],
    subsystem: 'SE/CO',
    state: 'RJ',
    riverOrRegion: 'Rio de Janeiro (Zona Oeste / Santa Cruz)',
    operator: 'Eletrobras Furnas',
    coordinates: [-43.6833, -22.9167],
    description: 'Histórica usina termelétrica da Baía de Sepetiba, modernizada para ciclo combinado a gás natural para segurança de suprimento da cidade do Rio.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UTE.GN.RJ.027243-4.1 (Santa Cruz)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 550,
    cegs: ['UTE.GN.PE.028031-3.1'],
    subsystem: 'NE',
    state: 'PE',
    riverOrRegion: 'Complexo Industrial e Portuário de Suape (Ipojuca)',
    operator: 'Neoenergia',
    coordinates: [-35.0000, -8.4000],
    description: 'Instalada no Complexo de Suape, gera eletricidade em ciclo combinado a gás natural (550 MW outorgados / 532,9 MW fiscalizados) para abastecimento do litoral e polo industrial pernambucano.',
    verification: 'verified',
    sources: [
      {
        label: 'ANEEL SIGA — CEG UTE.GN.PE.028031-3.1 (Termopernambuco — 550,0 MW outorgados)',
        url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
        accessedAt: '2026-10-18'
      },
      {
        label: 'Neoenergia — Termopernambuco (Complexo Industrial de Suape)',
        url: 'https://www.neoenergia.com/w/termopernambuco-realiza-parada-anual-de-manutencao-em-tempo-recorde',
        accessedAt: '2026-10-18'
      }
    ],
    technicalDetails: {
      commissionYear: 2004,
      turbinesOrUnits: '2 turbinas a gás + 1 a vapor (GE / Alstom)',
      gridConnectionVoltage: '230 kV'
    }
  },
  {
    id: 'termica-candiota-3',
    name: 'UTE Candiota III (Fase C)',
    type: 'termica',
    capacityMW: 350,
    cegs: ['UTE.CM.RS.029767-4.1'],
    subsystem: 'S',
    state: 'RS',
    riverOrRegion: 'Candiota / Campanha Gaúcha',
    operator: 'Âmbar Energia',
    coordinates: [-53.7200, -31.5500],
    description: 'Situada na maior jazida de carvão mineral a céu aberto do país, concebida para suprimento de base na fronteira sul do SIN.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UTE.CM.RS.029767-4.1 (Candiota III / Fase C)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
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
    capacityMW: 73,
    cegs: ['UTE.AI.SP.026874-7.1'],
    subsystem: 'SE/CO',
    state: 'SP',
    riverOrRegion: 'Pradópolis (Ribeirão Preto)',
    operator: 'Usina São Martinho',
    coordinates: [-48.0667, -21.3667],
    description: 'Cogeração a bagaço de cana na usina de Pradópolis: queima o resíduo da moagem e exporta o excedente para a rede durante a safra, que coincide com o período seco dos reservatórios.',
    verification: 'verified',
    sources: [
      {
            label: 'ANEEL SIGA — CEG UTE.AI.SP.026874-7.1 (São Martinho, Pradópolis)',
            url: 'https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel',
            accessedAt: '2026-09-25'
      },
      {
            label: 'ONS — Cadastro de Capacidade de Geração',
            url: 'https://dados.ons.org.br/dataset/capacidade-geracao',
            accessedAt: '2026-09-25'
      }
],
    technicalDetails: {
      commissionYear: 2009,
      turbinesOrUnits: 'Caldeiras de alta pressão e turbogeradores a vapor',
      gridConnectionVoltage: '138 kV'
    }
  }
];
