import { getNumberLocale } from '../i18n/language';

export const formatDecimal = (value: number, digits: number) =>
  value.toLocaleString(getNumberLocale(), { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const formatNumber = (value: number) => value.toLocaleString(getNumberLocale());
