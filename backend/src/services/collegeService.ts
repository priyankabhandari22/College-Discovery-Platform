import collegesData from '../data/colleges.json' with { type: 'json' };
import type { College, Stream } from '../types/college.js';

const colleges = collegesData as College[];

export function getColleges(filters?: {
  search?: string;
  stream?: Stream;
  location?: string;
  minRating?: number;
}): College[] {
  let filtered = [...colleges];

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.location.toLowerCase().includes(search)
    );
  }

  if (filters?.stream) {
    filtered = filtered.filter((c) => c.stream === filters.stream);
  }

  if (filters?.location) {
    filtered = filtered.filter((c) =>
      c.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters?.minRating) {
    filtered = filtered.filter((c) => c.rating >= filters.minRating!);
  }

  return filtered;
}

export function getCollegeById(id: string): College | undefined {
  return colleges.find((c) => c.id === id);
}

export function getCollegesByIds(ids: string[]): College[] {
  return colleges.filter((c) => ids.includes(c.id));
}

export function predictColleges(exam: string, rank: number): College[] {
  const withCutoff = colleges.filter((c) => c.cutoffs?.[exam]);

  // Tier 1: exact match (max * 1.1)
  let results = withCutoff.filter((c) => rank >= c.cutoffs![exam]!.min && rank <= c.cutoffs![exam]!.max * 1.1);
  if (results.length > 0) return results;

  // Tier 2: reach (max * 3)
  results = withCutoff.filter((c) => rank >= c.cutoffs![exam]!.min && rank <= c.cutoffs![exam]!.max * 3)
    .sort((a, b) => b.cutoffs![exam]!.max - a.cutoffs![exam]!.max);
  if (results.length > 0) return results;

  // Tier 3: broadest (top 10)
  return withCutoff.sort((a, b) => b.cutoffs![exam]!.max - a.cutoffs![exam]!.max).slice(0, 10);
}
