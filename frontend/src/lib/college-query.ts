import type { Prisma } from '@prisma/client';
import type {
  CollegeListItem,
  CollegesQueryParams,
  EngineeringStream,
  NaacGrade,
  Ownership,
  SortOption,
} from '@/types/college';
import { SEED_COLLEGES } from '@/data/seed-colleges';

export function parseListParam(value: string | null): string[] {
  if (!value?.trim()) return [];
  return value.split(',').map((v) => v.trim()).filter(Boolean);
}

export function buildPrismaWhere(params: CollegesQueryParams): Prisma.CollegeWhereInput {
  const where: Prisma.CollegeWhereInput = {};

  if (params.search?.trim()) {
    where.name = { contains: params.search.trim(), mode: 'insensitive' };
  }

  if (params.location?.length) {
    where.OR = params.location.flatMap((loc) => {
      const [city, state] = loc.includes('|') ? loc.split('|') : [loc, loc];
      return [
        { city: { equals: city, mode: 'insensitive' } },
        { state: { equals: state, mode: 'insensitive' } },
        { city: { contains: loc, mode: 'insensitive' } },
      ];
    });
  }

  if (params.minRating != null) {
    where.rating = { gte: params.minRating };
  }

  if (params.minFees != null || params.maxFees != null) {
    where.annualFees = {
      ...(params.minFees != null ? { gte: params.minFees } : {}),
      ...(params.maxFees != null ? { lte: params.maxFees } : {}),
    };
  }

  if (params.ownership) {
    where.ownership = params.ownership;
  }

  if (params.naac?.length) {
    where.naacGrade = { in: params.naac };
  }

  if (params.stream?.length) {
    where.streams = { hasSome: params.stream };
  }

  return where;
}

export function buildPrismaOrderBy(sort: SortOption = 'rating'): Prisma.CollegeOrderByWithRelationInput {
  switch (sort) {
    case 'fees-asc':
      return { annualFees: 'asc' };
    case 'fees-desc':
      return { annualFees: 'desc' };
    case 'name':
      return { name: 'asc' };
    case 'rating':
    default:
      return { rating: 'desc' };
  }
}

export function mapDbCollege(row: {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  annualFees: number;
  naacGrade: string;
  ownership: string;
  streams: string[];
  approvedBy: string[];
  logo: string | null;
  image: string | null;
  placementPct: number | null;
}): CollegeListItem {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    state: row.state,
    rating: row.rating,
    annualFees: row.annualFees,
    naacGrade: row.naacGrade as CollegeListItem['naacGrade'],
    ownership: row.ownership as CollegeListItem['ownership'],
    streams: row.streams as EngineeringStream[],
    approvedBy: row.approvedBy as CollegeListItem['approvedBy'],
    logo: row.logo,
    image: row.image,
    placementPct: row.placementPct,
  };
}

/** In-memory filter/sort/paginate when PostgreSQL is unavailable */
export function querySeedColleges(params: CollegesQueryParams) {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(50, Math.max(1, params.limit ?? 6));
  const sort = params.sort ?? 'rating';

  let results = [...SEED_COLLEGES];

  if (params.search?.trim()) {
    const q = params.search.trim().toLowerCase();
    results = results.filter((c) => c.name.toLowerCase().includes(q));
  }

  if (params.location?.length) {
    results = results.filter((c) =>
      params.location!.some(
        (loc) =>
          c.city.toLowerCase() === loc.toLowerCase() ||
          c.state.toLowerCase() === loc.toLowerCase() ||
          `${c.city}|${c.state}`.toLowerCase() === loc.toLowerCase()
      )
    );
  }

  if (params.minRating != null) {
    results = results.filter((c) => c.rating >= params.minRating!);
  }

  if (params.minFees != null) {
    results = results.filter((c) => c.annualFees >= params.minFees!);
  }

  if (params.maxFees != null) {
    results = results.filter((c) => c.annualFees <= params.maxFees!);
  }

  if (params.ownership) {
    results = results.filter((c) => c.ownership === params.ownership);
  }

  if (params.naac?.length) {
    results = results.filter((c) => params.naac!.includes(c.naacGrade as NaacGrade));
  }

  if (params.stream?.length) {
    results = results.filter((c) =>
      params.stream!.some((s) => c.streams.includes(s))
    );
  }

  results.sort((a, b) => {
    switch (sort) {
      case 'fees-asc':
        return a.annualFees - b.annualFees;
      case 'fees-desc':
        return b.annualFees - a.annualFees;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
      default:
        return b.rating - a.rating;
    }
  });

  const totalCount = results.length;
  const start = (page - 1) * limit;
  const colleges = results.slice(start, start + limit);

  return { colleges, totalCount, page, limit };
}
