import { powerVsEnergyExplainer, type ScaleLevel } from '../../data/scaleData';
import type { Lang } from '../language';

export type ScaleText = Pick<ScaleLevel, 'name' | 'factor' | 'concept' | 'examples'>;

const EXPLAINER_EN: typeof powerVsEnergyExplainer = {
  power: {
    title: 'Power (W, kW, MW, GW)',
    analogy: "The car's speedometer / The flow from a tap (liters per second)",
    meaning: 'Instantaneous rate of energy conversion or transfer (1 W = 1 J/s). It is the electrical flow demanded at that exact moment.'
  },
  energy: {
    title: 'Energy (Wh, kWh, MWh, GWh, TWh)',
    analogy: "The car's odometer / The volume of water stored in the tank",
    meaning:
      'The total accumulated over time: power integrated over time (Energy = Power × Time, for constant power). 1 kWh = 1 kW for 1 hour = 3.6 MJ.'
  }
};

/** Keyed by `unit`, which is the level's id. */
export const SCALE_LEVELS_EN: Record<string, ScaleText> = {
  W: {
    name: 'Watts',
    factor: '10⁰ W (1 Watt)',
    concept: 'Scale of individual electronic components and lighting.',
    examples: [
      { item: 'LED Bulb', power: '9 W', description: 'Delivers the luminous flux of a 60 W incandescent bulb at about 1/6 of the power.' },
      { item: 'Internet Modem', power: '~8 W', description: "Procel (Brazil's national energy efficiency program) estimates 1.9 kWh/month for 8 hours of use per day (1.92 kWh ÷ 240 h = 8 W)." },
      { item: 'Laptop in Use', power: '~20 W (average)', description: 'Procel estimates 4.8 kWh/month for 8 hours of use per day (4.8 kWh ÷ 240 h = 20 W).' }
    ]
  },
  kW: {
    name: 'Kilowatts',
    factor: '10³ W (1,000 Watts)',
    concept: 'Scale of heavy household appliances and monthly residential consumption.',
    examples: [
      { item: 'Two-Door Frost-Free Refrigerator', power: '~0.08 kW (average)', description: 'Procel estimates ~57 kWh/month. Because the compressor cycles on and off, the average power (57 kWh ÷ 720 h ≈ 79 W) is well below the rating.' },
      { item: 'Split Air Conditioner 12,000 BTU/h', power: '~0.8 kW (average)', description: 'Procel estimates ~194 kWh/month at 8 hours per day (10,001 to 15,000 BTU/h band; 194 kWh ÷ 240 h ≈ 0.8 kW) — more than the average Brazilian household consumption.' },
      { item: 'Average BR Household Running 24 h', power: '~0.24 kW (average)', description: '177 kWh/month × 12 ÷ 8,760 h ≈ 0.24 kW continuous. Less than a single split unit running: the average home spends most of its time at low load and has short peaks (electric shower).' },
      { item: 'Electric Shower', power: '4.5 kW to 5.5 kW', description: 'The appliance with the highest instantaneous power in most homes. A 15-minute shower at 5.5 kW = 1.375 kWh; Procel estimates 88 kWh/month for 32 min/day.' },
      { item: 'Average BR Residential Consumption (2024)', power: '~177 kWh/month', description: 'Residential consumption of 176.5 TWh ÷ 82.9 million residential units ÷ 12 months. Ranges from 136 kWh/month (Northeast) to 220 kWh/month (North).' }
    ]
  },
  MW: {
    name: 'Megawatts',
    factor: '10⁶ W (1,000,000 Watts)',
    concept: 'Scale of industries, distributed mini generation, small hydro plants and nuclear reactors.',
    examples: [
      { item: 'Solar PV Mini Generation (DG)', power: 'up to 3 MW', description: 'Limit set by Law 14,300/2022 for non-dispatchable sources. With ~550 W modules, 3 MW takes ~5,500 modules (without DC oversizing).' },
      { item: 'Neighborhood of 10,000 Homes', power: '~2.4 MW (average)', description: '10,000 × 0.24 kW (average BR household, 2024). Residential consumption only: commerce and street lighting are left out. At the late-afternoon peak, demand goes well above this.' },
      { item: 'Small Town (20,000 inhabitants)', power: '~6 MW (average)', description: 'National average of ~0.30 kW per inhabitant (566.7 TWh ÷ 213.4 million ÷ 8,760 h), adding up homes, commerce and industry. A town with energy-intensive industry can consume several times more.' },
      { item: 'Small Hydro Plant (PCH)', power: '> 5 MW to 30 MW', description: 'Legal classification: capacity above 5 MW and up to 30 MW, with a reservoir of up to 13 km² (excluding the river channel).' },
      { item: 'Angra 1 Nuclear Plant (RJ)', power: '640 MW', description: "Brazil's first nuclear plant, in commercial operation since 1985 (PWR reactor)." }
    ]
  },
  GW: {
    name: 'Gigawatts',
    factor: '10⁹ W (1,000,000,000 Watts)',
    concept: "Scale of large national power plants and Brazil's total simultaneous demand.",
    examples: [
      { item: 'City of 1 Million Inhabitants', power: '~0.30 GW (average)', description: '10⁶ × 0.30 kW (national average per inhabitant, 2025). One Angra 2 covers roughly 4 cities of this size on average — but not at peak.' },
      { item: 'Angra 2 Nuclear Plant (RJ)', power: '1.35 GW', description: "Brazil's largest nuclear plant, at the Almirante Álvaro Alberto Nuclear Power Station in Angra dos Reis (RJ)." },
      { item: 'Belo Monte Hydro Plant (PA)', power: '11.23 GW', description: 'The largest fully Brazilian plant by installed capacity (11,233.1 MW, 24 units), on the Xingu River.' },
      { item: 'Itaipu Binational Plant (BR/PY)', power: '14.0 GW', description: '20 generating units of 700 MW. Each country is entitled to 50% of the energy; the Paraguayan share not consumed is ceded to Brazil (Annex C of the Treaty).' },
      { item: 'Average Consumption of Brazil (2025)', power: '~64.7 GW (average)', description: '566.7 TWh ÷ 8,760 h. This is billed consumption: the load measured by ONS is higher because it includes transmission and distribution losses.' },
      { item: 'SIN Instantaneous Demand Record', power: '106.5 GW', description: 'Record of 106,532 MW registered by ONS on 26 Feb 2025, during a heat wave.' }
    ]
  },
  TWh: {
    name: 'Terawatt-hours',
    factor: '10¹² Wh (1,000,000,000,000 Wh)',
    concept: 'Scale of the total energy generated and consumed by the country in a year.',
    examples: [
      { item: 'City of 1 Million Inhabitants over a Year', power: '~2.7 TWh', description: '10⁶ × 2,656 kWh/inhabitant (566.7 TWh ÷ 213.4 million, 2025). One year of Itaipu (72.9 TWh) would supply ~27 cities of this size.' },
      { item: 'Itaipu Annual Generation', power: '72.9 TWh (2025)', description: 'Record of 103.1 TWh in 2016. Cumulative output passed 3.1 billion MWh in Sep 2025 — according to Itaipu, the equivalent of 44 days of world consumption.' },
      { item: "Brazil's Annual Electricity Consumption", power: '566.7 TWh (2025)', description: 'All electricity consumed in the country in 2025 (EPE), for an estimated population of 213.4 million (IBGE, 2025).' },
      { item: 'Brazil Annual Wind Generation', power: '107.7 TWh (2024)', description: 'More than the entire consumption of the Northeast Region in 2024 (17.8% of 561.6 TWh ≈ 100 TWh).' }
    ]
  }
};

export const localizeExplainer = (lang: Lang): typeof powerVsEnergyExplainer =>
  lang === 'en' ? EXPLAINER_EN : powerVsEnergyExplainer;

export function localizeScaleLevel(level: ScaleLevel, lang: Lang): ScaleLevel {
  const en = lang === 'en' ? SCALE_LEVELS_EN[level.unit] : undefined;
  return en ? { ...level, ...en } : level;
}
