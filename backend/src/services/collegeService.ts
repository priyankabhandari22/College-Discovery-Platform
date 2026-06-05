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
  return colleges.filter((c) => {
    const cutoff = c.cutoffs?.[exam];
    if (!cutoff) return false;
    return rank >= cutoff.min && rank <= cutoff.max * 1.1;
  });
}
