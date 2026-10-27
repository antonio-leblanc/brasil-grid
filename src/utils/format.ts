import { getActiveLang, getNumberLocale } from '../i18n/language';

export const formatDecimal = (value: number, digits: number) =>
  value.toLocaleString(getNumberLocale(), { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const formatNumber = (value: number) => value.toLocaleString(getNumberLocale());

const MONTHS = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

/** Hour of day as an axis label: `18h` in Portuguese, `18:00` in English. */
export const formatHour = (hour: number) => {
  const hh = String(hour).padStart(2, '0');
  return getActiveLang() === 'pt' ? `${hh}h` : `${hh}:00`;
};

/** `YYYY-MM` → `out/2026` or `Oct 2026`. */
export const formatMonth = (isoMonth: string) => {
  const year = isoMonth.slice(0, 4);
  const month = Number(isoMonth.slice(5, 7)) - 1;
  const lang = getActiveLang();
  return lang === 'pt' ? `${MONTHS.pt[month]}/${year}` : `${MONTHS.en[month]} ${year}`;
};

/** `YYYY-MM-DD` → `26/10` and `26/10/2026`, or `26 Oct` and `26 Oct 2026`. */
export const formatDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-');
  if (getActiveLang() === 'pt') return { short: `${day}/${month}`, full: `${day}/${month}/${year}` };
  const short = `${Number(day)} ${MONTHS.en[Number(month) - 1]}`;
  return { short, full: `${short} ${year}` };
};
