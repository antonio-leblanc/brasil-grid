import { describe, expect, it } from 'vitest';
import { energyChainStages } from '../../data/energyChainData';
import { scaleLevels } from '../../data/scaleData';
import { sinDossiers } from '../../data/sinDossiersData';
import { ENERGY_CHAIN_EN } from './energyChain';
import { SCALE_LEVELS_EN } from './scales';
import { SIN_DOSSIERS_EN } from './sinDossiers';

// An entry added in Portuguese only would silently show Portuguese in the English reference sections.
describe('English overlays cover every reference entry', () => {
  it('has one entry per dossier, with the same steps, and nothing stale', () => {
    expect(Object.keys(SIN_DOSSIERS_EN).sort()).toEqual(sinDossiers.map((d) => d.id).sort());
    for (const dossier of sinDossiers) expect(SIN_DOSSIERS_EN[dossier.id].steps).toHaveLength(dossier.steps.length);
  });

  it('has one entry per value chain stage and nothing stale', () => {
    expect(Object.keys(ENERGY_CHAIN_EN).sort()).toEqual(energyChainStages.map((s) => s.id).sort());
  });

  it('has one entry per scale level and nothing stale', () => {
    expect(Object.keys(SCALE_LEVELS_EN).sort()).toEqual(scaleLevels.map((l) => l.unit).sort());
  });
});
