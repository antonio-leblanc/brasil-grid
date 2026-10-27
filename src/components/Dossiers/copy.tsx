import { useI18n } from '../../i18n/context';
import type { Lang } from '../../i18n/language';

const PT = {
  title: 'Dossiês do SIN',
  intro: 'Eventos críticos, transitórios eletromecânicos, controle de frequência/tensão e modelagem ONS/CCEE.',
  formulas: 'Formulações físicas',
  technicalNote: 'Nota técnica: ',
  lessons: 'Lições de engenharia e contramedidas'
};

const EN: typeof PT = {
  title: 'SIN dossiers',
  intro: 'Critical events, electromechanical transients, frequency/voltage control and ONS/CCEE modeling.',
  formulas: 'Physical formulations',
  technicalNote: 'Technical note: ',
  lessons: 'Engineering lessons and countermeasures'
};

const COPY: Record<Lang, typeof PT> = { pt: PT, en: EN };

export const useDossiersCopy = () => COPY[useI18n().lang];
