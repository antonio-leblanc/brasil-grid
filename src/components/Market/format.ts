const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export const formatMonth = (mes: string) => `${MONTHS[Number(mes.slice(5, 7)) - 1]}/${mes.slice(0, 4)}`;

export const formatBRL = (value: number) => Math.round(value).toLocaleString('pt-BR');
