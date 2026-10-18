import { describe, expect, it } from 'vitest';
import { majorPowerPlants } from './powerPlantsData';
import { sigaSnapshot } from './sigaSnapshotData';

// Usinas cujo capacityMW diverge de propósito da soma outorgada no SIGA, com o motivo.
const CAPACITY_EXCEPTIONS: Record<string, string> = {
  itaipu:
    'O SIGA só outorga a parte brasileira (7.000 MW); a energia paraguaia não consumida entra no SIN pelos bipolos até Ibiúna, então o mapa mostra os 14.000 MW da usina inteira.'
};

const sigaMW = (cegs: string[]) => cegs.reduce((sum, ceg) => sum + (sigaSnapshot[ceg]?.grantedMW ?? 0), 0);

describe('usinas contra o cadastro da ANEEL (SIGA)', () => {
  it('toda usina lista os CEGs que a compõem, todos presentes no snapshot do SIGA', () => {
    const missing = majorPowerPlants.flatMap((plant) =>
      plant.cegs.length === 0 ? [`${plant.id}: sem CEG`] : plant.cegs.filter((ceg) => !sigaSnapshot[ceg]).map((ceg) => `${plant.id}: ${ceg}`)
    );
    expect(missing, 'Rode node scripts/export-siga-snapshot.mjs depois de mudar `cegs`').toEqual([]);
  });

  it('nenhum CEG aparece em duas usinas', () => {
    const owners = new Map<string, string>();
    const duplicated = majorPowerPlants.flatMap((plant) =>
      plant.cegs.filter((ceg) => owners.has(ceg) || !owners.set(ceg, plant.id)).map((ceg) => `${ceg}: ${owners.get(ceg)} e ${plant.id}`)
    );
    expect(duplicated).toEqual([]);
  });

  it('capacityMW é a soma da potência outorgada dos CEGs, salvo exceção justificada', () => {
    const divergent = majorPowerPlants
      .filter((plant) => !CAPACITY_EXCEPTIONS[plant.id] && Math.abs(plant.capacityMW - sigaMW(plant.cegs)) > 0.5)
      .map((plant) => `${plant.id}: repo ${plant.capacityMW} MW, SIGA ${sigaMW(plant.cegs).toFixed(1)} MW`);
    expect(divergent).toEqual([]);
  });

  it('as exceções de capacidade ainda divergem do SIGA', () => {
    const stale = Object.keys(CAPACITY_EXCEPTIONS).filter((id) => {
      const plant = majorPowerPlants.find((p) => p.id === id);
      return !plant || Math.abs(plant.capacityMW - sigaMW(plant.cegs)) <= 0.5;
    });
    expect(stale, 'Exceção sem efeito: remova de CAPACITY_EXCEPTIONS').toEqual([]);
  });
});
