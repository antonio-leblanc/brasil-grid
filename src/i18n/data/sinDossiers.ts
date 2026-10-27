import type { DossierStep, SinDossier } from '../../data/sinDossiersData';
import type { Lang } from '../language';

/** Steps are matched by position; `badgeType` stays from the Portuguese entry. */
export type DossierText = Pick<
  SinDossier,
  'title' | 'badge' | 'subtitle' | 'summary' | 'keyFormulas' | 'keyMetrics' | 'stepsTitle' | 'lessonsLearned'
> & { steps: Omit<DossierStep, 'badgeType'>[] };

export const SIN_DOSSIERS_EN: Record<string, DossierText> = {
  'apagao-2023': {
    title: 'Anatomy of the 15 August 2023 Blackout',
    badge: 'VOLTAGE COLLAPSE & WIND/SOLAR MODELS',
    subtitle:
      'From the unwanted opening of a 500 kV TL to voltage collapse, SIN islanding and ERAC under-frequency load shedding',
    summary:
      'On 15 Aug 2023, the unwanted opening of the 500 kV TL Quixadá–Fortaleza II triggered a voltage collapse in the Northeast, split the SIN (National Interconnected System) into electrical islands and shed ~23,368 MW (~32% of national load), affecting 25 states and the Federal District. According to the final ONS disturbance analysis report (RAP), the dynamic reactive power support of the wind and solar plants in the field fell far short of what the registered mathematical models predicted, which made it impossible to identify the operating vulnerability in advance.',
    keyFormulas: [
      {
        label: 'Swing Equation',
        formula: 'df/dt = (f₀ / 2H) · (P_mec - P_elec)',
        explanation:
          'The rate of change of frequency (RoCoF) after an imbalance is inversely proportional to the inertia H. The RAP recorded adequate system inertia (~265 GW·s for ~73 GW of load): the trigger of the event was a voltage collapse, which is insensitive to added mechanical inertia.'
      },
      {
        label: 'Harmonized ERAC Settings (SE/CO, S and NE)',
        formula: 'f ≤ 58.5 / 58.2 / 57.9 / 57.7 / 57.5 Hz  →  shed 5 / 6 / 7 / 8 / 9% (up to 35% of load)',
        explanation:
          'Under-frequency relays (81U) shed load in steps to arrest the frequency decline before generators trip. The 5 steps totaling 35% apply to SE/CO, South and Northeast; the North uses larger steps (up to 55% in 5 stages) because of its islanding profile.'
      }
    ],
    keyMetrics: [
      { label: 'Load Interrupted', value: '~23,368 MW', detail: 'Final RAP; ≈ 32% of the ~73 GW served by the SIN at the time' },
      { label: 'Extent', value: '25 states + DF', detail: 'Roraima, isolated from the SIN, stayed supplied' },
      { label: 'North Separation', value: '≈ 2.6 s', detail: 'After the initial event; the Northeast stayed tied to SE/CO for ≈ 18.6 s' },
      { label: 'Northeast Exporting', value: '~22.5 GW generated', detail: 'For ~10.2 GW of load; FNESE 6,392 MW and FNEN 5,879 MW pre-event' }
    ],
    stepsTitle: 'Operating Timeline (RAP-ONS 00012/2023)',
    steps: [
      {
        time: '08:30:36.946 (T0)',
        title: 'Unwanted Trip of the 500 kV TL Quixadá – Fortaleza II',
        description:
          'The line opened at the Quixadá terminal with no physical short circuit on the grid, while carrying a record ~1,950 MW (2,375 A against a 2,390 A rating).',
        tag: 'Line Trip',
        technicalDetail:
          'Accidental operation of the 50 SOTF (Switch-On-To-Fault) function: pickup set at 2,310 A (below rating) with no post-energization blocking. A single N-1 loss should have been withstood.'
      },
      {
        time: 'T0 + 0.53 s',
        title: 'Voltage Collapse in Ceará and Opening of the N/NE Interconnection',
        description:
          'Immediate overload on the 230 kV trunk and widespread voltage sag. Local wind and solar plants did not inject the reactive power predicted by the computer models.',
        tag: 'Voltage Collapse',
        technicalDetail:
          'At 530 ms the Out-of-Step Protection (PPS) of the 500 kV TL Presidente Dutra–Boa Esperança operated, triggering the opening of 230 kV lines by 21 (distance) relays and inter-area oscillations.'
      },
      {
        time: 'T0 + 2.6 s to T0 + 3.5 s',
        title: 'Separation and Blackout of the North and Acre/Rondônia',
        description:
          'The opening of the 500 kV TL Serra da Mesa–Gurupi C2 isolated the North (a net importer), which sank into severe under-frequency. Acre/Rondônia then separated as well.',
        tag: 'Islanding',
        technicalDetail:
          'In the North, ERAC could not contain the large imbalance between load and local generation, causing successive unit trips and total collapse of the subsystem.'
      },
      {
        time: 'T0 + 2.6 s to T0 + 20 s',
        title: 'Widespread ERAC Operation in the South, Southeast and Northeast',
        description:
          'Frequency fell to 57.76 Hz in SE/CO and 57.66 Hz in the South, picking up 3 ERAC stages (~15.6 GW shed) and recovering to 59.5 Hz in under 20 seconds.',
        tag: 'ERAC Trip',
        technicalDetail:
          'The Northeast stayed connected to SE/CO for ~18.6 s in under-frequency (triggering 5 shedding stages) and then islanded in over-frequency, sustained by the remaining wind, solar and hydro plants.'
      },
      {
        time: '08:43 to 14:49',
        title: 'Fluent Restoration & Black Start',
        description:
          'South and Southeast restored all load in under 1 hour. North and Northeast required a black start of large hydro plants and restoration in rings.',
        tag: 'Restoration',
        technicalDetail:
          'Tucuruí, Balbina, Estreito and Samuel led the black start in the North; Itapebi and the surviving island re-energized the Northeast (Sobradinho failed to self-start). Load 100% restored at 14:49.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Mandatory IBR Model Validation',
        desc: 'Field tests and continuous phasor measurement (PMU) required to certify the dynamic reactive response and fault ride-through (FRT) capability of wind and solar plants.'
      },
      {
        title: 'Collapse Physics: Voltage vs Inertia',
        desc: 'ONS showed that the disturbance came from a lack of reactive support and short-circuit strength in the grid, not from insufficient rotating mechanical inertia.'
      },
      {
        title: 'Harmonization of ERAC Schemes',
        desc: 'SOTF logic corrected and the 5 under-frequency steps (58.5 to 57.5 Hz, up to 35% shed) unified across the SE/CO, South and Northeast subsystems (keeping a specific setting of up to 55% in the North), replacing asymmetric rate-of-change-of-frequency (df/dt) relays.'
      }
    ]
  },
  'custo-agua-pld': {
    title: 'The Future Cost of Water & Price Formation (PLD)',
    badge: 'HYDROTHERMAL OPERATION & CENTRALIZED DISPATCH',
    subtitle: 'How the NEWAVE / DECOMP / DESSEM chain sets dispatch and price in the SIN, instead of free generator bids',
    summary:
      'In the SIN, physical dispatch and the hourly price (CMO, the marginal cost of operation; PLD, the spot price) do not come from free-bid auctions but from the NEWAVE/DECOMP/DESSEM stochastic optimization chain developed by CEPEL. The model prices the water stored in the reservoirs by the future cost it avoids: turbine it today at low immediate cost, or save it to shield the system from fossil thermal plants and future deficit risk.',
    keyFormulas: [
      {
        label: 'Water Value & CMO',
        formula: 'Water Value = −∂FCF / ∂V   |   CMO = ∂C_total / ∂Demand',
        explanation:
          'The Future Cost Function (FCF) expresses the expected operating cost as a function of the stored volume V. The CMO is the marginal derivative (Lagrange multiplier) of the load balance. When a hydro plant is marginal, the CMO equals the opportunity value of the water exactly.'
      },
      {
        label: 'Optimal Hydrothermal Balance',
        formula: 'min [ C_immediate(Thermal, Deficit) + FCF(V_final) ]',
        explanation:
          'Multistage minimization: the algorithm weighs the immediate cost of thermal fuel burn against the future cost of depleting hydro reserves across multiple inflow scenarios.'
      },
      {
        label: 'MRE (Energy Reallocation Mechanism) Adjustment Factor (GSF)',
        formula: 'GSF = Total MRE Generation / Σ MRE Physical Guarantees',
        explanation:
          'Ratio of actual hydro generation to the sum of physical guarantees. GSF < 1 imposes a volume shortfall and financial exposure to settlement in the Short-Term Market at the PLD.'
      }
    ],
    keyMetrics: [
      { label: 'Max. SIN Storable Energy', value: '≈ 292 GW-month', detail: 'SE/CO holds ~70% (204.6 GW-month); ONS open data, 2026' },
      { label: 'PLD Granularity', value: 'Hourly, since 2021', detail: 'CCEE computes it from the DESSEM CMO (half-hourly resolution)' },
      {
        label: 'PLD Limits 2026 (ANEEL)',
        value: 'Min R$ 57.31 | Structural max R$ 785.27 | Hourly max R$ 1,611.04/MWh',
        detail: 'Published Dec 2025, valid for calendar year 2026'
      },
      { label: 'Submarkets', value: '4 (SE/CO, S, NE, N)', detail: 'Single price in each; interchange limits decouple the PLDs' }
    ],
    stepsTitle: 'The CEPEL / ONS / CCEE Hierarchical Model Chain',
    steps: [
      {
        title: 'NEWAVE — Multi-Year Strategic Planning (Monthly)',
        description:
          'Horizon of up to 10 years in monthly steps. Models the system through Equivalent Energy Reservoirs (REE) and stochastic inflow series (ENA).',
        tag: 'Strategic / Monthly',
        technicalDetail:
          'Uses Stochastic Dual Dynamic Programming (SDDP) to build the Future Cost Functions (FCF) that guide the trade-off between saving water and dispatching thermal plants.'
      },
      {
        title: 'DECOMP — Medium-Term Tactical Scheduling (Weekly)',
        description:
          'Horizon of up to 1 year discretized in weeks. Represents individual hydro plants and load levels per submarket.',
        tag: 'Tactical / Weekly',
        technicalDetail:
          'Couples to the NEWAVE FCF and refines cascade hydraulic constraints (minimum flows, water travel times and outflow limits).'
      },
      {
        title: 'DESSEM — Daily Operational Dispatch & Hourly PLD',
        description:
          'Horizon of up to 7 days at half-hourly and hourly granularity. Represents the electrical grid with a linearized (DC) power flow and transmission limits.',
        tag: 'Operational / Daily',
        technicalDetail:
          'Solves hydrothermal Unit Commitment via MILP. The marginal CMO per bus and submarket directly sets the hourly PLD computed by CCEE.'
      },
      {
        title: 'Physical Dispatch (ONS) vs Financial Settlement (CCEE)',
        description:
          'ONS operates the physical grid by merit order and electrical security criteria; CCEE compares metered generation against the contract portfolio and settles the differences in the MCP (short-term market).',
        tag: 'Governance',
        technicalDetail:
          'Thermal plants dispatched out of merit order for electrical constraints or reliability are reimbursed through System Service Charges (ESS), allocated among loads.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Optimized-Cost Formation vs Free Bids',
        desc: 'The Brazilian power sector (SEB) model is regulated by audited cost: the price reflects the mathematical multiplier of the demand constraint, with no strategic bids from generators.'
      },
      {
        title: 'Spatial Price Decoupling from Congestion',
        desc: 'Bottlenecks on the interconnections saturate the interchange limits in DESSEM: the exporting subsystem falls to the regulatory floor (R$ 57.31/MWh), while the importer rises toward the cap.'
      },
      {
        title: 'Regulatory Transition to Bid-Based Pricing',
        desc: 'Studies from Projeto Meta II (CCEE/PSR/World Bank) support public consultations by the MME (Ministry of Mines and Energy) on a gradual move toward hybrid models based on hourly bids from market agents.'
      }
    ]
  },
  'curtailment-duck-curve': {
    title: 'Curtailment, the Duck Curve & Transmission Bottlenecks',
    badge: 'ENERGY TRANSITION & MANAGING INTERMITTENCY',
    subtitle: 'Why is ONS forced to curtail solar and wind plants while keeping other sources running?',
    summary:
      'The fast growth of distributed solar micro and mini generation (MMGD, ~42.3 GW), added to the centralized wind and solar complexes in the Northeast, has established the "duck curve" in the SIN. At midday there is a structural generation surplus and the transmission lines toward the Southeast saturate, forcing cuts to renewable generation (curtailment); at solar sunset, the system faces a steep ramp-up on hydro and thermal plants.',
    keyFormulas: [
      {
        label: 'System Net Load',
        formula: 'Net Load = Total Demand - MMGD Generation - Centralized Solar/Wind Generation',
        explanation:
          'The "duck\'s belly" reaches the solar minimum between 11:00 and 14:00, pulling down the demand served by dispatchable plants. The "duck\'s neck" appears from 17:00 to 19:00 as solar drops off and urban loads switch on.'
      },
      {
        label: 'Critical Net Load Ramp',
        formula: 'Ramp = Δ(Net Load) / Δt  [MW/min]',
        explanation:
          'The abrupt loss of distributed generation at dusk is not controlled by ONS, forcing reservoir hydro plants and fast thermal plants to cover hundreds of MW per minute to keep 60 Hz stable.'
      }
    ],
    keyMetrics: [
      { label: 'Curtailment for Energy Reasons (2024)', value: '~4,330 GWh', detail: 'Wind + solar; half-hourly peak of 22,766 MWavg (ONS)' },
      { label: 'Distributed Micro and Mini Generation', value: '~42.3 GW', detail: 'ANEEL, 31 Jul 2025; not supervised or controlled by ONS' },
      { label: 'N/NE ➔ SE/CO Export', value: '~15,600 MW', detail: 'Peak-load capacity estimated for Jan 2025; 20,500 MW in Dec 2029 (PAR/PEL 2024)' },
      { label: 'Batteries (LRCAP 2026)', value: '1st storage auction', detail: 'Start of operation on 1 Aug 2028; ONS/EPE requirements include grid forming' }
    ],
    stepsTitle: 'Daily Dynamics of Intermittency and Bottlenecks',
    steps: [
      {
        time: '11:00 to 14:00',
        title: "The Duck's Belly and the Northeast Surplus",
        description:
          'Coincident peak solar irradiance and wind turn the Northeast into a massive exporter (~22.5 GW generated for ~10.2 GW of load).',
        tag: 'Solar Peak',
        technicalDetail:
          'Heavy MMGD injection at the consumer end pulls down the net load seen by the bulk grid; dispatchable synchronous plants are cut back to their technical minimum.'
      },
      {
        time: '12:00 to 15:00',
        title: 'Saturation of N/NE ➔ SE/CO Interchanges',
        description:
          'The 500 kV trunks connecting the Northeast to the Center-West and Southeast hit their operating limits for angle and voltage stability.',
        tag: 'Transmission Bottleneck',
        technicalDetail:
          'The N-1 criterion limits the export flow to avoid a system-wide voltage collapse if a 500 kV trunk line is lost in a single contingency.'
      },
      {
        time: 'Daytime',
        title: 'Curtailment Order (Constrained-Off)',
        description:
          'With saturated interconnections and not enough load, ONS issues mandatory generation-cut orders (curtailment) to dozens of centralized wind and solar plants.',
        tag: 'Curtailment',
        technicalDetail:
          'Cuts for electrical reliability and energy surplus exceeded 4.3 TWh in 2024. MMGD, with no ONS supervision, is untouched and worsens the cuts imposed on centralized generators.'
      },
      {
        time: '17:00 to 19:00',
        title: "The Duck's Neck and the Hydro Ramp",
        description:
          'PV plants drop to zero in under 90 minutes while national demand climbs toward the evening peak. Net load rises sharply.',
        tag: 'Steep Ramp',
        technicalDetail:
          'Hydro plants with storage reservoirs (Paraná, Paranaíba and Grande basins) take on more than 50% of the power ramp within minutes to hold 60 Hz.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Grid-Scale BESS Storage',
        desc: 'Large-scale batteries absorb the midday PV surplus and discharge at the evening peak. The LRCAP 2026 capacity reserve auction requires grid-forming inverters for voltage and frequency control.'
      },
      {
        title: 'Synchronous Condensers at Critical Substations',
        desc: 'Installation of condensers (as planned at Açu III and João Câmara III in PAR/PEL 2024) to raise short-circuit strength and stabilize reactive power at inverter-dominated nodes.'
      },
      {
        title: '±800 kV UHVDC Supercorridors',
        desc: 'The Graça Aranha (MA) – Silvânia (GO) bipole, ~1,500 km long and won by State Grid in Auction 02/2023, will add 5 GW of transfer capacity from the North/Northeast to the Southeast from 2030.'
      }
    ]
  }
};

export function localizeDossier(dossier: SinDossier, lang: Lang): SinDossier {
  const en = lang === 'en' ? SIN_DOSSIERS_EN[dossier.id] : undefined;
  if (!en) return dossier;
  return { ...dossier, ...en, steps: dossier.steps.map((step, i) => ({ ...step, ...en.steps[i] })) };
}
