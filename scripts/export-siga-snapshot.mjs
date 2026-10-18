// Gera src/data/sigaSnapshotData.ts com as linhas do SIGA (ANEEL) de cada CEG citado em `cegs` no powerPlantsData.ts.
// O teste powerPlants.test.ts confere capacityMW contra a soma da potência outorgada desses CEGs.
// Uso: node scripts/export-siga-snapshot.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const csvUrl =
  'https://dadosabertos.aneel.gov.br/dataset/6d90b77c-c5f5-4d81-bdec-7bc619494bb9/resource/11ec447d-698d-4ab8-977f-b424d5deee6a/download/siga-empreendimentos-geracao.csv';

const plantsFile = fileURLToPath(new URL('../src/data/powerPlantsData.ts', import.meta.url));
const cited = new Set(
  [...readFileSync(plantsFile, 'utf8').matchAll(/cegs: \[([^\]]*)\]/g)].flatMap(([, list]) =>
    [...list.matchAll(/'([^']+)'/g)].map(([, ceg]) => ceg)
  )
);
if (cited.size === 0) throw new Error('Nenhum CEG em `cegs` no powerPlantsData.ts');

const response = await fetch(csvUrl);
if (!response.ok) throw new Error(`ANEEL respondeu ${response.status} para ${csvUrl}`);
const [header, ...rows] = (await response.text()).trim().split(/\r?\n/);
const unquote = (cell) => cell.replace(/^"|"$/g, '');
const columns = header.split(';').map(unquote);
const col = (name) => {
  const index = columns.indexOf(name);
  if (index < 0) throw new Error(`Coluna ${name} ausente no CSV do SIGA`);
  return index;
};

const snapshot = {};
let snapshotDate = '';
for (const line of rows) {
  const cells = line.split(';').map(unquote);
  const ceg = cells[col('CodCEG')];
  if (!cited.has(ceg)) continue;
  snapshotDate = cells[col('DatGeracaoConjuntoDados')];
  snapshot[ceg] = {
    name: cells[col('NomEmpreendimento')],
    grantedMW: Number(cells[col('MdaPotenciaOutorgadaKw')].replace(',', '.')) / 1000,
    phase: cells[col('DscFaseUsina')],
    municipalities: cells[col('DscMuninicpios')]
  };
}

const missing = [...cited].filter((ceg) => !snapshot[ceg]);
if (missing.length) throw new Error(`CEGs citados que não existem no SIGA: ${missing.join(', ')}`);

const body = `// Gerado por scripts/export-siga-snapshot.mjs. Não editar à mão.

export interface SigaRecord {
  name: string;
  grantedMW: number;
  phase: string;
  municipalities: string;
}

export const SIGA_SNAPSHOT_DATE = '${snapshotDate}';
export const SIGA_CSV_URL = '${csvUrl}';

export const sigaSnapshot: Record<string, SigaRecord> = ${JSON.stringify(
  Object.fromEntries(Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b))),
  null,
  2
)};
`;

const target = fileURLToPath(new URL('../src/data/sigaSnapshotData.ts', import.meta.url));
writeFileSync(target, body);
console.log(`${target}: ${Object.keys(snapshot).length} CEGs do SIGA de ${snapshotDate}`);
