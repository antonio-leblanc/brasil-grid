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
  calculateLoadAtTime,
  createInitialSimulation,
  eracShedPercent,
  frequencyWattDerate,
  stepSimulation
} from './gridPhysics';
import type { GridSimulationState } from './gridPhysics';

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

describe('load profile', () => {
  it('peaks at 19h and bottoms out overnight', () => {
    const at = (h: number) => calculateLoadAtTime(h * 3600, 88000);
    expect(at(19)).toBe(88000);
    expect(at(4)).toBeLessThan(at(0));
    expect(at(17.5)).toBeLessThan(at(19));
    for (let h = 0; h < 24; h += 0.25) expect(at(h)).toBeLessThanOrEqual(88000);
  });

  it('starts every scenario balanced', () => {
    for (const id of ['pato', 'trip_itaipu', 'alta_renovavel', 'livre'] as const) {
      const s = runFor(createInitialSimulation(id), 5);
      expect(Math.abs(s.frequencyHz - F_NOMINAL), id).toBeLessThan(0.1);
    }
  });
});
