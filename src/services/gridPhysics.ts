import { getNumberLocale } from '../i18n/language';
import type { SimulatorDay, SimulatorDayHour } from '../data/simulatorDayData';
import { simulatorDay } from '../data/simulatorDayData';

export interface PlantFleetState {
  // Current active output in MW
  actualMW: number;
  // Operator target setpoint in MW
  targetMW: number;
  // Online synchronized capacity in MW (MVA base at unit power factor) contributing rotor inertia
  committedMW: number;
  // Maximum installed dispatchable capacity in MW
  maxCapacityMW: number;
  // Minimum technical generation in MW (inflexibility)
  minTechnicalMW: number;
  // Ramp rate limit in MW/s
  rampRateMWs: number;
  // Inertia constant H in seconds
  inertiaH: number;
  // Specific operating cost in R$/MWh
  operatingCostPerMWh: number;
  // Specific CO2 emission in tCO2/MWh
  co2PerMWh: number;
  // Is plant online/dispatched
  isOnline: boolean;
  // Weather potential (only for solar/wind) in MW
  weatherPotentialMW?: number;
  // Curtailment percentage (0 to 100)
  curtailmentPercent?: number;
}

export interface GridSimulationState {
  // Simulation clock in seconds from midnight (e.g. 17.5 * 3600 = 17:30)
  simTimeSeconds: number;
  // Simulated seconds since scenario start
  elapsedSeconds: number;
  // Simulated seconds per real second; 0 pauses
  speedMultiplier: number;
  // Until this clock time the integrator runs at EVENT_SPEED so the transient stays visible
  eventSlowdownUntilSeconds: number;
  isDayFinished: boolean;
  // Carries sub-step time between frames so trajectories do not depend on display refresh rate
  integratorRemainderSeconds: number;

  // Active frequency in Hz
  frequencyHz: number;
  // Rate of Change of Frequency in Hz/s
  rocofHzS: number;
  // Equivalent inertia constant H_eq in seconds, on the total generation base
  equivalentInertiaH: number;
  // Rotating kinetic energy of synchronous machines in MW·s
  kineticEnergyMWs: number;

  // Generation fleet state
  hydro: PlantFleetState;
  thermal: PlantFleetState;
  solar: PlantFleetState;
  wind: PlantFleetState;

  // Active demand / load
  baseLoadMW: number;
  actualLoadMW: number;
  shedLoadMW: number; // Cut by ERAC

  // Protection & stability
  eracStage: number;
  eracStageTimers: number[];
  eracRestoreTimerSeconds: number;
  isBlackout: boolean;
  blackoutCause?: BlackoutCause;
  isOverfrequencyAlert: boolean;
  isIbrFrequencyWattActive: boolean;

  // Primary Frequency Control (Droop Governor) toggle and 1st-order actuator states
  isPrimaryControlEnabled: boolean;
  hydroGovernorMW: number;
  thermalGovernorMW: number;

  // Secondary control (CAG): integral action on hydro setpoints that restores 60 Hz after primary response
  isSecondaryControlEnabled: boolean;
  secondaryControlMW: number;

  // Hydro output lost to trips; the day schedule keeps asking for the pre-trip dispatch
  hydroTrippedMW: number;
  scheduledTrips: ScheduledTrip[];

  // Scenario
  scenarioId: 'dia' | 'livre';

  // Audit event log (latest events)
  events: SimulationEvent[];
}

export interface SimulationEvent {
  id: string;
  timestampSeconds: number;
  timeLabel: string;
  type: 'info' | 'warning' | 'alert' | 'critical' | 'success';
  message: string;
}

export interface ScheduledTrip {
  atSeconds: number;
  mw: number;
}

export interface HistoryPoint {
  timeSeconds: number;
  timeLabel: string;
  frequencyHz: number;
  totalGenMW: number;
  totalLoadMW: number;
  rocofHzS: number;
  inertiaH: number;
}

export const F_NOMINAL = 60.0;
// Load self-regulation: 1% frequency drop reduces load by D%
export const LOAD_DAMPING_D = 1.5;

export const SIM_STEP_SECONDS = 0.01;
// Caps a single frame so a backgrounded tab does not dump minutes of simulation at once
export const MAX_FRAME_SECONDS = 0.1;

