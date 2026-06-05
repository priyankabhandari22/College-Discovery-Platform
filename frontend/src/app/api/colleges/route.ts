import { NextRequest, NextResponse } from 'next/server';
import {
  parseListParam,
  querySeedColleges,
} from '@/lib/college-query';
import { searchColleges, searchCollegesByLocation } from '@/lib/college-api';
import type {
  CollegesApiResponse,
  CollegeListItem,
} from '@/types/college';
import { DEFAULT_PAGE_LIMIT } from '@/types/college';
import { SEED_COLLEGES } from '@/data/seed-colleges';

function parseQueryParams(searchParams: URLSearchParams) {
  const location = parseListParam(searchParams.get('location'));
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  return {
    search: searchParams.get('search') ?? undefined,
    location: location.length ? location : undefined,
    page: page ? Math.max(1, Number(page)) : 1,
    limit: limit ? Math.min(50, Math.max(1, Number(limit))) : DEFAULT_PAGE_LIMIT,
  };
}

function apiResultToListItem(item: { id: string; name: string; city: string; state: string }): CollegeListItem {
  const local = SEED_COLLEGES.find(
    (s) => s.city.toLowerCase() === item.city.toLowerCase() && s.name.toLowerCase().includes(item.name.toLowerCase().slice(0, 10)),
  );
  return {
    id: item.id,
    name: item.name,
    city: item.city,
    state: item.state,
    rating: local?.rating ?? 0,
    annualFees: local?.annualFees ?? 0,
    naacGrade: local?.naacGrade ?? 'A',
    ownership: local?.ownership ?? 'Private',
    streams: local?.streams ?? [],
    approvedBy: local?.approvedBy ?? ['AICTE'],
    logo: local?.logo ?? null,
    image: local?.image ?? null,
    placementPct: local?.placementPct ?? null,
  };
}

export async function GET(request: NextRequest) {
  try {
    const params = parseQueryParams(request.nextUrl.searchParams);
    const page = params.page;
    const limit = params.limit;

    if (params.search && params.search.length >= 2) {
      let results = params.location?.length
        ? await searchCollegesByLocation(params.search, 50)
        : await searchColleges(params.search, 50);

      if (params.location?.length) {
        const locLower = params.location.map((l) => l.toLowerCase());
        results = results.filter(
          (r) =>
            locLower.some((l) => r.city.toLowerCase().includes(l)) ||
            locLower.some((l) => r.state.toLowerCase().includes(l)),
        );
      }

      const totalCount = results.length;
      const start = (page - 1) * limit;
      const colleges = results.slice(start, start + limit).map(apiResultToListItem);

      return NextResponse.json({ colleges, totalCount, page, limit } satisfies CollegesApiResponse);
    }

    const fallback = querySeedColleges({
      ...params,
      page,
      limit,
    });
    return NextResponse.json(fallback satisfies CollegesApiResponse);
  } catch {
    const fallback = querySeedColleges({ page: 1, limit: DEFAULT_PAGE_LIMIT });
    return NextResponse.json(fallback satisfies CollegesApiResponse);
  }
}
