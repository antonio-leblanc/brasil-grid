export type Lang = 'pt' | 'en';

export const LOCALES: Record<Lang, string> = { pt: 'pt-BR', en: 'en-US' };

const STORAGE_KEY = 'brasil-grid:lang';

const isLang = (value: string | null): value is Lang => value === 'pt' || value === 'en';

// Number formatting lives in plain helpers outside React, so the active locale is module state set by the provider.
let numberLocale = LOCALES.pt;

export const getNumberLocale = () => numberLocale;

export const setNumberLocale = (lang: Lang) => {
  numberLocale = LOCALES[lang];
};

/** `?lang=` wins over a stored choice, so a shared link always opens in the language it was sent in. */
export function readExplicitLanguage(): Lang | null {
  if (typeof window === 'undefined') return null;

  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // Storage blocked (private mode, sandboxed iframe): fall through to the browser language.
  }
  return null;
}

export function readBrowserLanguage(): Lang {
  if (typeof navigator === 'undefined') return 'pt';
  const preferred = navigator.languages?.[0] ?? navigator.language ?? '';
  return preferred.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function storeLanguage(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage blocked: the choice still holds for this session via the URL.
  }
}
