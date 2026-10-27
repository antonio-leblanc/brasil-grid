import { describe, expect, it } from 'vitest';
import { majorPowerPlants } from '../../data/powerPlantsData';
import { majorTransmissionLines } from '../../data/transmissionLinesData';
import { POWER_PLANTS_EN } from './powerPlants.en';
import { TRANSMISSION_LINES_EN } from './transmissionLines.en';

// A plant or line added in Portuguese only would silently show Portuguese in the English map.
describe('English overlays cover every map asset', () => {
  it('has one entry per plant and nothing stale', () => {
    expect(Object.keys(POWER_PLANTS_EN).sort()).toEqual(majorPowerPlants.map((p) => p.id).sort());
  });

  it('has one entry per transmission line and nothing stale', () => {
    expect(Object.keys(TRANSMISSION_LINES_EN).sort()).toEqual(majorTransmissionLines.map((l) => l.id).sort());
  });
});
