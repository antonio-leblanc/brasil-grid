import { describe, it, expect } from 'vitest';
import { getBrasiliaDateStr } from './onsApi';

describe('getBrasiliaDateStr', () => {
  it('preserva a data de Brasília quando o UTC já avançou para o dia seguinte (após 21h BRT)', () => {
    // 22h30 em Brasília do dia 24/09 = 01h30 UTC do dia 25/09
    const lateNightBrt = new Date('2026-09-25T01:30:00.000Z');
    expect(getBrasiliaDateStr(lateNightBrt)).toBe('2026-09-24');
  });

  it('vira o dia exatamente às 00:00 de Brasília (03:00 UTC)', () => {
    const midnightBrt = new Date('2026-09-25T03:00:00.000Z');
    expect(getBrasiliaDateStr(midnightBrt)).toBe('2026-09-25');
  });

  it('retorna a data correta no meio do dia em Brasília', () => {
    const middayBrt = new Date('2026-09-24T15:00:00.000Z'); // 12h00 BRT
    expect(getBrasiliaDateStr(middayBrt)).toBe('2026-09-24');
  });
});