export const GOVERNOR_DROOP_R = 0.05;
// Share of the hydro fleet under free governor regulation; the rest runs on fixed setpoints
export const GOVERNOR_PARTICIPATION = 0.6;
// Share of the thermal fleet with active primary droop headroom (most nuclear/coal/LNG units run base-loaded)
export const THERMAL_GOVERNOR_PARTICIPATION = 0.15;
// First-order governor servomotor / distributor lag time constant in seconds
export const GOVERNOR_TAU_S = 1.5;
export const PRIMARY_RESERVE_UP_MW = 6000;
export const PRIMARY_RESERVE_DOWN_MW = 5000;
export const THERMAL_PRIMARY_RESERVE_MW = 800;

// Synchronous units scheduled by the operator run near ~85% nominal loading (spinning headroom + optimal turbine efficiency),
// stepped in 500 MW machine blocks (typical large hydro/thermal unit block in the SIN).
export const NOMINAL_COMMITMENT_LOADING = 0.85;
export const COMMITMENT_BLOCK_MW = 500;

// Didactic CAG integral time: Kundur §11.1 leaves K_I to the operator and ONS cycle settings are not modelled
export const SECONDARY_CONTROL_TIME_S = 60;

// Near-real-time playback while a contingency transient evolves, then back to the day's accelerated clock
export const EVENT_SPEED = 2;
export const EVENT_SLOWDOWN_SECONDS = 30;

export const DAY_SPEEDS = [360, 900, 1800] as const;
export const DAY_START_SECONDS = 5 * 3600;
export const DAY_END_SECONDS = 24 * 3600;
export const DEFAULT_TRIP_MW = 2800;
// Same loss at midday (IBR-heavy, fewer committed synchronous units) and at the evening peak (hydro-heavy) to contrast RoCoF
export const DAY_SCHEDULED_TRIPS: readonly ScheduledTrip[] = [
  { atSeconds: 12 * 3600, mw: DEFAULT_TRIP_MW },
  { atSeconds: 19 * 3600, mw: DEFAULT_TRIP_MW }
];

// ONS Submódulo 2.10 (requisitos técnicos mínimos de eólicas e fotovoltaicas):
// acima de 60,2 Hz, redução obrigatória de 3% da potência ativa disponível por cada 0,1 Hz (30%/Hz ⇔ estatismo R = 1/18 ≈ 5,56%).
export const IBR_FREQUENCY_WATT_START_HZ = 60.2;
export const IBR_FREQUENCY_WATT_RATE_PER_HZ = 0.3;
export const IBR_FREQUENCY_WATT_DROOP = 1 / (F_NOMINAL * IBR_FREQUENCY_WATT_RATE_PER_HZ);

export interface EracStage {
  thresholdHz: number;
  shedPercent: number;
}

// ONS uniform ERAC settings for SE/CO, S and NE ("Análise do desempenho do ERAC — Perturbação de 15/08/2023", ONS;
// subsystem N uses separate wider steps up to 55% for islanding).
export const ERAC_STAGES: readonly EracStage[] = [
  { thresholdHz: 58.5, shedPercent: 5 },
  { thresholdHz: 58.2, shedPercent: 6 },
  { thresholdHz: 57.9, shedPercent: 7 },
  { thresholdHz: 57.7, shedPercent: 8 },
  { thresholdHz: 57.5, shedPercent: 9 }
];

// Digital underfrequency relay (81U) pickup time: 6 cycles at 60 Hz (100 ms per feeder stage, ONS ERAC standard)
export const ERAC_PICKUP_SECONDS = 0.1;
// Sustained normal frequency threshold and timer before shed load is restored stage by stage
export const ERAC_RESTORE_THRESHOLD_HZ = 59.9;
export const ERAC_RESTORE_DELAY_SECONDS = 45;

// Didactic collapse limits: below the last ERAC stage, thermal and hydro unit protections trip in cascade
export type BlackoutCause = 'sync_loss' | 'underfrequency' | 'overfrequency';

export const UNDERFREQUENCY_COLLAPSE_HZ = 56.5;
export const OVERFREQUENCY_COLLAPSE_HZ = 62.5;
export const OVERFREQUENCY_ALERT_HZ = 60.5;

export function eracShedPercent(stage: number): number {
  return ERAC_STAGES.slice(0, stage).reduce((sum, s) => sum + s.shedPercent, 0);
}

/**
 * Online synchronized capacity (MVA at unit power factor) committed for a scheduled dispatch.
 * Depends on the operator's unit commitment target rather than instantaneous shaft power, so
 * rotor kinetic energy E_k stays invariant during fast governor/CAG active power excursions.
 */
