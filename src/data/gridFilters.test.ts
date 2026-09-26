import { describe, expect, it } from 'vitest';
import {
  normalizeLineFilter,
  matchesLineFilter,
  getLineMapLibreFilter,
  matchesPlantFilter,
  getPlantMapLibreFilter
} from './gridFilters';
import { majorTransmissionLines } from './transmissionLinesData';

describe('gridFilters', () => {
  describe('normalizeLineFilter', () => {
    it('normaliza "CC" e o alias legado "800"', () => {
      expect(normalizeLineFilter('CC')).toBe('CC');
      expect(normalizeLineFilter('800')).toBe('CC');
      expect(normalizeLineFilter('500')).toBe('500');
      expect(normalizeLineFilter('all')).toBe('all');
      expect(normalizeLineFilter(null)).toBe('all');
      expect(normalizeLineFilter(undefined)).toBe('all');
      expect(normalizeLineFilter('invalid')).toBe('all');
    });
  });

  describe('matchesLineFilter', () => {
    it('filtra corretamente linhas em corrente contínua (CC)', () => {
      const ccLine = { type: 'CC' as const, voltageKV: 600 };
      const caLine = { type: 'CA' as const, voltageKV: 765 };

      expect(matchesLineFilter(ccLine, 'CC')).toBe(true);
      expect(matchesLineFilter(caLine, 'CC')).toBe(false);
    });

    it('inclui os bipolos de ±600 kV de Itaipu e Madeira no filtro CC', () => {
      const ccLines = majorTransmissionLines.filter((l) => matchesLineFilter(l, 'CC'));
      const ccIds = ccLines.map((l) => l.id);

      expect(ccIds).toContain('linha-belo-monte-rio'); // 800 kV
      expect(ccIds).toContain('linha-belo-monte-estreito'); // 800 kV
      expect(ccIds).toContain('linha-madeira-sp'); // 600 kV
      expect(ccIds).toContain('bipolo-itaipu-ibiuna'); // 600 kV
      expect(ccIds).toContain('linha-gracaaranha-silvania'); // 800 kV
    });

    it('filtra corretamente linhas >= 500 kV', () => {
      expect(matchesLineFilter({ type: 'CA', voltageKV: 500 }, '500')).toBe(true);
      expect(matchesLineFilter({ type: 'CA', voltageKV: 765 }, '500')).toBe(true);
      expect(matchesLineFilter({ type: 'CA', voltageKV: 345 }, '500')).toBe(false);
      expect(matchesLineFilter({ type: 'CA', voltageKV: 230 }, '500')).toBe(false);
    });

    it('all aceita qualquer linha', () => {
      expect(matchesLineFilter({ type: 'CA', voltageKV: 230 }, 'all')).toBe(true);
      expect(matchesLineFilter({ type: 'CC', voltageKV: 800 }, 'all')).toBe(true);
    });
  });

  describe('getLineMapLibreFilter', () => {
    it('produz as expressões MapLibre equivalentes aos predicados', () => {
      expect(getLineMapLibreFilter('CC')).toEqual(['==', ['get', 'type'], 'CC']);
      expect(getLineMapLibreFilter('500')).toEqual(['>=', ['get', 'voltageKV'], 500]);
      expect(getLineMapLibreFilter('all')).toBeNull();
    });
  });

  describe('matchesPlantFilter and getPlantMapLibreFilter', () => {
    it('filtra usinas por tipo', () => {
      expect(matchesPlantFilter({ type: 'hidro' }, 'hidro')).toBe(true);
      expect(matchesPlantFilter({ type: 'solar' }, 'hidro')).toBe(false);
      expect(matchesPlantFilter({ type: 'solar' }, 'all')).toBe(true);
    });

    it('produz expressões MapLibre para usinas', () => {
      expect(getPlantMapLibreFilter('hidro')).toEqual(['==', ['get', 'type'], 'hidro']);
      expect(getPlantMapLibreFilter('all')).toBeNull();
    });
  });
});
