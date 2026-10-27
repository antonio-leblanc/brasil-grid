import { getNumberLocale } from '../../i18n/language';

export { formatMonth } from '../../utils/format';

export const formatBRL = (value: number) => Math.round(value).toLocaleString(getNumberLocale());