export function committedCapacityMW(scheduledMW: number, minTechnicalMW: number, maxCapacityMW: number): number {
  if (scheduledMW <= 0 || maxCapacityMW <= 0) return 0;
  const rawMW = scheduledMW / NOMINAL_COMMITMENT_LOADING;
  const steppedMW = Math.ceil(rawMW / COMMITMENT_BLOCK_MW) * COMMITMENT_BLOCK_MW;
  return Math.max(Math.min(minTechnicalMW, maxCapacityMW), Math.min(maxCapacityMW, steppedMW));
}

export function computeKineticEnergyMWs(hydro: PlantFleetState, thermal: PlantFleetState): number {
  const hydroCommitted = hydro.isOnline ? hydro.committedMW : 0;
  const thermalCommitted = thermal.isOnline ? thermal.committedMW : 0;
  return hydroCommitted * hydro.inertiaH + thermalCommitted * thermal.inertiaH;
}

function totalGeneration(fleet: Pick<GridSimulationState, 'hydro' | 'thermal' | 'solar' | 'wind'>): number {
  return fleet.hydro.actualMW + fleet.thermal.actualMW + fleet.solar.actualMW + fleet.wind.actualMW;
}

// Initial fleet configurations
export function createInitialFleet(): {
  hydro: PlantFleetState;
  thermal: PlantFleetState;
  solar: PlantFleetState;
  wind: PlantFleetState;
} {
  return {
    hydro: {
      actualMW: 52000,
      targetMW: 52000,
      committedMW: committedCapacityMW(52000, 8000, 75000),
      maxCapacityMW: 75000,
      minTechnicalMW: 8000,
      rampRateMWs: 70, // ~4200 MW/min across national hydro cascade
      inertiaH: 4.2,
      operatingCostPerMWh: 45,
      co2PerMWh: 0.01,
      isOnline: true
    },
    thermal: {
      actualMW: 12000,
      targetMW: 12000,
      committedMW: committedCapacityMW(12000, 6000, 22000),
      maxCapacityMW: 22000,
      minTechnicalMW: 6000,
      rampRateMWs: 12, // ~720 MW/min across thermal fleet (slower response)
      inertiaH: 4.8,
      operatingCostPerMWh: 420,
      co2PerMWh: 0.55,
      isOnline: true
    },
    solar: {
      actualMW: 14000,
      targetMW: 14000,
      committedMW: 0,
      maxCapacityMW: 28000,
      minTechnicalMW: 0,
      rampRateMWs: 200, // Inverters ramp instantly unless constrained
      inertiaH: 0.0, // Zero mechanical inertia (IBR)
      operatingCostPerMWh: 5,
      co2PerMWh: 0.0,
      isOnline: true,
      weatherPotentialMW: 14000,
      curtailmentPercent: 0
    },
    wind: {
      actualMW: 12000,
      targetMW: 12000,
      committedMW: 0,
      maxCapacityMW: 26000,
      minTechnicalMW: 0,
      rampRateMWs: 150,
      inertiaH: 0.0, // Decoupled rotor converters (IBR)
      operatingCostPerMWh: 5,
      co2PerMWh: 0.0,
      isOnline: true,
      weatherPotentialMW: 12000,
      curtailmentPercent: 0
    }
  };
}

