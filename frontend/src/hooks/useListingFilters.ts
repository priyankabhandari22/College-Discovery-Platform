'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type {
  CollegesQueryParams,
  EngineeringStream,
  NaacGrade,
  Ownership,
  SortOption,
} from '@/types/college';
import { DEFAULT_PAGE_LIMIT, FEES_MAX, FEES_MIN } from '@/types/college';
import { parseListParam } from '@/lib/college-query';

export interface ListingFiltersState {
  search: string;
  location: string[];
  minRating: number | undefined;
  minFees: number;
  maxFees: number;
  stream: EngineeringStream[];
  ownership: Ownership | '';
  naac: NaacGrade[];
  sort: SortOption;
  page: number;
}

const DEFAULT_STATE: ListingFiltersState = {
  search: '',
  location: [],
  minRating: undefined,
  minFees: FEES_MIN,
  maxFees: FEES_MAX,
  stream: [],
  ownership: '',
  naac: [],
  sort: 'rating',
  page: 1,
};

function parseFromUrl(params: URLSearchParams): ListingFiltersState {
  const minFees = params.get('minFees');
  const maxFees = params.get('maxFees');
  const minRating = params.get('minRating');
  const page = params.get('page');
  const sort = params.get('sort') as SortOption | null;
  const ownership = params.get('ownership') as Ownership | '';

  return {
    search: params.get('search') ?? '',
    location: parseListParam(params.get('location')),
    minRating: minRating ? Number(minRating) : undefined,
    minFees: minFees ? Number(minFees) : FEES_MIN,
    maxFees: maxFees ? Number(maxFees) : FEES_MAX,
    stream: parseListParam(params.get('stream')) as EngineeringStream[],
    ownership: ownership || '',
    naac: parseListParam(params.get('naac')) as NaacGrade[],
    sort: sort && ['rating', 'fees-asc', 'fees-desc', 'name'].includes(sort) ? sort : 'rating',
    page: page ? Math.max(1, Number(page)) : 1,
  };
}

function toQueryParams(state: ListingFiltersState): CollegesQueryParams {
  return {
    search: state.search || undefined,
    location: state.location.length ? state.location : undefined,
    minRating: state.minRating,
    minFees: state.minFees > FEES_MIN ? state.minFees : undefined,
    maxFees: state.maxFees < FEES_MAX ? state.maxFees : undefined,
    stream: state.stream.length ? state.stream : undefined,
    ownership: state.ownership || undefined,
    naac: state.naac.length ? state.naac : undefined,
    sort: state.sort,
    page: state.page,
    limit: DEFAULT_PAGE_LIMIT,
  };
}

export function useListingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFromUrl(searchParams),
    [searchParams]
  );

  const apiParams = useMemo(() => toQueryParams(filters), [filters]);

  const updateUrl = useCallback(
    (next: Partial<ListingFiltersState>, resetPage = true) => {
      const merged = { ...filters, ...next, ...(resetPage ? { page: 1 } : {}) };
      const sp = new URLSearchParams();

      if (merged.search) sp.set('search', merged.search);
      if (merged.location.length) sp.set('location', merged.location.join(','));
      if (merged.minRating != null) sp.set('minRating', String(merged.minRating));
      if (merged.minFees > FEES_MIN) sp.set('minFees', String(merged.minFees));
      if (merged.maxFees < FEES_MAX) sp.set('maxFees', String(merged.maxFees));
      if (merged.stream.length) sp.set('stream', merged.stream.join(','));
      if (merged.ownership) sp.set('ownership', merged.ownership);
      if (merged.naac.length) sp.set('naac', merged.naac.join(','));
      if (merged.sort !== 'rating') sp.set('sort', merged.sort);
      if (merged.page > 1) sp.set('page', String(merged.page));

      const qs = sp.toString();
      router.push(qs ? `/?${qs}` : '/', { scroll: false });
    },
    [filters, router]
  );

  const clearFilters = useCallback(() => {
    router.push('/', { scroll: false });
  }, [router]);

  const setPage = useCallback(
    (page: number) => updateUrl({ page }, false),
    [updateUrl]
  );

  return {
    filters,
    apiParams,
    updateUrl,
    clearFilters,
    setPage,
    defaults: DEFAULT_STATE,
  };
}
