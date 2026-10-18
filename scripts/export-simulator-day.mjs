// Gera src/data/simulatorDayData.ts a partir do Balanço de Energia nos Subsistemas (ONS, base horária).
// Uso: node scripts/export-simulator-day.mjs 2026-08-31
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const date = process.argv[2] ?? '2026-08-31';
const year = date.slice(0, 4);
const csvUrl = `https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/balanco_energia_subsistema_ho/BALANCO_ENERGIA_SUBSISTEMA_${year}.csv`;
const dictionaryUrl =
  'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/balanco_energia_subsistema_ho/DicionarioDados_Balanco_Energia_Subsistema.pdf';

const response = await fetch(csvUrl);
if (!response.ok) throw new Error(`ONS respondeu ${response.status} para ${csvUrl}`);
const [header, ...rows] = (await response.text()).trim().split(/\r?\n/);
const columns = header.split(';');
const col = (name) => {
  const index = columns.indexOf(name);
  if (index < 0) throw new Error(`Coluna ${name} ausente no CSV do ONS`);
  return index;
};

const hours = rows
  .map((line) => line.split(';'))
  .filter((cells) => cells[col('id_subsistema')].trim() === 'SIN' && cells[col('din_instante')].startsWith(date))
  .map((cells) => ({
    hour: Number(cells[col('din_instante')].slice(11, 13)),
    hydroMW: Math.round(Number(cells[col('val_gerhidraulica')])),
    thermalMW: Math.round(Number(cells[col('val_gertermica')])),
    windMW: Math.round(Number(cells[col('val_gereolica')])),
    solarMW: Math.round(Number(cells[col('val_gersolar')])),
    loadMW: Math.round(Number(cells[col('val_carga')]))
  }))
  .sort((a, b) => a.hour - b.hour);

if (hours.length !== 24) throw new Error(`Esperava 24 horas do SIN em ${date}, veio ${hours.length}`);

const [y, m, d] = date.split('-');
const accessedAt = new Date().toISOString().slice(0, 10);
const body = `import type { SourceRef } from './sources';

// Gerado por scripts/export-simulator-day.mjs. Não editar à mão.

export interface SimulatorDayHour {
  hour: number;
  hydroMW: number;
  thermalMW: number;
  windMW: number;
  solarMW: number;
  loadMW: number;
}

export interface SimulatorDay {
  id: string;
  dateLabel: string;
  hours: SimulatorDayHour[];
  sources: SourceRef[];
}

export const simulatorDay: SimulatorDay = {
  id: '${date}',
  dateLabel: '${d}/${m}/${y}',
  hours: [
${hours.map((h) => `    { ${Object.entries(h).map(([k, v]) => `${k}: ${v}`).join(', ')} }`).join(',\n')}
  ],
  sources: [
    {
      label: 'ONS — Balanço de Energia nos Subsistemas, base horária ${y} (CSV)',
      url: '${csvUrl}',
      accessedAt: '${accessedAt}'
    },
    {
      label: 'ONS — Dicionário de dados do Balanço de Energia nos Subsistemas',
      url: '${dictionaryUrl}',
      accessedAt: '${accessedAt}'
    }
  ]
};
`;

const target = fileURLToPath(new URL('../src/data/simulatorDayData.ts', import.meta.url));
writeFileSync(target, body);
console.log(`${target}: ${hours.length} horas do SIN em ${date}`);
