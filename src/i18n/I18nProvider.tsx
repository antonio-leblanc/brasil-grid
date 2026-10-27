import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nContext } from './context';
import {
  LOCALES,
  readBrowserLanguage,
  readExplicitLanguage,
  setActiveLang,
  storeLanguage,
  type Lang
} from './language';
import { en } from './messages/en';
import { pt, type Messages } from './messages/pt';

const MESSAGES: Record<Lang, Messages> = { pt, en };

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initial] = useState(() => {
    const explicit = readExplicitLanguage();
    const lang = explicit ?? readBrowserLanguage();
    setActiveLang(lang);
    return { lang, isExplicit: explicit !== null };
  });
  const [lang, setLangState] = useState<Lang>(initial.lang);
  const [isExplicit, setIsExplicit] = useState(initial.isExplicit);

  const setLang = useCallback((next: Lang) => {
    setActiveLang(next);
    storeLanguage(next);
    setIsExplicit(true);
    setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = LOCALES[lang];
    document.title = MESSAGES[lang].meta.title;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, isExplicit, t: MESSAGES[lang] }), [lang, setLang, isExplicit]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
