import { describe, expect, it } from 'vitest';
import {
  ERAC_STAGES,
  F_NOMINAL,
  GOVERNOR_DROOP_R,
  GOVERNOR_PARTICIPATION,
  LOAD_DAMPING_D,
  SIM_STEP_SECONDS,
  UNDERFREQUENCY_COLLAPSE_HZ,
  advanceSimulation,
  applyGeneratorTrip,
  DAY_END_SECONDS,
  DAY_SCHEDULED_TRIPS,
  EVENT_SLOWDOWN_SECONDS,
  SECONDARY_CONTROL_TIME_S,
  createInitialSimulation,
  dayScheduleAt,
  effectiveSpeed,
  eracShedPercent,
  frequencyWattDerate,
  stepSimulation
} from './gridPhysics';
import type { GridSimulationState } from './gridPhysics';
import { simulatorDay } from '../data/simulatorDayData';

function runFor(state: GridSimulationState, seconds: number, frameSeconds = 1 / 60): GridSimulationState {
  let s = state;
  const frames = Math.round(seconds / frameSeconds);
  for (let i = 0; i < frames; i++) s = advanceSimulation(s, frameSeconds);
  return s;
}

function sandbox(overrides: Partial<GridSimulationState> = {}): GridSimulationState {
  return { ...createInitialSimulation('livre'), ...overrides };
}

describe('swing equation', () => {
  it('holds 60 Hz when generation matches load', () => {
    const s = runFor(sandbox(), 60);
    expect(Math.abs(s.frequencyHz - F_NOMINAL)).toBeLessThan(1e-9);
  });

  it('initial RoCoF after a trip equals f0·ΔP / 2E_k', () => {
    const tripped = applyGeneratorTrip(sandbox({ isPrimaryControlEnabled: false }), 2800);
    const next = stepSimulation(tripped, SIM_STEP_SECONDS);
    const expected = (-F_NOMINAL * 2800) / (2 * next.kineticEnergyMWs);
    expect(next.rocofHzS).toBeCloseTo(expected, 6);
  });

  it('settles at Δf = −ΔP / (D·P/f0) with only load damping', () => {
    const base = sandbox({ isPrimaryControlEnabled: false });
    const s = runFor(applyGeneratorTrip(base, 2800), 180);
    const expectedDeviation = -2800 / ((LOAD_DAMPING_D * base.actualLoadMW) / F_NOMINAL);
    expect(s.eracStage).toBe(0);
    expect(s.frequencyHz - F_NOMINAL).toBeCloseTo(expectedDeviation, 2);
  });

  it('settles closer to 60 Hz with primary governor droop', () => {
    const base = sandbox();
    const tripped = applyGeneratorTrip(base, 2800);
    const s = runFor(tripped, 180);
    const governorMWPerHz = (tripped.hydro.maxCapacityMW * GOVERNOR_PARTICIPATION) / (GOVERNOR_DROOP_R * F_NOMINAL);
    const dampingMWPerHz = (LOAD_DAMPING_D * base.actualLoadMW) / F_NOMINAL;
    expect(s.frequencyHz - F_NOMINAL).toBeCloseTo(-2800 / (governorMWPerHz + dampingMWPerHz), 2);
  });

  it('keeps evolving under a small imbalance instead of freezing on rounding', () => {
    const base = sandbox({ isPrimaryControlEnabled: false });
    const s = runFor({ ...base, baseLoadMW: base.baseLoadMW + 100 }, 1);
    expect(s.frequencyHz).toBeLessThan(F_NOMINAL - 0.005);
  });

  it('collapses when a loss exceeds what the ERAC can shed', () => {
    const s = runFor(applyGeneratorTrip(sandbox({ isPrimaryControlEnabled: false }), 40000), 30);
    expect(s.isBlackout).toBe(true);
    expect(s.eracStage).toBe(ERAC_STAGES.length);
    expect(s.frequencyHz).toBeLessThanOrEqual(UNDERFREQUENCY_COLLAPSE_HZ);
  });
});

describe('fixed-step integration', () => {
  it('produces the same trajectory at 60 Hz and 144 Hz display refresh', () => {
    const tripped = applyGeneratorTrip(sandbox(), 6300);
    const at60 = runFor(tripped, 12, 1 / 60);
    const at144 = runFor(tripped, 12, 1 / 144);
    expect(Math.abs(at60.simTimeSeconds - at144.simTimeSeconds)).toBeLessThanOrEqual(SIM_STEP_SECONDS + 1e-9);
    expect(at60.frequencyHz).toBeCloseTo(at144.frequencyHz, 2);
    expect(at60.eracStage).toBe(at144.eracStage);
  });

  it('scales simulated time with the speed multiplier', () => {
    const s = runFor(sandbox({ speedMultiplier: 10 }), 1);
    expect(s.elapsedSeconds).toBeCloseTo(10, 1);
  });

  it('does nothing while paused', () => {
    const paused = sandbox({ speedMultiplier: 0 });
    expect(advanceSimulation(paused, 1 / 60)).toBe(paused);
  });
});

