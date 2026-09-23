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
  // Real clock delta elapsed
  elapsedSeconds: number;
  // Speed multiplier: 0 (paused), 1x, 2x, 5x, 10x
  speedMultiplier: number;

  // Active frequency in Hz
  frequencyHz: number;
  // Rate of Change of Frequency in Hz/s
  rocofHzS: number;
  // Equivalent inertia constant H_eq in seconds
  equivalentInertiaH: number;

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
  eracStage: 0 | 1 | 2 | 3;
  isBlackout: boolean;
  blackoutReason?: string;
  isOverfrequencyAlert: boolean;

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

// Nominal Constants
export const F_NOMINAL = 60.00;
export const SYSTEM_BASE_MVA = 100000; // 100 GW SIN reference base
export const LOAD_DAMPING_D = 1.5; // 1.5% load damping per Hz deviation (0.015 p.u./Hz)

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

export function calculateLoadAtTime(timeSeconds: number, basePeakMW = 88000): number {
  const hours = ((timeSeconds % 86400) + 86400) % 86400 / 3600;
  // 24h Brazilian load profile: valley at 04h (~58 GW), afternoon dip (~78 GW), peak at 19h30 (~88 GW)
  const valley = basePeakMW * 0.65;
  const eveningPeak = basePeakMW;
  const normSin = Math.sin(((hours - 4) / 15.5) * Math.PI);
  let load = valley + (eveningPeak - valley) * Math.max(0, normSin);

  // Peak evening surge 17:30 to 20:30 (residential + commerce overlap)
  if (hours >= 17.5 && hours <= 21.5) {
    const eveningBoost = Math.sin(((hours - 17.5) / 4) * Math.PI) * (basePeakMW * 0.08);
    load += eveningBoost;
  }
  return Math.round(load);
}

export function createInitialSimulation(scenario: GridSimulationState['scenarioId'] = 'pato'): GridSimulationState {
  const fleet = createInitialFleet();
  let simTimeSeconds = 17.5 * 3600; // 17:30:00 BRT
  let baseLoadMW = 80000;
  const events: SimulationEvent[] = [];

  if (scenario === 'pato') {
    simTimeSeconds = 17.5 * 3600; // 17:30:00
    baseLoadMW = 78000;
    const solarPot = calculateSolarPotentialAtTime(simTimeSeconds, fleet.solar.maxCapacityMW);
    fleet.solar.weatherPotentialMW = solarPot;
    fleet.solar.actualMW = solarPot;
    fleet.solar.targetMW = solarPot;

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
    fleet.solar.actualMW = 20000;
    fleet.solar.targetMW = 20000;
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
      message: 'Cenário Crítico: 78% da matriz em IBR (Solar/Eólica). Inércia do SIN reduzida para ~1.4s. Risco de alta volatilidade.'
    });
  } else {
    // Livre / Sandbox
    simTimeSeconds = 12.0 * 3600;
    baseLoadMW = 80000;
    fleet.hydro.actualMW = 48000;
    fleet.hydro.targetMW = 48000;
    fleet.thermal.actualMW = 10000;
    fleet.thermal.targetMW = 10000;
    fleet.solar.actualMW = 12000;
    fleet.solar.targetMW = 12000;
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

  // Calculate initial inertia
  const totalGen = fleet.hydro.actualMW + fleet.thermal.actualMW + fleet.solar.actualMW + fleet.wind.actualMW;
  const eqH = totalGen > 0
    ? (fleet.hydro.actualMW * fleet.hydro.inertiaH + fleet.thermal.actualMW * fleet.thermal.inertiaH) / totalGen
    : 4.0;

  return {
    simTimeSeconds,
    elapsedSeconds: 0,
    speedMultiplier: 1,
    frequencyHz: F_NOMINAL,
    rocofHzS: 0,
    equivalentInertiaH: Number(eqH.toFixed(2)),
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
    isPrimaryControlEnabled: true,
    scenarioId: scenario,
    events
  };
}

