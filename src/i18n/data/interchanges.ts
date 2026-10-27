import type { InterchangeId, RegionalInterchange } from '../../data/interchangeData';
import type { Lang } from '../language';

type InterchangeText = Pick<RegionalInterchange, 'name' | 'fromName' | 'toName' | 'mainLines' | 'bottleneck'>;

const INTERCHANGES_EN: Record<InterchangeId, InterchangeText> = {
  NE_SECO: {
    name: 'Northeast → Southeast / Center-West interface',
    fromName: 'Northeast',
    toName: 'Southeast / Center-West',
    mainLines: [
      '500 kV TL Bom Jesus da Lapa II – Rio das Éguas',
      '500 kV TL Poções III – Padre Bernardo',
      '500 kV TL Morro do Chapéu II – Poções III',
      '500 kV TL Rio das Éguas – Luziânia'
    ],
    bottleneck: {
      cause: 'Thermal capacity saturation on the 500 kV trunks in Bahia and Minas Gerais, combined with transient angle stability limits and the voltage stability margin (P-V curve) under N-1 contingency.',
      consequences: 'Heavy curtailment (constrained-off) of wind and solar PV plants in peak generation hours (11:00 to 15:00 for solar; 18:00 to 22:00 for wind), spilling clean energy that has zero fuel cost.',
      mitigation: 'New 500 kV corridors already auctioned (Lots 1 and 2 of the ONS/ANEEL transmission auctions), synchronous condensers at strategic Northeast substations to support short-circuit strength, and utility-scale BESS (battery storage).',
      technicalStandard: 'ONS Grid Procedures — Submodule 23.3 (Stability Criteria and Interchange Limits; PAR/PEL 2024–2028 envelopes).'
    }
  },
  N_SECO: {
    name: 'North → Southeast / Center-West interface',
    fromName: 'North',
    toName: 'Southeast / Center-West',
    mainLines: [
      'Bipole 1 UHVDC ±800 kV Xingu – Estreito (4,000 MW)',
      'Bipole 2 UHVDC ±800 kV Xingu – Terminal Rio (4,000 MW)',
      '500 kV TL Tucuruí – Miracema – Gurupi – Serra da Mesa',
      '500 kV TL Xingu – Serra Pelada – Marabá'
    ],
    bottleneck: {
      cause: 'Maximum conversion capacity of the rectifier/inverter stations of the two Belo Monte UHVDC bipoles, and transient stability limits on the 500 kV AC grid on a bipole loss (N-2 of 4,000 MW, tripping ERAC under-frequency load shedding).',
      consequences: 'In the Amazon wet season (February to May) Belo Monte reaches 11,000 MW; if the bipoles are restricted or their thyristor valves are under maintenance, water that could be turbined is spilled.',
      mitigation: 'Active power modulation on the HVDC converters, power oscillation damping (POD) for inter-area modes, and a planned third transmission link.',
      technicalStandard: 'ONS Grid Procedures — Submodule 23.4 (Operation of DC Bipoles).'
    }
  },
  N_NE: {
    name: 'North ↔ Northeast interface',
    fromName: 'North',
    toName: 'Northeast',
    mainLines: [
      '500 kV TL Imperatriz – Presidente Dutra (C1, C2, C3)',
      '500 kV TL Presidente Dutra – Teresina II',
      '500 kV TL Marabá – Imperatriz'
    ],
    bottleneck: {
      cause: 'Strong seasonal reversal: in the first half of the year the North exports hydro at full output (Tucuruí/Belo Monte) to the Northeast; in the second half the flow reverses and the Northeast exports bulk wind to cover the dry season on the Amazon rivers.',
      consequences: 'Angle instability between the wind farms in Piauí/Maranhão and the Tocantins hydro plants during switching or contingencies at the Presidente Dutra substation.',
      mitigation: 'Fixed series compensation (FSC) on the 500 kV lines and automatic voltage control to absorb capacitive reactive power at light load.',
      technicalStandard: 'ONS Grid Procedures — North–Northeast Interconnection Operating Guidelines.'
    }
  },
  S_SECO: {
    name: 'South ↔ Southeast / Center-West interface',
    fromName: 'South',
    toName: 'Southeast / Center-West',
    mainLines: [
      '500 kV TL Itá – Nova Santa Rita',
      '500 kV TL Salto Caxias – Cascavel Oeste',
      '500 kV TL Foz do Areia – Curitiba – Bateias',
      '500 kV TL Ivaiporã – Londrina – Araraquara'
    ],
    bottleneck: {
      cause: 'South–Southeast inter-area electromechanical oscillation mode (0.2 to 0.4 Hz), thermal loading limits on the Paraná corridors, and voltage limits in the SP/PR triangle under contingency.',
      consequences: 'Caps the export of surplus from the Iguaçu and Uruguay basins during floods in the South, or the thermal/hydro support the Southeast can send during severe droughts in Rio Grande do Sul.',
      mitigation: 'Power system stabilizers (PSS) tuned on the large hydro plants (Itaipu, Salto Caxias, Segredo, Itá) to damp oscillations, and new 500 kV circuits linking Paraná to São Paulo.',
      technicalStandard: 'ONS Grid Procedures — Submodule 23.5 (South–Southeast Interconnection).'
    }
  }
};

export const localizeInterchange = (interchange: RegionalInterchange, lang: Lang): RegionalInterchange =>
  lang === 'pt' ? interchange : { ...interchange, ...INTERCHANGES_EN[interchange.id] };
