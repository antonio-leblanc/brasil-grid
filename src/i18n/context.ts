import { createContext, useContext } from 'react';
import type { Lang } from './language';
import type { Messages } from './messages/pt';

export interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** True when the language came from the URL, storage or the toggle; only then does it go into shareable URLs. */
  isExplicit: boolean;
  t: Messages;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