export function stepSimulation(state: GridSimulationState, dtSeconds: number): GridSimulationState {
  if (state.isBlackout || state.speedMultiplier === 0 || dtSeconds <= 0) {
    return state;
  }

  const effectiveDt = dtSeconds * state.speedMultiplier;
  const newSimTime = state.simTimeSeconds + effectiveDt;
  const newElapsed = state.elapsedSeconds + effectiveDt;
  const events = [...state.events];

  // 1. Dynamic weather & scenario updates
  let currentBaseLoad = state.baseLoadMW;
  const newSolar = { ...state.solar };
  const newWind = { ...state.wind };

  if (state.scenarioId === 'pato') {
    // Dynamic solar depletion and load increase according to Brasília daylight
    const pot = calculateSolarPotentialAtTime(newSimTime, newSolar.maxCapacityMW);
    newSolar.weatherPotentialMW = pot;
    const curtailed = pot * (1 - (newSolar.curtailmentPercent || 0) / 100);
    newSolar.targetMW = curtailed;

    currentBaseLoad = calculateLoadAtTime(newSimTime, 88000);
  } else if (state.scenarioId === 'alta_renovavel') {
    // Wind gusts / slight stochastic variation
    const windNoise = Math.sin(newElapsed * 0.15) * 600;
    const potWind = Math.min(newWind.maxCapacityMW, Math.max(10000, 26000 + windNoise));
    newWind.weatherPotentialMW = potWind;
    newWind.targetMW = potWind * (1 - (newWind.curtailmentPercent || 0) / 100);
  }

  // 2. Primary Frequency Governor Response (Droop R = 5%)
  let hydroGovernorOffsetMW = 0;
  if (state.isPrimaryControlEnabled) {
    const freqDev = state.frequencyHz - F_NOMINAL;
    // If f < 60 Hz, governor injects power: deltaP = - (1/R) * (df/f0) * P_nom
    // Droop R = 0.05 -> df = -0.1 Hz -> df/f0 = -0.00166 -> deltaP_pu = +0.033 -> ~+2500 MW
    const droopR = 0.05;
    const deltaPu = -(freqDev / F_NOMINAL) / droopR;
    hydroGovernorOffsetMW = Math.max(-5000, Math.min(6000, deltaPu * state.hydro.maxCapacityMW * 0.6));
  }

  // 3. Ramp generator outputs toward setpoints
  const stepRamp = (current: number, target: number, maxRateMWs: number) => {
    const maxDelta = maxRateMWs * effectiveDt;
    const diff = target - current;
    if (Math.abs(diff) <= maxDelta) return target;
    return current + Math.sign(diff) * maxDelta;
  };

  const newHydro = { ...state.hydro };
  const hydroEffectiveTarget = Math.max(
    newHydro.minTechnicalMW,
    Math.min(newHydro.maxCapacityMW, newHydro.targetMW + hydroGovernorOffsetMW)
  );
  newHydro.actualMW = stepRamp(newHydro.actualMW, hydroEffectiveTarget, newHydro.rampRateMWs);

  const newThermal = { ...state.thermal };
  // Thermal plants cannot operate below minTechnicalMW when online
  const thermalEffectiveTarget = newThermal.isOnline
    ? Math.max(newThermal.minTechnicalMW, Math.min(newThermal.maxCapacityMW, newThermal.targetMW))
    : 0;
  newThermal.actualMW = stepRamp(newThermal.actualMW, thermalEffectiveTarget, newThermal.rampRateMWs);

  // Solar and Wind inverters follow curtailment / target fast
  const solarMaxAvail = newSolar.weatherPotentialMW !== undefined ? newSolar.weatherPotentialMW : newSolar.maxCapacityMW;
  const solarCurtailRatio = 1 - (newSolar.curtailmentPercent || 0) / 100;
  const solarCap = solarMaxAvail * solarCurtailRatio;
  newSolar.actualMW = stepRamp(newSolar.actualMW, Math.min(newSolar.targetMW, solarCap), newSolar.rampRateMWs);

  const windMaxAvail = newWind.weatherPotentialMW !== undefined ? newWind.weatherPotentialMW : newWind.maxCapacityMW;
  const windCurtailRatio = 1 - (newWind.curtailmentPercent || 0) / 100;
  const windCap = windMaxAvail * windCurtailRatio;
  newWind.actualMW = stepRamp(newWind.actualMW, Math.min(newWind.targetMW, windCap), newWind.rampRateMWs);

  // Total generation
  const totalGenMW = (newHydro.actualMW + newThermal.actualMW + newSolar.actualMW + newWind.actualMW);

  // 4. Calculate Dynamic Equivalent Inertia H_eq
  // Synchronous generators contribute mechanical inertia; IBRs contribute zero
  const syncInertiaSum = newHydro.actualMW * newHydro.inertiaH + newThermal.actualMW * newThermal.inertiaH;
  const equivalentInertiaH = totalGenMW > 0
    ? Math.max(1.0, syncInertiaSum / totalGenMW)
    : 4.0;

  // 5. ERAC (Underfrequency Load Shedding Stages)
  let eracStage = state.eracStage;
  let shedPercent = 0;
  if (eracStage >= 1) shedPercent += 5;
  if (eracStage >= 2) shedPercent += 5;
  if (eracStage >= 3) shedPercent += 5;

  const timeLabel = formatSimClock(newSimTime);

  if (state.frequencyHz <= 59.50 && eracStage === 0) {
    eracStage = 1;
    shedPercent = 5;
    events.unshift({
      id: `erac_1_${newElapsed.toFixed(0)}`,
      timestampSeconds: newSimTime,
      timeLabel,
      type: 'critical',
      message: 'ERAC Estágio 1 Acionado (f <= 59.50 Hz): Corte compulsório de 5% da carga do SIN.'
    });
  } else if (state.frequencyHz <= 59.30 && eracStage === 1) {
    eracStage = 2;
    shedPercent = 10;
    events.unshift({
      id: `erac_2_${newElapsed.toFixed(0)}`,
      timestampSeconds: newSimTime,
      timeLabel,
      type: 'critical',
      message: 'ERAC Estágio 2 Acionado (f <= 59.30 Hz): Corte adicional de 5% da carga (10% total).'
    });
  } else if (state.frequencyHz <= 59.10 && eracStage === 2) {
    eracStage = 3;
    shedPercent = 15;
    events.unshift({
      id: `erac_3_${newElapsed.toFixed(0)}`,
      timestampSeconds: newSimTime,
      timeLabel,
      type: 'critical',
      message: 'ERAC Estágio 3 Acionado (f <= 59.10 Hz): Corte de emergência de 15% da carga total.'
    });
  }

  // Actual load with ERAC shedding
  const shedLoadMW = Math.round(currentBaseLoad * (shedPercent / 100));
  const actualLoadMW = currentBaseLoad - shedLoadMW;

  // 6. Swing Equation Integration:
  // df/dt = (f0 / 2*H_eq) * (P_gen - P_load)/S_base - D * (f - f0)
  const powerMismatchMW = totalGenMW - actualLoadMW;
  const mismatchPu = powerMismatchMW / SYSTEM_BASE_MVA;
  const freqDeviation = state.frequencyHz - F_NOMINAL;
  const dampingTorque = LOAD_DAMPING_D * (freqDeviation / F_NOMINAL); // damping

  const rocofHzS = (F_NOMINAL / (2 * equivalentInertiaH)) * mismatchPu - dampingTorque;

  let newFreq = state.frequencyHz + rocofHzS * effectiveDt;

  // 7. Catastrophic Protection Violations
  let isBlackout = false;
  let blackoutReason: string | undefined;

  if (newFreq <= 58.50) {
    isBlackout = true;
    blackoutReason = 'Colapso de Subfrequência (f < 58.50 Hz). Atuação de proteção de subtensão e trip em cascata das turbinas síncronas.';
    events.unshift({
      id: `blackout_sub_${newElapsed.toFixed(0)}`,
      timestampSeconds: newSimTime,
      timeLabel,
      type: 'critical',
      message: 'APAGÃO SISTÊMICO: Frequência atingiu 58.50 Hz. Desconexão geral de geradores.'
    });
  } else if (newFreq >= 61.50) {
    isBlackout = true;
    blackoutReason = 'Colapso de Sobrefrequência (f > 61.50 Hz). Sobretensão crítica e trip por proteção de sobrevelocidade mecânica.';
    events.unshift({
      id: `blackout_over_${newElapsed.toFixed(0)}`,
      timestampSeconds: newSimTime,
      timeLabel,
      type: 'critical',
      message: 'APAGÃO SISTÊMICO: Frequência excedeu 61.50 Hz. Trip de geradores por sobrevelocidade.'
    });
  }

  // Automatic IBR trip on severe overfrequency (f >= 60.80 Hz)
  if (newFreq >= 60.80 && (newSolar.actualMW > 2000 || newWind.actualMW > 2000)) {
    newSolar.curtailmentPercent = 80;
    newWind.curtailmentPercent = 80;
    events.unshift({
      id: `trip_ibr_${newElapsed.toFixed(0)}`,
      timestampSeconds: newSimTime,
      timeLabel,
      type: 'alert',
      message: 'Proteção de Sobrefrequência de Inversores (f >= 60.80 Hz): Curtailment automático de emergência de 80% em Solar/Eólica.'
    });
  }

  const isOverfrequencyAlert = newFreq >= 60.50;

  // Limit event log size
  const trimmedEvents = events.slice(0, 40);

  return {
    simTimeSeconds: newSimTime,
    elapsedSeconds: newElapsed,
    speedMultiplier: state.speedMultiplier,
    frequencyHz: Number(newFreq.toFixed(3)),
    rocofHzS: Number(rocofHzS.toFixed(3)),
    equivalentInertiaH: Number(equivalentInertiaH.toFixed(2)),
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
    isOverfrequencyAlert,
    isPrimaryControlEnabled: state.isPrimaryControlEnabled,
    scenarioId: state.scenarioId,
    events: trimmedEvents
  };
}
