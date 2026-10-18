export const formatDecimal = (value: number, digits: number) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
