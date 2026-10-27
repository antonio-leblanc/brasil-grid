import { useI18n } from '../../i18n/context';
import type { Lang } from '../../i18n/language';

const PT = {
  title: 'Régua de grandezas',
  intro: 'Cada prefixo (k, M, G, T) multiplica a grandeza por 10³.',
  instantaneous: 'instantâneo',
  cumulative: 'acumulado'
};

const EN: typeof PT = {
  title: 'Scale of magnitudes',
  intro: 'Each prefix (k, M, G, T) multiplies the quantity by 10³.',
  instantaneous: 'instantaneous',
  cumulative: 'cumulative'
};

const COPY: Record<Lang, typeof PT> = { pt: PT, en: EN };

export const useScalesCopy = () => COPY[useI18n().lang];
