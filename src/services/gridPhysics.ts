export interface PlantFleetState {
  // Current active output in MW
  actualMW: number;
  // Operator target setpoint in MW
  targetMW: number;
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
  // Speed multiplier: 0 (paused), 1x, 2x, 5x, 10x
  speedMultiplier: number;
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
  isBlackout: boolean;
  blackoutReason?: string;
  isOverfrequencyAlert: boolean;
  isIbrFrequencyWattActive: boolean;

  // Primary Frequency Control (Droop Governor) toggle
  isPrimaryControlEnabled: boolean;

  // Scenario
  scenarioId: 'pato' | 'trip_itaipu' | 'alta_renovavel' | 'livre';

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
export const PRIMARY_RESERVE_UP_MW = 6000;
export const PRIMARY_RESERVE_DOWN_MW = 5000;

// Grid-code P(f) curtailment: inverters shed active power above this threshold
export const IBR_FREQUENCY_WATT_START_HZ = 60.2;
export const IBR_FREQUENCY_WATT_DROOP = 0.05;

export interface EracStage {
  thresholdHz: number;
  shedPercent: number;
}

// ONS uniform ERAC settings (SE/CO, S, NE), "Análise do desempenho do ERAC — Perturbação de 15/08/2023", ONS.
// Stage timers (~100–200 ms relay pickup) are not modelled.
export const ERAC_STAGES: readonly EracStage[] = [
  { thresholdHz: 58.5, shedPercent: 5 },
  { thresholdHz: 58.2, shedPercent: 6 },
  { thresholdHz: 57.9, shedPercent: 7 },
  { thresholdHz: 57.7, shedPercent: 8 },
  { thresholdHz: 57.5, shedPercent: 9 }
];

// Didactic collapse limits: below the last ERAC stage, thermal and hydro unit protections trip in cascade
export const UNDERFREQUENCY_COLLAPSE_HZ = 56.5;
export const OVERFREQUENCY_COLLAPSE_HZ = 62.5;
export const OVERFREQUENCY_ALERT_HZ = 60.5;

export function eracShedPercent(stage: number): number {
  return ERAC_STAGES.slice(0, stage).reduce((sum, s) => sum + s.shedPercent, 0);
}

export function computeKineticEnergyMWs(hydro: PlantFleetState, thermal: PlantFleetState): number {
  // Aggregate fleets are assumed committed at nominal loading, so online MVA tracks dispatched MW
  return hydro.actualMW * hydro.inertiaH + thermal.actualMW * thermal.inertiaH;
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

export function calculateSolarPotentialAtTime(timeSeconds: number, maxCapacityMW: number): number {
  const hours = ((timeSeconds % 86400) + 86400) % 86400 / 3600;
  // Solar daylight window: 06:00 to 18:45
  if (hours < 6.0 || hours > 18.75) return 0;
  const peak = 12.5;
  const spread = 3.6;
  const bell = Math.exp(-0.5 * Math.pow((hours - peak) / spread, 2));
  // Fast evening cutoff between 17:30 and 18:45
  if (hours >= 17.5) {
    const duskProgress = (hours - 17.5) / 1.25; // 0 to 1
    const factor = Math.max(0, 1 - Math.pow(duskProgress, 1.2));
    return maxCapacityMW * 0.85 * bell * factor;
  }
  return Math.min(maxCapacityMW, maxCapacityMW * 0.95 * bell);
}

// Hourly load shape normalized to the daily peak: overnight valley at 04h, afternoon plateau, evening peak at 19h
const LOAD_PROFILE: readonly [hour: number, factor: number][] = [
  [0, 0.78], [4, 0.66], [7, 0.76], [10, 0.89], [14, 0.95], [17, 0.94], [19, 1.0], [21, 0.95], [24, 0.78]
];

export function calculateLoadAtTime(timeSeconds: number, basePeakMW = 88000): number {
  const hours = ((timeSeconds % 86400) + 86400) % 86400 / 3600;
  const upper = LOAD_PROFILE.findIndex(([h]) => h > hours);
  const [h0, f0] = LOAD_PROFILE[upper - 1];
  const [h1, f1] = LOAD_PROFILE[upper];
  // Cosine interpolation keeps the curve's derivative continuous at each anchor hour
  const t = (1 - Math.cos(((hours - h0) / (h1 - h0)) * Math.PI)) / 2;
  return Math.round(basePeakMW * (f0 + (f1 - f0) * t));
}

export function createInitialSimulation(scenario: GridSimulationState['scenarioId'] = 'pato'): GridSimulationState {
  const fleet = createInitialFleet();
  let simTimeSeconds = 17.5 * 3600; // 17:30:00 BRT
  let baseLoadMW = 80000;
  const events: SimulationEvent[] = [];

  if (scenario === 'pato') {
    simTimeSeconds = 17.5 * 3600; // 17:30:00
    baseLoadMW = calculateLoadAtTime(simTimeSeconds, 88000);
    const solarPot = calculateSolarPotentialAtTime(simTimeSeconds, fleet.solar.maxCapacityMW);
    fleet.solar.weatherPotentialMW = solarPot;
    fleet.solar.actualMW = solarPot;
    fleet.solar.targetMW = solarPot;

    fleet.wind.weatherPotentialMW = 11000;
    fleet.wind.actualMW = 11000;
    fleet.wind.targetMW = 11000;
    fleet.thermal.actualMW = 10000;
    fleet.thermal.targetMW = 10000;
    fleet.hydro.actualMW = baseLoadMW - (fleet.solar.actualMW + fleet.wind.actualMW + fleet.thermal.actualMW);
    fleet.hydro.targetMW = fleet.hydro.actualMW;

    events.push({
      id: 'init_pato',
      timestampSeconds: simTimeSeconds,
      timeLabel: formatSimClock(simTimeSeconds),
      type: 'info',
      message: 'Cenário Iniciado: O Crepúsculo Solar (Curva do Pato). Despache hidrelétricas para compensar a perda solar.'
    });
  } else if (scenario === 'trip_itaipu') {
    simTimeSeconds = 14.0 * 3600; // 14:00:00
    baseLoadMW = 82000;
    fleet.solar.weatherPotentialMW = 20000;
    fleet.solar.actualMW = 20000;
    fleet.solar.targetMW = 20000;
    fleet.wind.weatherPotentialMW = 10000;
    fleet.wind.actualMW = 10000;
    fleet.wind.targetMW = 10000;
    fleet.thermal.actualMW = 10000;
    fleet.thermal.targetMW = 10000;
    fleet.hydro.actualMW = 42000;
    fleet.hydro.targetMW = 42000;

    events.push({
      id: 'init_trip',
      timestampSeconds: simTimeSeconds,
      timeLabel: formatSimClock(simTimeSeconds),
      type: 'warning',
      message: 'Cenário Pronto: Dispare a perda súbita de usina de 2.800 MW para avaliar a resposta inercial e o RoCoF.'
    });
  } else if (scenario === 'alta_renovavel') {
    simTimeSeconds = 12.0 * 3600; // 12:00:00
    baseLoadMW = 74000;
    fleet.solar.maxCapacityMW = 35000;
    fleet.solar.weatherPotentialMW = 32000;
    fleet.solar.actualMW = 32000;
    fleet.solar.targetMW = 32000;

    fleet.wind.maxCapacityMW = 30000;
    fleet.wind.weatherPotentialMW = 26000;
    fleet.wind.actualMW = 26000;
    fleet.wind.targetMW = 26000;

    fleet.thermal.actualMW = fleet.thermal.minTechnicalMW; // 6000 MW minimum
    fleet.thermal.targetMW = fleet.thermal.minTechnicalMW;
    fleet.hydro.actualMW = 10000; // Recuo forçado das hidrelétricas
    fleet.hydro.targetMW = 10000;

    events.push({
      id: 'init_low_inertia',
      timestampSeconds: simTimeSeconds,
      timeLabel: formatSimClock(simTimeSeconds),
      type: 'alert',
      message: 'Cenário Crítico: 78% da matriz em IBR (Solar/Eólica). Inércia equivalente do SIN reduzida para ~1,0 s. Risco de alta volatilidade.'
    });
  } else {
    // Livre / Sandbox
    simTimeSeconds = 12.0 * 3600;
    baseLoadMW = 80000;
    fleet.hydro.actualMW = 48000;
    fleet.hydro.targetMW = 48000;
    fleet.thermal.actualMW = 10000;
    fleet.thermal.targetMW = 10000;
    fleet.solar.weatherPotentialMW = 12000;
    fleet.solar.actualMW = 12000;
    fleet.solar.targetMW = 12000;
    fleet.wind.weatherPotentialMW = 10000;
    fleet.wind.actualMW = 10000;
    fleet.wind.targetMW = 10000;

    events.push({
      id: 'init_livre',
      timestampSeconds: simTimeSeconds,
      timeLabel: formatSimClock(simTimeSeconds),
      type: 'info',
      message: 'Modo Sandbox ativado. Todos os limites e comandos de despacho liberados para manipulação manual.'
    });
  }

  const kineticEnergyMWs = computeKineticEnergyMWs(fleet.hydro, fleet.thermal);
  const totalGen = totalGeneration(fleet);

  return {
    simTimeSeconds,
    elapsedSeconds: 0,
    speedMultiplier: 1,
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
    isBlackout: false,
    isOverfrequencyAlert: false,
    isIbrFrequencyWattActive: false,
    isPrimaryControlEnabled: true,
    scenarioId: scenario,
    events
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

  if (state.scenarioId === 'pato') {
    newSolar.weatherPotentialMW = calculateSolarPotentialAtTime(newSimTime, newSolar.maxCapacityMW);
    newSolar.targetMW = newSolar.weatherPotentialMW * (1 - (newSolar.curtailmentPercent ?? 0) / 100);
    currentBaseLoad = calculateLoadAtTime(newSimTime, 88000);
  } else if (state.scenarioId === 'alta_renovavel') {
    const windNoise = Math.sin(newElapsed * 0.15) * 600;
    newWind.weatherPotentialMW = Math.min(newWind.maxCapacityMW, Math.max(10000, 26000 + windNoise));
    newWind.targetMW = newWind.weatherPotentialMW * (1 - (newWind.curtailmentPercent ?? 0) / 100);
  }

  const hydroGovernorOffsetMW = state.isPrimaryControlEnabled
    ? primaryGovernorOffsetMW(state.frequencyHz, state.hydro.maxCapacityMW)
    : 0;

  const newHydro = { ...state.hydro };
  const hydroEffectiveTarget = Math.max(
    newHydro.minTechnicalMW,
    Math.min(newHydro.maxCapacityMW, newHydro.targetMW + hydroGovernorOffsetMW)
  );
  newHydro.actualMW = rampToward(newHydro.actualMW, hydroEffectiveTarget, newHydro.rampRateMWs, dtSeconds);

  const newThermal = { ...state.thermal };
  const thermalEffectiveTarget = newThermal.isOnline
    ? Math.max(newThermal.minTechnicalMW, Math.min(newThermal.maxCapacityMW, newThermal.targetMW))
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
  while (eracStage < ERAC_STAGES.length && state.frequencyHz <= ERAC_STAGES[eracStage].thresholdHz) {
    const stage = ERAC_STAGES[eracStage];
    eracStage += 1;
    pushEvent(events, `erac_${eracStage}`, newSimTime, 'critical',
      `ERAC Estágio ${eracStage} (f ≤ ${stage.thresholdHz.toFixed(1)} Hz): corte de ${stage.shedPercent}% da carga (${eracShedPercent(eracStage)}% acumulado).`);
  }

  const shedLoadMW = Math.round(currentBaseLoad * (eracShedPercent(eracStage) / 100));
  const actualLoadMW = currentBaseLoad - shedLoadMW;

  const freqDeviationPu = (state.frequencyHz - F_NOMINAL) / F_NOMINAL;
  const frequencyDependentLoadMW = actualLoadMW * (1 + LOAD_DAMPING_D * freqDeviationPu);
  const powerMismatchMW = totalGenMW - frequencyDependentLoadMW;

  let isBlackout = false;
  let blackoutReason: string | undefined;
  let rocofHzS = 0;
  let newFreq = state.frequencyHz;

  if (kineticEnergyMWs <= 0) {
    isBlackout = true;
    blackoutReason = 'Perda de todas as máquinas síncronas: sem inércia, não há referência de frequência para o sistema.';
    pushEvent(events, 'blackout_sync', newSimTime, 'critical', 'APAGÃO SISTÊMICO: nenhuma máquina síncrona em operação.');
  } else {
    rocofHzS = (F_NOMINAL * powerMismatchMW) / (2 * kineticEnergyMWs);
    newFreq = state.frequencyHz + rocofHzS * dtSeconds;
  }

  if (!isBlackout && newFreq <= UNDERFREQUENCY_COLLAPSE_HZ) {
    isBlackout = true;
    blackoutReason = `Colapso por subfrequência (f < ${UNDERFREQUENCY_COLLAPSE_HZ.toFixed(1)} Hz): o ERAC esgotou seus ${ERAC_STAGES.length} estágios e as proteções das unidades geradoras atuaram em cascata.`;
    pushEvent(events, 'blackout_under', newSimTime, 'critical',
      `APAGÃO SISTÊMICO: frequência abaixo de ${UNDERFREQUENCY_COLLAPSE_HZ.toFixed(1)} Hz. Desligamento em cascata dos geradores.`);
  } else if (!isBlackout && newFreq >= OVERFREQUENCY_COLLAPSE_HZ) {
    isBlackout = true;
    blackoutReason = `Colapso por sobrefrequência (f > ${OVERFREQUENCY_COLLAPSE_HZ.toFixed(1)} Hz): proteção de sobrevelocidade das turbinas desligou as unidades síncronas.`;
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
    isBlackout,
    blackoutReason,
    isOverfrequencyAlert: newFreq >= OVERFREQUENCY_ALERT_HZ,
    isIbrFrequencyWattActive,
    events: events.slice(0, 40)
  };
}

/** Advances the simulation by one rendered frame using fixed sub-steps. */
export function advanceSimulation(state: GridSimulationState, frameSeconds: number): GridSimulationState {
  if (state.isBlackout || state.speedMultiplier === 0 || frameSeconds <= 0) {
    return state;
  }

  const budget = state.integratorRemainderSeconds + Math.min(frameSeconds, MAX_FRAME_SECONDS) * state.speedMultiplier;
  // Epsilon absorbs float error so a 0.03 s budget yields three steps, not two
  const steps = Math.floor(budget / SIM_STEP_SECONDS + 1e-9);

  let next = state;
  for (let i = 0; i < steps && !next.isBlackout; i++) {
    next = stepSimulation(next, SIM_STEP_SECONDS);
  }

  return { ...next, integratorRemainderSeconds: Math.max(0, budget - steps * SIM_STEP_SECONDS) };
}

/** Trips synchronous hydro units: output, setpoint and available capacity are lost together. */
export function applyGeneratorTrip(state: GridSimulationState, tripMW: number): GridSimulationState {
  const lostMW = Math.min(tripMW, state.hydro.actualMW);
  const maxCapacityMW = Math.max(0, state.hydro.maxCapacityMW - lostMW);
  const events = [...state.events];
  pushEvent(events, 'trip', state.simTimeSeconds, 'critical',
    `CONTINGÊNCIA: desligamento intempestivo de ${lostMW.toLocaleString('pt-BR')} MW em unidades hidrelétricas. A inércia e a reserva dessas máquinas saem junto.`);

  return {
    ...state,
    hydro: {
      ...state.hydro,
      actualMW: state.hydro.actualMW - lostMW,
      targetMW: Math.min(state.hydro.targetMW - lostMW, maxCapacityMW),
      maxCapacityMW,
      minTechnicalMW: Math.min(state.hydro.minTechnicalMW, maxCapacityMW)
    },
    events: events.slice(0, 40)
  };
}
