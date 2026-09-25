import { describe, expect, it } from 'vitest';
import { energyChainStages } from './energyChainData';
import { referenceGridSnapshot } from './gridData';
import { regionalInterchanges } from './interchangeData';
import { majorPowerPlants } from './powerPlantsData';
import { powerVsEnergyExplainer, scaleLevels } from './scaleData';
import { sinDossiers } from './sinDossiersData';
import type { SourceRef } from './sources';
import { majorTransmissionLines } from './transmissionLinesData';

interface LocatedSource {
  owner: string;
  source: SourceRef;
}

const DATASETS: Record<string, unknown> = {
  energyChain: energyChainStages,
  gridSnapshot: referenceGridSnapshot,
  interchanges: regionalInterchanges,
  powerPlants: majorPowerPlants,
  scales: { powerVsEnergyExplainer, scaleLevels },
  dossiers: sinDossiers,
  transmissionLines: majorTransmissionLines
};

// Entidades cujas fontes ainda apontam para a raiz de um domínio (home page).
// Uma home page não prova o número: a fonte precisa levar ao documento, ficha ou dataset específico.
// Esta lista só pode encolher; ao corrigir uma entidade, remova-a daqui.
const ROOT_URL_DEBT = new Set<string>([
  'powerPlants:itaipu',
  'powerPlants:belo-monte',
  'powerPlants:tucurui',
  'powerPlants:jirau',
  'powerPlants:santo-antonio',
  'powerPlants:xingó',
  'powerPlants:paulo-afonso',
  'powerPlants:ilha-solteira',
  'powerPlants:foz-do-areia',
  'powerPlants:marimbondo',
  'powerPlants:sao-simao',
  'powerPlants:teles-pires',
  'powerPlants:porto-primavera',
  'powerPlants:uhe-itumbiara',
  'powerPlants:uhe-jupia',
  'powerPlants:uhe-itaparica'
]);

function isSourceRef(value: unknown): value is SourceRef {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as SourceRef).url === 'string' &&
    typeof (value as SourceRef).label === 'string'
  );
}

function ownerKey(value: object, fallback: string): string {
  const record = value as Record<string, unknown>;
  if (typeof record.id === 'string') return record.id;
  if (typeof record.name === 'string') return record.name;
  return fallback;
}

function collectSources(value: unknown, owner: string, out: LocatedSource[]): LocatedSource[] {
  if (isSourceRef(value)) {
    out.push({ owner, source: value });
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectSources(item, owner, out));
  } else if (typeof value === 'object' && value !== null) {
    const nextOwner = `${owner.split(':')[0]}:${ownerKey(value, owner.split(':')[1] ?? '')}`;
    Object.values(value).forEach((child) => collectSources(child, nextOwner, out));
  }
  return out;
}

const allSources = Object.entries(DATASETS).flatMap(([dataset, data]) => collectSources(data, `${dataset}:`, []));

function isRootUrl(url: string): boolean {
  const { pathname, search } = new URL(url);
  return (pathname === '' || pathname === '/') && search === '';
}

describe('proveniência dos dados (SourceRef)', () => {
  it('encontra fontes em todos os datasets', () => {
    const datasetsWithSources = new Set(allSources.map(({ owner }) => owner.split(':')[0]));
    for (const dataset of ['energyChain', 'interchanges', 'powerPlants', 'scales', 'dossiers', 'transmissionLines']) {
      expect(datasetsWithSources).toContain(dataset);
    }
  });

  it('usa URLs https válidas', () => {
    const invalid = allSources.filter(({ source }) => {
      try {
        return new URL(source.url).protocol !== 'https:';
      } catch {
        return true;
      }
    });
    expect(invalid).toEqual([]);
  });

  it('registra accessedAt no formato ISO YYYY-MM-DD', () => {
    const malformed = allSources.filter(
      ({ source }) =>
        source.accessedAt !== undefined &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(source.accessedAt) || Number.isNaN(Date.parse(source.accessedAt)))
    );
    expect(malformed).toEqual([]);
  });

  it('não aceita home page como fonte, exceto a dívida já catalogada', () => {
    const offenders = new Set(allSources.filter(({ source }) => isRootUrl(source.url)).map(({ owner }) => owner));
    const newDebt = [...offenders].filter((owner) => !ROOT_URL_DEBT.has(owner));
    const paidDebt = [...ROOT_URL_DEBT].filter((owner) => !offenders.has(owner));

    expect(newDebt, 'Fonte nova apontando para a raiz de um domínio: use o link do documento específico').toEqual([]);
    expect(paidDebt, 'Dívida quitada: remova estas entidades de ROOT_URL_DEBT').toEqual([]);
  });
});
