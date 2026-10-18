import type { SourceRef } from './sources';

// Gerado por scripts/export-simulator-day.mjs. Não editar à mão.

export interface SimulatorDayHour {
  hour: number;
  hydroMW: number;
  thermalMW: number;
  windMW: number;
  solarMW: number;
  /** Parcela de solarMW que é micro e minigeração distribuída (estimativa do ONS). */
  mmgdMW: number;
  loadMW: number;
}

export interface SimulatorDay {
  id: string;
  dateLabel: string;
  hours: SimulatorDayHour[];
  sources: SourceRef[];
}

export const simulatorDay: SimulatorDay = {
  id: '2026-08-31',
  dateLabel: '31/08/2026',
  hours: [
    { hour: 0, hydroMW: 46933, thermalMW: 9490, windMW: 19886, solarMW: 0, loadMW: 75926, mmgdMW: 0 },
    { hour: 1, hydroMW: 43269, thermalMW: 9656, windMW: 20008, solarMW: 0, loadMW: 72933, mmgdMW: 0 },
    { hour: 2, hydroMW: 41464, thermalMW: 9664, windMW: 19711, solarMW: 0, loadMW: 70839, mmgdMW: 0 },
    { hour: 3, hydroMW: 40542, thermalMW: 9630, windMW: 19621, solarMW: 0, loadMW: 69793, mmgdMW: 0 },
    { hour: 4, hydroMW: 40635, thermalMW: 9652, windMW: 19571, solarMW: 4, loadMW: 69862, mmgdMW: 4 },
    { hour: 5, hydroMW: 42974, thermalMW: 9694, windMW: 19361, solarMW: 345, loadMW: 72374, mmgdMW: 263 },
    { hour: 6, hydroMW: 43132, thermalMW: 9713, windMW: 19005, solarMW: 5427, loadMW: 76810, mmgdMW: 1896 },
    { hour: 7, hydroMW: 37315, thermalMW: 9627, windMW: 17412, solarMW: 18256, loadMW: 81637, mmgdMW: 7491 },
    { hour: 8, hydroMW: 35281, thermalMW: 9446, windMW: 16198, solarMW: 28296, loadMW: 88122, mmgdMW: 14785 },
    { hour: 9, hydroMW: 31948, thermalMW: 9330, windMW: 13672, solarMW: 37524, loadMW: 91374, mmgdMW: 21532 },
    { hour: 10, hydroMW: 31356, thermalMW: 9356, windMW: 12277, solarMW: 42013, loadMW: 94094, mmgdMW: 26944 },
    { hour: 11, hydroMW: 31640, thermalMW: 9487, windMW: 11088, solarMW: 44026, loadMW: 95249, mmgdMW: 29657 },
    { hour: 12, hydroMW: 31916, thermalMW: 9623, windMW: 9985, solarMW: 42844, loadMW: 93268, mmgdMW: 29591 },
    { hour: 13, hydroMW: 33037, thermalMW: 9842, windMW: 10381, solarMW: 42083, loadMW: 94551, mmgdMW: 27277 },
    { hour: 14, hydroMW: 37074, thermalMW: 10422, windMW: 10649, solarMW: 37559, loadMW: 95002, mmgdMW: 22881 },
    { hour: 15, hydroMW: 43205, thermalMW: 11179, windMW: 11584, solarMW: 29776, loadMW: 94939, mmgdMW: 16401 },
    { hour: 16, hydroMW: 53770, thermalMW: 11842, windMW: 13190, solarMW: 17210, loadMW: 95110, mmgdMW: 9231 },
    { hour: 17, hydroMW: 62820, thermalMW: 13390, windMW: 14493, solarMW: 3343, loadMW: 93759, mmgdMW: 2802 },
    { hour: 18, hydroMW: 66343, thermalMW: 14226, windMW: 15704, solarMW: 109, loadMW: 96382, mmgdMW: 109 },
    { hour: 19, hydroMW: 65326, thermalMW: 14496, windMW: 17160, solarMW: 5, loadMW: 96988, mmgdMW: 5 },
    { hour: 20, hydroMW: 64135, thermalMW: 14448, windMW: 17668, solarMW: 0, loadMW: 96251, mmgdMW: 0 },
    { hour: 21, hydroMW: 64043, thermalMW: 14050, windMW: 17586, solarMW: 0, loadMW: 95487, mmgdMW: 0 },
    { hour: 22, hydroMW: 62670, thermalMW: 12075, windMW: 17947, solarMW: 0, loadMW: 91913, mmgdMW: 0 },
    { hour: 23, hydroMW: 57496, thermalMW: 11186, windMW: 18591, solarMW: 0, loadMW: 86598, mmgdMW: 0 }
  ],
  sources: [
    {
      label: 'ONS — Balanço de Energia nos Subsistemas, base horária 2026 (CSV)',
      url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/balanco_energia_subsistema_ho/BALANCO_ENERGIA_SUBSISTEMA_2026.csv',
      accessedAt: '2026-10-18'
    },
    {
      label: 'ONS — Dicionário de dados do Balanço de Energia nos Subsistemas',
      url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/balanco_energia_subsistema_ho/DicionarioDados_Balanco_Energia_Subsistema.pdf',
      accessedAt: '2026-10-18'
    },
    {
      label: 'ONS — API de Carga Verificada, MMGD estimada (SE/CO, S, NE, N) em 31/08/2026',
      url: 'https://apicarga.ons.org.br/prd/cargaverificada?dat_inicio=2026-08-31&dat_fim=2026-08-31&cod_areacarga=SECO',
      accessedAt: '2026-10-18'
    }
  ]
};
