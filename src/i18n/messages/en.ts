import type { Messages } from './pt';

export const en: Messages = {
  meta: {
    title: "Brasil Grid — Brazil's National Interconnected System (SIN)"
  },
  language: {
    label: 'Language'
  },
  header: {
    views: { mapa: 'Map', sistema: 'System' },
    toggleSidebar: 'Toggle side panel',
    loadTitle: (source: string) => `SIN total load over the last half hour (${source})`,
    referenceSnapshot: 'reference snapshot',
    referenceShort: 'ref.',
    refresh: 'Refresh telemetry'
  },
  bottomBar: {
    interchanges: 'Interchanges',
    renewable: 'Renewable',
    renewableTitle: 'Renewable share in the SIN reference snapshot',
    mix: 'Mix',
    mixTitle: 'National electricity mix',
    mixSources: {
      hidraulica: 'Hydro',
      eolica: 'Wind',
      solar: 'Solar PV',
      termica: 'Thermal/Gas',
      biomassa: 'Biomass',
      nuclear: 'Nuclear'
    }
  },
  legend: {
    title: 'Legend',
    open: 'Open map legend',
    close: 'Close legend',
    transmission: 'Transmission',
    hvdc: 'DC ±800 / ±600 kV',
    bulk: 'AC 765 / 500–525 kV',
    bulkTag: 'Bulk grid',
    regional: 'AC 440 / 230 kV',
    regionalTag: 'Regional',
    generation: 'Generation',
    hydro: 'Hydro (UHE)',
    solar: 'Solar (UFV)',
    wind: 'Wind (EOL)',
    nuclear: 'Nuclear (UTN)',
    thermal: 'Thermal / Biomass (UTE)',
    subsystems: '4 ONS subsystems (SE/CO, S, NE, N)'
  },
  sidebar: {
    title: 'SIN panel',
    transmission: 'Transmission',
    allLines: 'All',
    allLinesAria: 'Show all lines',
    hvdcAria: 'Show HVDC bipoles (±800 kV and ±600 kV)',
    above500Aria: 'Show lines at 500 kV and above',
    generationSource: 'Generation source',
    plantTypes: {
      all: 'All',
      hidro: 'Hydro',
      solar: 'Solar',
      eolica: 'Wind',
      nuclear: 'Nuclear',
      termica: 'Thermal'
    },
    filterSourceAria: (label: string) => `Filter by source: ${label}`,
    subsystemBoundaries: '4 subsystem boundaries',
    toggleSubsystems: 'Toggle subsystems',
    details: 'Details',
    interchanges: 'Interchanges',
    interchangesHint: '· reference flow / limit',
    plants: (count: number) => `Plants (${count})`,
    lines: (count: number) => `Lines (${count})`,
    noPlants: 'No plants match the current filters.',
    noLines: 'No lines at the selected voltage.'
  },
  inspector: {
    back: 'Back',
    backAria: 'Back to the list',
    copied: 'Copied',
    copyLink: 'Copy direct link to this asset',
    close: 'Close panel',
    subsystem: 'Subsystem',
    unverified: 'Unaudited: awaiting primary source',
    unverifiedTitle: 'Registry data awaiting a deep-link audit against a primary source',
    capacity: 'Licensed capacity',
    operator: 'Operator',
    riverOrRegion: 'River / region',
    commissioning: 'Commissioning',
    connectionVoltage: 'Grid connection voltage',
    units: 'Generating units',
    flowOrHead: 'Flow / head',
    dc: 'Direct current (HVDC)',
    ac: 'Alternating current',
    length: 'Length',
    from: 'From',
    to: 'To',
    concessionaire: 'Concessionaire',
    towers: 'Towers',
    technology: 'Technology',
    substations: 'Substations'
  },
  sources: {
    title: 'Sources'
  },
  map: {
    subsystemNames: {
      SE_CO: 'Southeast / Center-West',
      S: 'South',
      NE: 'Northeast',
      N: 'North'
    },
    currentDemand: 'Current demand:',
    dailyPeak: 'Daily peak:',
    distributedSolar: 'Distributed solar (MMGD):',
    states: 'States:',
    loadShare: 'Load share:'
  },
  system: {
    loading: 'Loading…',
    groups: { operacao: 'Operation', mercado: 'Market', referencia: 'Reference' },
    sections: {
      intercambios: 'Interchanges',
      simulador: '60 Hz simulator',
      preco: 'Price',
      cadeia: 'Power sector value chain',
      dossies: 'SIN dossiers',
      escalas: 'Scale of magnitudes'
    },
    portugueseOnly: 'This section is in Portuguese for now. English version in progress.'
  }
};
