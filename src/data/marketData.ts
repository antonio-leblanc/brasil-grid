import perfilHorario from './mercado/cmoPerfilHorario.json';
import mercadoMensal from './mercado/mercadoMensal.json';
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

export interface MarketMonth {
  /** YYYY-MM */
  mes: string;
  /** % da capacidade de armazenamento do SIN, média do mês. */
  earBrasil: number;
  /** CMO médio do mês do Sudeste, R$/MWh. */
  cmo: number;
  /** CMO ponderado pela carga horária do Sudeste menos o CMO médio simples, R$/MWh. */
  modulacao: number | null;
}

export interface MarketMonthly {
  subsistemaCmo: string;
  unidade: string;
  ultimoDado: string;
  geradoEm: string;
  meses: MarketMonth[];
  blocoAnoCorrente: { ano: number; flat: number; fimDeTarde18h22h: number };
  sources: SourceRef[];
}

export const marketMonthly: MarketMonthly = {
  ...mercadoMensal,
  sources: [
    {
      label: 'ONS Dados Abertos — EAR diário por subsistema',
      url: 'https://dados.ons.org.br/dataset/ear-diario-por-subsistema',
      accessedAt: mercadoMensal.geradoEm
    },
    {
      label: 'ONS Dados Abertos — CMO semi-horário por subsistema',
      url: 'https://dados.ons.org.br/dataset/cmo-semi-horario',
      accessedAt: mercadoMensal.geradoEm
    },
    {
      label: 'ONS Dados Abertos — Curva de carga horária',
      url: 'https://dados.ons.org.br/dataset/curva-carga',
      accessedAt: mercadoMensal.geradoEm
    },
    {
      label: 'Pipeline brasil-grid — pipeline/exporta.py',
      url: 'https://github.com/antonio-leblanc/brasil-grid/blob/main/pipeline/exporta.py'
    }
  ]
};

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
