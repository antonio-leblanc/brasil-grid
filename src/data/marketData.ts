import perfilHorario from './mercado/cmoPerfilHorario.json';
import type { SourceRef } from './sources';

export interface CmoYearProfile {
  ano: number;
  parcial: boolean;
  /** CMO médio de cada meia hora do dia (índice 0 = 00:00, 47 = 23:30), R$/MWh. */
  cmo: number[];
  razao18h12h: number | null;
  /** Mesma razão, só com 1º/jan até o dia do último dado: compara ano parcial com ano parcial. */
  razao18h12hMesmaJanela: number | null;
}

export interface CmoHourlyProfile {
  subsistema: string;
  unidade: string;
  inicio: string;
  ultimoDado: string;
  geradoEm: string;
  anos: CmoYearProfile[];
  sources: SourceRef[];
}

export const cmoHourlyProfile: CmoHourlyProfile = {
  ...perfilHorario,
  sources: [
    {
      label: 'ONS Dados Abertos — CMO semi-horário por subsistema',
      url: 'https://dados.ons.org.br/dataset/cmo-semi-horario',
      accessedAt: perfilHorario.geradoEm
    },
    {
      label: 'Pipeline brasil-grid — pipeline/exporta.py',
      url: 'https://github.com/antonio-leblanc/brasil-grid/blob/main/pipeline/exporta.py'
    }
  ]
};
