import { useI18n } from '../../i18n/context';
import type { Lang } from '../../i18n/language';

const PT = {
  title: 'Cadeia de valor do setor elétrico',
  intro: 'Quatro elos funcionais: limites físicos de tensão, governança (ANEEL/ONS) e liquidação contábil CCEE.',
  revenueModel: 'Modelo de remuneração',
  regulator: 'Regulação e governança',
  highlights: 'Dinâmica operacional',
  metrics: 'Métricas do elo',
  companies: 'Agentes no Brasil'
};

const EN: typeof PT = {
  title: 'Power sector value chain',
  intro:
    'Four functional links: physical voltage limits, governance (ANEEL, the regulator; ONS, the system operator) and accounting settlement at CCEE, the market clearing chamber.',
  revenueModel: 'Revenue model',
  regulator: 'Regulation and governance',
  highlights: 'Operating dynamics',
  metrics: 'Link metrics',
  companies: 'Players in Brazil'
};

const COPY: Record<Lang, typeof PT> = { pt: PT, en: EN };

export const useValueChainCopy = () => COPY[useI18n().lang];
