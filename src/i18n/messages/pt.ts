import type { SectionId } from '../../components/System/sections';
import type { GenerationMixId } from '../../data/gridData';
import type { SubsystemCode } from '../../data/interchangeData';

export const pt = {
  meta: {
    title: 'Brasil Grid — Sistema Interligado Nacional (SIN)'
  },
  language: {
    label: 'Idioma'
  },
  header: {
    views: { mapa: 'Mapa', sistema: 'Sistema' },
    toggleSidebar: 'Alternar menu lateral',
    loadTitle: (source: string) => `Carga global do SIN na última meia hora (${source})`,
    referenceSnapshot: 'snapshot de referência',
    referenceShort: 'ref.',
    refresh: 'Atualizar telemetria'
  },
  bottomBar: {
    interchanges: 'Intercâmbios',
    renewable: 'Renovável',
    renewableTitle: 'Fração renovável do snapshot de referência do SIN',
    mix: 'Matriz',
    mixTitle: 'Composição da matriz elétrica nacional',
    mixSources: {
      hidraulica: 'Hidráulica',
      eolica: 'Eólica',
      solar: 'Solar Fotov.',
      termica: 'Térmica/Gás',
      biomassa: 'Biomassa',
      nuclear: 'Nuclear'
    } satisfies Record<GenerationMixId, string>
  },
  legend: {
    title: 'Legenda',
    open: 'Abrir legenda do mapa',
    close: 'Fechar legenda',
    transmission: 'Transmissão',
    hvdc: 'CC ±800 / ±600 kV',
    bulk: 'CA 765 / 500–525 kV',
    bulkTag: 'Rede básica',
    regional: 'CA 440 / 230 kV',
    regionalTag: 'Regional',
    generation: 'Geração',
    hydro: 'Hidro (UHE)',
    solar: 'Solar (UFV)',
    wind: 'Eólica (EOL)',
    nuclear: 'Nuclear (UTN)',
    thermal: 'Térmica / Biomassa (UTE)',
    subsystems: '4 subsistemas ONS (SE/CO, S, NE, N)'
  },
  sidebar: {
    title: 'Painel do SIN',
    transmission: 'Transmissão',
    allLines: 'Todas',
    allLinesAria: 'Filtrar todas as linhas',
    hvdcAria: 'Filtrar bipolos HVDC em Corrente Contínua (±800 kV e ±600 kV)',
    above500Aria: 'Filtrar linhas de 500 kV ou superior',
    generationSource: 'Fonte de geração',
    plantTypes: {
      all: 'Todas',
      hidro: 'Hidro',
      solar: 'Solar',
      eolica: 'Eólica',
      nuclear: 'Nuclear',
      termica: 'Térmica'
    },
    filterSourceAria: (label: string) => `Filtrar fonte ${label}`,
    subsystemBoundaries: 'Limites dos 4 subsistemas',
    toggleSubsystems: 'Alternar subsistemas',
    details: 'Detalhes',
    interchanges: 'Intercâmbios',
    interchangesHint: '· fluxo de referência / limite',
    plants: (count: number) => `Usinas (${count})`,
    lines: (count: number) => `Linhas (${count})`,
    noPlants: 'Nenhuma usina com os filtros atuais.',
    noLines: 'Nenhuma linha com a tensão selecionada.'
  },
  inspector: {
    back: 'Voltar',
    backAria: 'Voltar para a lista',
    copied: 'Copiado',
    copyLink: 'Copiar link direto para este ativo',
    close: 'Fechar painel',
    subsystem: 'Subsistema',
    unverified: 'Não auditada: aguardando fonte primária',
    unverifiedTitle: 'Dados cadastrais aguardando auditoria de link profundo com fonte primária',
    capacity: 'Potência outorgada',
    operator: 'Operador',
    riverOrRegion: 'Rio / região',
    commissioning: 'Comissionamento',
    connectionVoltage: 'Tensão de conexão',
    units: 'Unidades geradoras',
    flowOrHead: 'Vazão / queda',
    dc: 'Corrente contínua (HVDC)',
    ac: 'Corrente alternada',
    length: 'Extensão',
    from: 'Origem',
    to: 'Destino',
    concessionaire: 'Concessionária',
    towers: 'Torres',
    technology: 'Tecnologia',
    substations: 'Subestações'
  },
  sources: {
    title: 'Fontes'
  },
  map: {
    subsystemNames: {
      SE_CO: 'Sudeste / Centro-Oeste',
      S: 'Sul',
      NE: 'Nordeste',
      N: 'Norte'
    } satisfies Record<SubsystemCode, string>,
    currentDemand: 'Demanda atual:',
    dailyPeak: 'Pico diário:',
    distributedSolar: 'Solar GD (MMGD):',
    states: 'Estados:',
    loadShare: 'Participação na carga:'
  },
  system: {
    loading: 'Carregando…',
    groups: { operacao: 'Operação', mercado: 'Mercado', referencia: 'Referência' },
    sections: {
      intercambios: 'Intercâmbios',
      simulador: 'Simulador 60 Hz',
      preco: 'Preço',
      cadeia: 'Cadeia de valor do SEB',
      dossies: 'Dossiês do SIN',
      escalas: 'Régua de grandezas'
    } satisfies Record<SectionId, string>,
    portugueseOnly: ''
  }
};

export type Messages = typeof pt;
