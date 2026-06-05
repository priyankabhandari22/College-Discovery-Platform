import { describe, it, expect } from 'vitest';
import { querySeedColleges } from './college-query';
import { SEED_COLLEGES } from '@/data/seed-colleges';

describe('querySeedColleges', () => {
  it('returns all colleges with default params', () => {
    const result = querySeedColleges({});
    expect(result.colleges.length).toBeLessThanOrEqual(6);
    expect(result.totalCount).toBe(SEED_COLLEGES.length);
    expect(result.page).toBe(1);
  });

  it('sorts by rating descending by default', () => {
    const result = querySeedColleges({ limit: 15 });
    const ratings = result.colleges.map((c) => c.rating);
    for (let i = 1; i < ratings.length; i++) {
      expect(ratings[i]).toBeLessThanOrEqual(ratings[i - 1]);
    }
  });

  it('filters by search query', () => {
    const result = querySeedColleges({ search: 'IIT' });
    expect(result.colleges.every((c) => c.name.includes('IIT'))).toBe(true);
  });

  it('filters by location', () => {
    const result = querySeedColleges({ location: ['Pune'] });
    expect(result.colleges.every((c) => c.city === 'Pune')).toBe(true);
  });

  it('filters by minimum rating', () => {
    const result = querySeedColleges({ minRating: 4.5, limit: 15 });
    expect(result.colleges.every((c) => c.rating >= 4.5)).toBe(true);
  });

  it('filters by fees range', () => {
    const result = querySeedColleges({ minFees: 150000, maxFees: 250000, limit: 15 });
    expect(result.colleges.every((c) => c.annualFees >= 150000 && c.annualFees <= 250000)).toBe(true);
  });

  it('filters by ownership type', () => {
    const result = querySeedColleges({ ownership: 'Government', limit: 15 });
    expect(result.colleges.every((c) => c.ownership === 'Government')).toBe(true);
  });

  it('filters by NAAC grade', () => {
    const result = querySeedColleges({ naac: ['A++'], limit: 15 });
    expect(result.colleges.every((c) => c.naacGrade === 'A++')).toBe(true);
  });

  it('filters by stream', () => {
    const result = querySeedColleges({ stream: ['CS'], limit: 15 });
    expect(result.colleges.every((c) => c.streams.includes('CS'))).toBe(true);
  });

  it('paginates correctly', () => {
    const page1 = querySeedColleges({ page: 1, limit: 3 });
    expect(page1.colleges.length).toBe(3);
    expect(page1.page).toBe(1);

    const page2 = querySeedColleges({ page: 2, limit: 3 });
    expect(page2.colleges.length).toBe(3);
    expect(page2.page).toBe(2);

    const ids1 = page1.colleges.map((c) => c.id);
    const ids2 = page2.colleges.map((c) => c.id);
    expect(ids1).not.toEqual(ids2);
  });

  it('sorts by fees ascending', () => {
    const result = querySeedColleges({ sort: 'fees-asc', limit: 15 });
    for (let i = 1; i < result.colleges.length; i++) {
      expect(result.colleges[i].annualFees).toBeGreaterThanOrEqual(result.colleges[i - 1].annualFees);
    }
  });

  it('sorts by fees descending', () => {
    const result = querySeedColleges({ sort: 'fees-desc', limit: 15 });
    for (let i = 1; i < result.colleges.length; i++) {
      expect(result.colleges[i].annualFees).toBeLessThanOrEqual(result.colleges[i - 1].annualFees);
    }
  });

  it('sorts by name alphabetically', () => {
    const result = querySeedColleges({ sort: 'name', limit: 15 });
    for (let i = 1; i < result.colleges.length; i++) {
      expect(result.colleges[i].name.localeCompare(result.colleges[i - 1].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('returns empty array when no filters match', () => {
    const result = querySeedColleges({ search: 'zzzznonexistent' });
    expect(result.colleges).toHaveLength(0);
    expect(result.totalCount).toBe(0);
  });
});
