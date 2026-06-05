import { describe, it, expect } from 'vitest';
import { getWinner, COMPARE_ROWS } from './compare';

describe('getWinner', () => {
  it('returns "tie" for text rows regardless of values', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'location')!;
    expect(getWinner(row, 'Mumbai', 'Pune')).toBe('tie');
    expect(getWinner(row, 'Mumbai', 'Mumbai')).toBe('tie');
  });

  it('returns "tie" for boolean rows', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'jeeCutoff')!;
    expect(getWinner(row, true, false)).toBe('tie');
  });

  it('returns "a" when a is higher and higherIsBetter is true', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'rating')!;
    expect(getWinner(row, 4.5, 4.0)).toBe('a');
  });

  it('returns "b" when b is higher and higherIsBetter is true', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'rating')!;
    expect(getWinner(row, 3.5, 4.0)).toBe('b');
  });

  it('returns "a" when a is lower and higherIsBetter is false', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'fees')!;
    expect(getWinner(row, 100000, 200000)).toBe('a');
  });

  it('returns "b" when b is lower and higherIsBetter is false', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'fees')!;
    expect(getWinner(row, 200000, 100000)).toBe('b');
  });

  it('returns "tie" when values are equal', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'rating')!;
    expect(getWinner(row, 4.0, 4.0)).toBe('tie');
  });

  it('parses string numbers correctly', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'avgCTC')!;
    expect(getWinner(row, '500000', '600000')).toBe('b');
  });

  it('returns "tie" when values are NaN', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'avgCTC')!;
    expect(getWinner(row, 'abc', 123)).toBe('tie');
  });

  it('returns "tie" for percentage rows with equal values', () => {
    const row = COMPARE_ROWS.find((r) => r.key === 'placementPct')!;
    expect(getWinner(row, 85, 85)).toBe('tie');
  });
});

describe('COMPARE_ROWS', () => {
  it('has all required keys present', () => {
    const keys = COMPARE_ROWS.map((r) => r.key);
    expect(keys).toContain('rating');
    expect(keys).toContain('fees');
    expect(keys).toContain('avgCTC');
    expect(keys).toContain('location');
  });

  it('has no duplicate keys', () => {
    const keys = COMPARE_ROWS.map((r) => r.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('has valid format values', () => {
    const validFormats = ['currency', 'percent', 'text', 'rating', 'boolean'];
    for (const row of COMPARE_ROWS) {
      expect(validFormats).toContain(row.format);
    }
  });
});
