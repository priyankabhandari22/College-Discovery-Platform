const API_BASE = 'https://api.collegedb.in/v1/colleges';
const API_KEY = process.env.COLLEGEDB_API_KEY ?? '';

export interface CollegeDbResult {
  id: string;
  name: string;
  city: string;
  state: string;
}

interface SearchResponse {
  results: CollegeDbResult[];
  query: string;
}

const searchCache = new Map<string, { data: CollegeDbResult[]; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000;

async function searchApi(query: string, limit = 20): Promise<CollegeDbResult[]> {
  const cacheKey = `${query}:${limit}`;
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  const url = `${API_BASE}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`CollegeDB API error: ${res.status}`);
  }

  const body = (await res.json()) as SearchResponse;
  searchCache.set(cacheKey, { data: body.results, ts: Date.now() });
  return body.results;
}

export async function searchColleges(query: string, limit = 20): Promise<CollegeDbResult[]> {
  if (query.length < 2) return [];
  return searchApi(query, limit);
}

export async function searchCollegesByLocation(
  location: string,
  limit = 20,
): Promise<CollegeDbResult[]> {
  if (location.length < 2) return [];
  const results = await searchApi(location, limit * 2);
  const lower = location.toLowerCase();
  return results.filter(
    (c) => c.city.toLowerCase().includes(lower) || c.state.toLowerCase().includes(lower),
  );
}

export async function batchFetchCollegeNames(ids: string[]): Promise<Map<string, CollegeDbResult>> {
  const map = new Map<string, CollegeDbResult>();
  const uncached = ids.filter((id) => {
    const entry = searchCache.get(id);
    if (entry && Date.now() - entry.ts < CACHE_TTL) {
      for (const r of entry.data) map.set(r.id, r);
      return false;
    }
    return true;
  });
  if (uncached.length === 0) return map;
  const allResults = await searchApi('college', 50);
  for (const r of allResults) {
    if (ids.includes(r.id)) {
      map.set(r.id, r);
    }
  }
  return map;
}