export function formatSimClock(seconds: number): string {
  const normSec = ((Math.floor(seconds) % 86400) + 86400) % 86400;
  const h = Math.floor(normSec / 3600);
  const m = Math.floor((normSec % 3600) / 60);
  const s = normSec % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export interface DaySchedule {
  hydroMW: number;
  thermalMW: number;
  windMW: number;
  solarMW: number;
  // Share of solarMW behind the meter: shown apart in the day chart, dispatched as solar like the rest
  mmgdMW: number;
  // Sum of verified generation: ONS val_carga runs up to ~1.1 GW below it in daylight hours and the
  // dataset dictionary does not attribute the gap, so demand is closed on the generation side
  demandMW: number;
}

const HOURLY_MIDPOINT_OFFSET_S = 1800;

/** Linear interpolation between hourly MWmed values placed at each hour's midpoint; clamped at the day edges. */
export function dayScheduleAt(day: SimulatorDay, simTimeSeconds: number): DaySchedule {
  const hours = day.hours;
  const position = (simTimeSeconds - HOURLY_MIDPOINT_OFFSET_S) / 3600;
  const lower = Math.max(0, Math.min(hours.length - 1, Math.floor(position)));
  const upper = Math.min(hours.length - 1, lower + 1);
  const t = Math.max(0, Math.min(1, position - lower));
  const lerp = (key: Exclude<keyof SimulatorDayHour, 'hour' | 'loadMW'>) =>
    hours[lower][key] + (hours[upper][key] - hours[lower][key]) * t;

  const hydroMW = lerp('hydroMW');
  const thermalMW = lerp('thermalMW');
  const windMW = lerp('windMW');
  const solarMW = lerp('solarMW');
  return { hydroMW, thermalMW, windMW, solarMW, mmgdMW: lerp('mmgdMW'), demandMW: hydroMW + thermalMW + windMW + solarMW };
}

export function synchronousInertiaH(hydroMW: number, thermalMW: number, totalMW: number): number {
  const fleet = createInitialFleet();
  const hydroCommitted = committedCapacityMW(hydroMW, fleet.hydro.minTechnicalMW, fleet.hydro.maxCapacityMW);
  const thermalCommitted = committedCapacityMW(thermalMW, fleet.thermal.minTechnicalMW, fleet.thermal.maxCapacityMW);
  return totalMW > 0 ? (hydroCommitted * fleet.hydro.inertiaH + thermalCommitted * fleet.thermal.inertiaH) / totalMW : 0;
}

function setFleetOutput(fleet: PlantFleetState, mw: number): void {
  fleet.actualMW = mw;
  fleet.targetMW = mw;
  if (fleet.inertiaH > 0) {
    fleet.committedMW = committedCapacityMW(mw, fleet.minTechnicalMW, fleet.maxCapacityMW);
  }
  if (fleet.weatherPotentialMW !== undefined) fleet.weatherPotentialMW = mw;
}

export function createInitialSimulation(
  scenario: GridSimulationState['scenarioId'] = 'dia',
  day: SimulatorDay = simulatorDay,
  dayStartSeconds: number = DAY_START_SECONDS
): GridSimulationState {
  const fleet = createInitialFleet();
  let simTimeSeconds: number;
  let baseLoadMW: number;
  let speedMultiplier: number;

  if (scenario === 'dia') {
    simTimeSeconds = dayStartSeconds;
    speedMultiplier = DAY_SPEEDS[1];
    const schedule = dayScheduleAt(day, simTimeSeconds);
    fleet.solar.maxCapacityMW = Math.max(...day.hours.map((h) => h.solarMW));
    fleet.wind.maxCapacityMW = Math.max(fleet.wind.maxCapacityMW, ...day.hours.map((h) => h.windMW));
    setFleetOutput(fleet.hydro, schedule.hydroMW);
    setFleetOutput(fleet.thermal, schedule.thermalMW);
    setFleetOutput(fleet.solar, schedule.solarMW);
    setFleetOutput(fleet.wind, schedule.windMW);
    baseLoadMW = schedule.demandMW;
  } else {
    simTimeSeconds = 12.0 * 3600;
    speedMultiplier = 1;
    setFleetOutput(fleet.hydro, 48000);
    setFleetOutput(fleet.thermal, 10000);
    setFleetOutput(fleet.solar, 12000);
    setFleetOutput(fleet.wind, 10000);
    baseLoadMW = 80000;
  }

  const kineticEnergyMWs = computeKineticEnergyMWs(fleet.hydro, fleet.thermal);
  const totalGen = totalGeneration(fleet);

  return {
    simTimeSeconds,
    elapsedSeconds: 0,
    speedMultiplier,
    eventSlowdownUntilSeconds: 0,
    isDayFinished: false,
    integratorRemainderSeconds: 0,
    frequencyHz: F_NOMINAL,
    rocofHzS: 0,
    equivalentInertiaH: totalGen > 0 ? kineticEnergyMWs / totalGen : 0,
    kineticEnergyMWs,
    hydro: fleet.hydro,
    thermal: fleet.thermal,
    solar: fleet.solar,
    wind: fleet.wind,
    baseLoadMW,
    actualLoadMW: baseLoadMW,
    shedLoadMW: 0,
    eracStage: 0,
    eracStageTimers: ERAC_STAGES.map(() => 0),
    eracRestoreTimerSeconds: 0,
    isBlackout: false,
    isOverfrequencyAlert: false,
    isIbrFrequencyWattActive: false,
    isPrimaryControlEnabled: true,
    hydroGovernorMW: 0,
    thermalGovernorMW: 0,
    isSecondaryControlEnabled: scenario === 'dia',
    secondaryControlMW: 0,
    hydroTrippedMW: 0,
    scheduledTrips: scenario === 'dia' ? DAY_SCHEDULED_TRIPS.filter((t) => t.atSeconds >= simTimeSeconds) : [],
    scenarioId: scenario,
    events: []
  };
}

function pushEvent(
  events: SimulationEvent[],
  kind: string,
  simTimeSeconds: number,
  type: SimulationEvent['type'],
  message: string
): void {
  events.unshift({
    id: `${kind}_${simTimeSeconds.toFixed(2)}`,
    timestampSeconds: simTimeSeconds,
    timeLabel: formatSimClock(simTimeSeconds),
    type,
    message
  });
}

function rampToward(current: number, target: number, maxRateMWs: number, dtSeconds: number): number {
  const maxDelta = maxRateMWs * dtSeconds;
  const diff = target - current;
  if (Math.abs(diff) <= maxDelta) return target;
  return current + Math.sign(diff) * maxDelta;
}

function availableIbrMW(fleet: PlantFleetState, derate: number): number {
  const potential = fleet.weatherPotentialMW ?? fleet.maxCapacityMW;
  const curtailRatio = 1 - (fleet.curtailmentPercent ?? 0) / 100;
  return potential * curtailRatio * (1 - derate);
}

export function frequencyWattDerate(frequencyHz: number): number {
  if (frequencyHz <= IBR_FREQUENCY_WATT_START_HZ) return 0;
  const deviationPu = (frequencyHz - IBR_FREQUENCY_WATT_START_HZ) / F_NOMINAL;
  return Math.min(1, deviationPu / IBR_FREQUENCY_WATT_DROOP);
}

export function primaryGovernorOffsetMW(frequencyHz: number, hydroMaxCapacityMW: number): number {
  const deviationPu = (frequencyHz - F_NOMINAL) / F_NOMINAL;
  const deltaMW = (-deviationPu / GOVERNOR_DROOP_R) * hydroMaxCapacityMW * GOVERNOR_PARTICIPATION;
  return Math.max(-PRIMARY_RESERVE_DOWN_MW, Math.min(PRIMARY_RESERVE_UP_MW, deltaMW));
}

export function thermalPrimaryGovernorOffsetMW(frequencyHz: number, thermalMaxCapacityMW: number): number {
  const deviationPu = (frequencyHz - F_NOMINAL) / F_NOMINAL;
  const deltaMW = (-deviationPu / GOVERNOR_DROOP_R) * thermalMaxCapacityMW * THERMAL_GOVERNOR_PARTICIPATION;
  return Math.max(-THERMAL_PRIMARY_RESERVE_MW, Math.min(THERMAL_PRIMARY_RESERVE_MW, deltaMW));
}

export function totalGovernorMWPerHz(hydroMaxCapacityMW: number, thermalMaxCapacityMW: number, thermalOnline = true): number {
  const hydroSlope = (hydroMaxCapacityMW * GOVERNOR_PARTICIPATION) / (GOVERNOR_DROOP_R * F_NOMINAL);
  const thermalSlope = thermalOnline
    ? (thermalMaxCapacityMW * THERMAL_GOVERNOR_PARTICIPATION) / (GOVERNOR_DROOP_R * F_NOMINAL)
    : 0;
  return hydroSlope + thermalSlope;
}

/** Integrates one fixed step of the aggregated single-bus swing equation (forward Euler). */
export function stepSimulation(state: GridSimulationState, dtSeconds: number): GridSimulationState {
  if (state.isBlackout || dtSeconds <= 0) {
    return state;
  }

  const newSimTime = state.simTimeSeconds + dtSeconds;
  const newElapsed = state.elapsedSeconds + dtSeconds;
  const events = [...state.events];

  let currentBaseLoad = state.baseLoadMW;
  const newSolar = { ...state.solar };
  const newWind = { ...state.wind };

  const newHydro = { ...state.hydro };
  const newThermal = { ...state.thermal };

  if (state.scenarioId === 'dia') {
    const schedule = dayScheduleAt(simulatorDay, newSimTime);
    newHydro.targetMW = Math.max(0, schedule.hydroMW - state.hydroTrippedMW);
    newThermal.targetMW = schedule.thermalMW;
    newSolar.weatherPotentialMW = schedule.solarMW;
    newSolar.targetMW = schedule.solarMW * (1 - (newSolar.curtailmentPercent ?? 0) / 100);
    newWind.weatherPotentialMW = schedule.windMW;
    newWind.targetMW = schedule.windMW * (1 - (newWind.curtailmentPercent ?? 0) / 100);
    currentBaseLoad = schedule.demandMW;
  }

  newHydro.committedMW = committedCapacityMW(newHydro.targetMW, newHydro.minTechnicalMW, newHydro.maxCapacityMW);
  newThermal.committedMW = committedCapacityMW(newThermal.targetMW, newThermal.minTechnicalMW, newThermal.maxCapacityMW);

  // First-order governor servomotor / distributor lag (τ_g = GOVERNOR_TAU_S)
  const alphaGov = Math.min(1, dtSeconds / GOVERNOR_TAU_S);
  const hydroGovSteadyMW = state.isPrimaryControlEnabled
    ? primaryGovernorOffsetMW(state.frequencyHz, newHydro.maxCapacityMW)
    : 0;
  const thermalGovSteadyMW = state.isPrimaryControlEnabled && newThermal.isOnline
    ? thermalPrimaryGovernorOffsetMW(state.frequencyHz, newThermal.maxCapacityMW)
    : 0;
  const hydroGovernorMW = state.isPrimaryControlEnabled
    ? state.hydroGovernorMW + (hydroGovSteadyMW - state.hydroGovernorMW) * alphaGov
    : 0;
  const thermalGovernorMW = state.isPrimaryControlEnabled && newThermal.isOnline
    ? state.thermalGovernorMW + (thermalGovSteadyMW - state.thermalGovernorMW) * alphaGov
    : 0;

  const hydroTargetWith = (cagMW: number) =>
    Math.max(newHydro.minTechnicalMW, Math.min(newHydro.maxCapacityMW, newHydro.targetMW + cagMW + hydroGovernorMW));

  let secondaryControlMW = 0;
  if (state.isSecondaryControlEnabled) {
    // Single-area ACE = β·Δf with β the natural response (droop + load damping); ΔP_C = −(1/T)∫ACE dt
    const governorMWPerHz = state.isPrimaryControlEnabled
      ? totalGovernorMWPerHz(newHydro.maxCapacityMW, newThermal.maxCapacityMW, newThermal.isOnline)
      : 0;
    const biasMWPerHz = governorMWPerHz + (LOAD_DAMPING_D * state.actualLoadMW) / F_NOMINAL;
    const aceMW = biasMWPerHz * (state.frequencyHz - F_NOMINAL);
    const capacityBounded = (mw: number) =>
      Math.max(newHydro.minTechnicalMW - newHydro.targetMW, Math.min(newHydro.maxCapacityMW - newHydro.targetMW, mw));
    const candidate = capacityBounded(state.secondaryControlMW - (aceMW / SECONDARY_CONTROL_TIME_S) * dtSeconds);
    // Conditional integration: while the fleet is ramp-limited, integrating further only winds up an overshoot
    const pendingRampMW = hydroTargetWith(candidate) - newHydro.actualMW;
    const isRampLimited = Math.abs(pendingRampMW) > newHydro.rampRateMWs * dtSeconds;
    const pushesSameWay = Math.sign(candidate - state.secondaryControlMW) === Math.sign(pendingRampMW);
    secondaryControlMW = isRampLimited && pushesSameWay ? capacityBounded(state.secondaryControlMW) : candidate;
  }

  newHydro.actualMW = rampToward(newHydro.actualMW, hydroTargetWith(secondaryControlMW), newHydro.rampRateMWs, dtSeconds);

  const thermalEffectiveTarget = newThermal.isOnline
    ? Math.max(newThermal.minTechnicalMW, Math.min(newThermal.maxCapacityMW, newThermal.targetMW + thermalGovernorMW))
    : 0;
  newThermal.actualMW = rampToward(newThermal.actualMW, thermalEffectiveTarget, newThermal.rampRateMWs, dtSeconds);

  const ibrDerate = frequencyWattDerate(state.frequencyHz);
  newSolar.actualMW = rampToward(
    newSolar.actualMW,
    Math.min(newSolar.targetMW, availableIbrMW(newSolar, ibrDerate)),
    newSolar.rampRateMWs,
    dtSeconds
  );
  newWind.actualMW = rampToward(
    newWind.actualMW,
    Math.min(newWind.targetMW, availableIbrMW(newWind, ibrDerate)),
    newWind.rampRateMWs,
    dtSeconds
  );

  const isIbrFrequencyWattActive = ibrDerate > 0;
  if (isIbrFrequencyWattActive && !state.isIbrFrequencyWattActive) {
    pushEvent(events, 'ibr_pf_on', newSimTime, 'alert',
      `Sobrefrequência (f > ${IBR_FREQUENCY_WATT_START_HZ.toFixed(1)} Hz): inversores solares/eólicos reduzem potência ativa pela curva P(f).`);
  } else if (!isIbrFrequencyWattActive && state.isIbrFrequencyWattActive) {
    pushEvent(events, 'ibr_pf_off', newSimTime, 'success',
      'Frequência normalizada: inversores liberam a potência ativa retida pela curva P(f).');
  }

  const totalGenMW = newHydro.actualMW + newThermal.actualMW + newSolar.actualMW + newWind.actualMW;
  const kineticEnergyMWs = computeKineticEnergyMWs(newHydro, newThermal);
  const equivalentInertiaH = totalGenMW > 0 ? kineticEnergyMWs / totalGenMW : 0;

  let eracStage = state.eracStage;
  const eracStageTimers = ERAC_STAGES.map((stage, idx) => {
    const prevTimer = state.eracStageTimers[idx] ?? 0;
    if (idx < eracStage) return ERAC_PICKUP_SECONDS;
    return state.frequencyHz <= stage.thresholdHz ? prevTimer + dtSeconds : 0;
  });
  let eracRestoreTimerSeconds = state.eracRestoreTimerSeconds;

  while (
    eracStage < ERAC_STAGES.length &&
    state.frequencyHz <= ERAC_STAGES[eracStage].thresholdHz &&
    eracStageTimers[eracStage] >= ERAC_PICKUP_SECONDS - 1e-9
  ) {
    const stage = ERAC_STAGES[eracStage];
    eracStage += 1;
    eracRestoreTimerSeconds = 0;
    pushEvent(events, `erac_${eracStage}`, newSimTime, 'critical',
      `ERAC Estágio ${eracStage} (f ≤ ${stage.thresholdHz.toFixed(1)} Hz por ${Math.round(ERAC_PICKUP_SECONDS * 1000)} ms): corte de ${stage.shedPercent}% da carga (${eracShedPercent(eracStage)}% acumulado).`);
  }

  if (eracStage > 0 && state.frequencyHz >= ERAC_RESTORE_THRESHOLD_HZ) {
    eracRestoreTimerSeconds += dtSeconds;
    if (eracRestoreTimerSeconds >= ERAC_RESTORE_DELAY_SECONDS - 1e-9) {
      const restoredStage = ERAC_STAGES[eracStage - 1];
      eracStage -= 1;
      eracStageTimers[eracStage] = 0;
      eracRestoreTimerSeconds = 0;
      pushEvent(events, `erac_restore_${eracStage}`, newSimTime, 'success',
        `Recomposição pós-ERAC: frequência sustentada ≥ ${ERAC_RESTORE_THRESHOLD_HZ.toFixed(1)} Hz; religado ${restoredStage.shedPercent}% da carga (estágio ${eracStage + 1}).`);
    }
  } else if (state.frequencyHz < ERAC_RESTORE_THRESHOLD_HZ) {
    eracRestoreTimerSeconds = 0;
  }

  const shedLoadMW = Math.round(currentBaseLoad * (eracShedPercent(eracStage) / 100));
  const actualLoadMW = currentBaseLoad - shedLoadMW;

  const freqDeviationPu = (state.frequencyHz - F_NOMINAL) / F_NOMINAL;
  const frequencyDependentLoadMW = actualLoadMW * (1 + LOAD_DAMPING_D * freqDeviationPu);
  const powerMismatchMW = totalGenMW - frequencyDependentLoadMW;

  let isBlackout = false;
  let blackoutCause: BlackoutCause | undefined;
  let rocofHzS = 0;
  let newFreq = state.frequencyHz;

  if (kineticEnergyMWs <= 0) {
    isBlackout = true;
    blackoutCause = 'sync_loss';
    pushEvent(events, 'blackout_sync', newSimTime, 'critical', 'APAGÃO SISTÊMICO: nenhuma máquina síncrona em operação.');
  } else {
    rocofHzS = (F_NOMINAL * powerMismatchMW) / (2 * kineticEnergyMWs);
    newFreq = state.frequencyHz + rocofHzS * dtSeconds;
  }

  if (!isBlackout && newFreq <= UNDERFREQUENCY_COLLAPSE_HZ) {
    isBlackout = true;
    blackoutCause = 'underfrequency';
    pushEvent(events, 'blackout_under', newSimTime, 'critical',
      `APAGÃO SISTÊMICO: frequência abaixo de ${UNDERFREQUENCY_COLLAPSE_HZ.toFixed(1)} Hz. Desligamento em cascata dos geradores.`);
  } else if (!isBlackout && newFreq >= OVERFREQUENCY_COLLAPSE_HZ) {
    isBlackout = true;
    blackoutCause = 'overfrequency';
    pushEvent(events, 'blackout_over', newSimTime, 'critical',
      `APAGÃO SISTÊMICO: frequência acima de ${OVERFREQUENCY_COLLAPSE_HZ.toFixed(1)} Hz. Trip por sobrevelocidade.`);
  }

  return {
    ...state,
    simTimeSeconds: newSimTime,
    elapsedSeconds: newElapsed,
    frequencyHz: newFreq,
    rocofHzS,
    equivalentInertiaH,
    kineticEnergyMWs,
    hydro: newHydro,
    thermal: newThermal,
    solar: newSolar,
    wind: newWind,
    baseLoadMW: currentBaseLoad,
    actualLoadMW,
    shedLoadMW,
    eracStage,
    eracStageTimers,
    eracRestoreTimerSeconds,
    isBlackout,
    blackoutCause,
    isOverfrequencyAlert: newFreq >= OVERFREQUENCY_ALERT_HZ,
    isIbrFrequencyWattActive,
    hydroGovernorMW,
    thermalGovernorMW,
    secondaryControlMW,
    events: events.slice(0, 40)
  };
}

export function effectiveSpeed(state: GridSimulationState): number {
  if (state.speedMultiplier === 0) return 0;
  return state.simTimeSeconds < state.eventSlowdownUntilSeconds
    ? Math.min(state.speedMultiplier, EVENT_SPEED)
    : state.speedMultiplier;
}

/** Advances the simulation by one rendered frame using fixed sub-steps. */
export function advanceSimulation(state: GridSimulationState, frameSeconds: number): GridSimulationState {
  const speed = effectiveSpeed(state);
  if (state.isBlackout || state.isDayFinished || speed === 0 || frameSeconds <= 0) {
    return state;
  }

  const budget = state.integratorRemainderSeconds + Math.min(frameSeconds, MAX_FRAME_SECONDS) * speed;
  // Epsilon absorbs float error so a 0.03 s budget yields three steps, not two
  const steps = Math.floor(budget / SIM_STEP_SECONDS + 1e-9);

  let next = state;
  for (let i = 0; i < steps && !next.isBlackout; i++) {
    const [trip, ...remainingTrips] = next.scheduledTrips;
    if (trip && next.simTimeSeconds >= trip.atSeconds) {
      // The rest of this frame's budget was sized for the accelerated clock; drop it and resume in slow motion
      return { ...applyGeneratorTrip({ ...next, scheduledTrips: remainingTrips }, trip.mw), integratorRemainderSeconds: 0 };
    }
    if (next.scenarioId === 'dia' && next.simTimeSeconds >= DAY_END_SECONDS) {
      return { ...next, isDayFinished: true, integratorRemainderSeconds: 0 };
    }
    next = stepSimulation(next, SIM_STEP_SECONDS);
  }

  return { ...next, integratorRemainderSeconds: Math.max(0, budget - steps * SIM_STEP_SECONDS) };
}

/** Trips synchronous hydro units: output, setpoint, committed capacity and available capacity are lost together. */
export function applyGeneratorTrip(state: GridSimulationState, tripMW: number): GridSimulationState {
  const lostMW = Math.min(tripMW, state.hydro.actualMW);
  const maxCapacityMW = Math.max(0, state.hydro.maxCapacityMW - lostMW);
  const targetMW = Math.min(state.hydro.targetMW - lostMW, maxCapacityMW);
  const minTechnicalMW = Math.min(state.hydro.minTechnicalMW, maxCapacityMW);
  const committedMW = Math.max(minTechnicalMW, Math.min(maxCapacityMW, state.hydro.committedMW - lostMW));
  const events = [...state.events];
  pushEvent(events, 'trip', state.simTimeSeconds, 'critical',
    `CONTINGÊNCIA: desligamento intempestivo de ${lostMW.toLocaleString(getNumberLocale())} MW em unidades hidrelétricas. A inércia e a reserva dessas máquinas saem junto.`);

  return {
    ...state,
    hydroTrippedMW: state.hydroTrippedMW + lostMW,
    eventSlowdownUntilSeconds:
      state.scenarioId === 'dia' ? state.simTimeSeconds + EVENT_SLOWDOWN_SECONDS : state.eventSlowdownUntilSeconds,
    hydro: {
      ...state.hydro,
      actualMW: state.hydro.actualMW - lostMW,
      targetMW,
      committedMW,
      maxCapacityMW,
      minTechnicalMW
    },
    events: events.slice(0, 40)
  };
}