describe('ERAC', () => {
  it('uses the ONS uniform settings: 5 stages, 35% total shed', () => {
    expect(ERAC_STAGES.map((s) => s.thresholdHz)).toEqual([58.5, 58.2, 57.9, 57.7, 57.5]);
    expect(eracShedPercent(ERAC_STAGES.length)).toBe(35);
  });

  it('fires each stage only after frequency crosses its threshold', () => {
    let s = applyGeneratorTrip(sandbox({ isPrimaryControlEnabled: false }), 20000);
    let stage = 0;
    for (let i = 0; i < 3000 && !s.isBlackout; i++) {
      const prevFreq = s.frequencyHz;
      s = stepSimulation(s, SIM_STEP_SECONDS);
      while (stage < s.eracStage) {
        expect(prevFreq).toBeLessThanOrEqual(ERAC_STAGES[stage].thresholdHz);
        stage += 1;
      }
    }
    expect(stage).toBeGreaterThanOrEqual(2);
  });

  it('does not act on a 2.8 GW loss in a healthy grid', () => {
    const s = runFor(applyGeneratorTrip(sandbox(), 2800), 60);
    expect(s.eracStage).toBe(0);
    expect(s.shedLoadMW).toBe(0);
  });
});

describe('generator trip', () => {
  it('removes capacity so the fleet does not silently ramp back', () => {
    const base = sandbox({ isPrimaryControlEnabled: false });
    const tripped = applyGeneratorTrip(base, 2800);
    const s = runFor(tripped, 60);
    expect(tripped.hydro.maxCapacityMW).toBe(base.hydro.maxCapacityMW - 2800);
    expect(s.hydro.actualMW).toBeCloseTo(base.hydro.actualMW - 2800, 6);
  });
});

describe('IBR frequency-watt response', () => {
  it('derates linearly above 60.2 Hz with 5% droop', () => {
    expect(frequencyWattDerate(60.2)).toBe(0);
    expect(frequencyWattDerate(61.2)).toBeCloseTo(1 / 3, 6);
    expect(frequencyWattDerate(70)).toBe(1);
  });

  it('engages on overfrequency and releases once frequency recovers', () => {
    const base = sandbox();
    let s = { ...base, baseLoadMW: base.baseLoadMW - 3000 };
    let wasActive = false;
    for (let t = 0; t < 180 * 60; t++) {
      s = advanceSimulation(s, 1 / 60);
      wasActive ||= s.isIbrFrequencyWattActive;
    }
    expect(wasActive).toBe(true);
    expect(s.isIbrFrequencyWattActive).toBe(false);
    expect(s.solar.curtailmentPercent).toBe(0);
  });
});

describe('real day (ONS balance, 31/08/2026)', () => {
  const quietDay = (overrides: Partial<GridSimulationState> = {}) => ({
    ...createInitialSimulation('dia'),
    scheduledTrips: [],
    ...overrides
  });

  it('interpolates hourly MWmed at each hour midpoint', () => {
    const [h11, h12] = [simulatorDay.hours[11], simulatorDay.hours[12]];
    expect(dayScheduleAt(simulatorDay, 11.5 * 3600).solarMW).toBeCloseTo(h11.solarMW, 6);
    expect(dayScheduleAt(simulatorDay, 12 * 3600).solarMW).toBeCloseTo((h11.solarMW + h12.solarMW) / 2, 6);
    expect(dayScheduleAt(simulatorDay, 0).hydroMW).toBe(simulatorDay.hours[0].hydroMW);
  });

  it('closes demand on verified generation', () => {
    const s = dayScheduleAt(simulatorDay, 18.5 * 3600);
    expect(s.demandMW).toBeCloseTo(s.hydroMW + s.thermalMW + s.windMW + s.solarMW, 6);
  });

  it('follows the schedule all day near 60 Hz without contingencies', () => {
    let s = quietDay({ speedMultiplier: 900 });
    let worst = 0;
    while (!s.isDayFinished) {
      s = advanceSimulation(s, 1 / 60);
      worst = Math.max(worst, Math.abs(s.frequencyHz - F_NOMINAL));
    }
    expect(s.simTimeSeconds).toBeGreaterThanOrEqual(DAY_END_SECONDS);
    expect(worst).toBeLessThan(0.05);
  }, 30_000);

  it('fires the scheduled trips and slows the clock for the transient', () => {
    const noon = DAY_SCHEDULED_TRIPS[0].atSeconds;
    let s = createInitialSimulation('dia', simulatorDay, noon - 1);
    s = runFor(s, 1);
    expect(s.hydroTrippedMW).toBe(DAY_SCHEDULED_TRIPS[0].mw);
    expect(s.scheduledTrips).toHaveLength(DAY_SCHEDULED_TRIPS.length - 1);
    expect(s.eventSlowdownUntilSeconds - noon - EVENT_SLOWDOWN_SECONDS).toBeGreaterThanOrEqual(0);
    expect(s.eventSlowdownUntilSeconds - noon - EVENT_SLOWDOWN_SECONDS).toBeLessThan(SIM_STEP_SECONDS * 2);
    expect(effectiveSpeed(s)).toBe(1);
  });

  it('a midday loss has a steeper RoCoF than the same loss at the evening peak', () => {
    const rocofAt = (seconds: number) => {
      const s = { ...createInitialSimulation('dia', simulatorDay, seconds), scheduledTrips: [] };
      return stepSimulation(applyGeneratorTrip(s, 2800), SIM_STEP_SECONDS).rocofHzS;
    };
    const noon = rocofAt(12 * 3600);
    const evening = rocofAt(19 * 3600);
    expect(Math.abs(noon)).toBeGreaterThan(1.5 * Math.abs(evening));
  });

  it('CAG restores 60 Hz after a trip; without it the droop offset remains', () => {
    const after = (cag: boolean) =>
      runFor(applyGeneratorTrip(sandbox({ isSecondaryControlEnabled: cag }), 2800), 6 * SECONDARY_CONTROL_TIME_S);
    expect(Math.abs(after(true).frequencyHz - F_NOMINAL)).toBeLessThan(0.005);
    expect(after(false).frequencyHz).toBeLessThan(F_NOMINAL - 0.05);
  });
});
