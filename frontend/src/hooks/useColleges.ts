'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import type { CollegesApiResponse, CollegesQueryParams } from '@/types/college';

function buildQueryString(params: CollegesQueryParams): string {
  const sp = new URLSearchParams();

  if (params.search) sp.set('search', params.search);
  if (params.location?.length) sp.set('location', params.location.join(','));
  if (params.minRating != null) sp.set('minRating', String(params.minRating));
  if (params.minFees != null) sp.set('minFees', String(params.minFees));
  if (params.maxFees != null) sp.set('maxFees', String(params.maxFees));
  if (params.stream?.length) sp.set('stream', params.stream.join(','));
  if (params.ownership) sp.set('ownership', params.ownership);
  if (params.naac?.length) sp.set('naac', params.naac.join(','));
  if (params.sort) sp.set('sort', params.sort);
  if (params.page) sp.set('page', String(params.page));
  if (params.limit) sp.set('limit', String(params.limit));

  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export function useColleges(params: CollegesQueryParams) {
  const [data, setData] = useState<CollegesApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const paramsKey = JSON.stringify(params);

  const fetchColleges = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/colleges${buildQueryString(params)}`, {
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Failed to load colleges (${res.status})`);
      }

      const json: CollegesApiResponse = await res.json();
      if (!controller.signal.aborted) {
        setData(json);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      if (!controller.signal.aborted) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setData(null);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [paramsKey]);

  useEffect(() => {
    fetchColleges();
    return () => abortRef.current?.abort();
  }, [fetchColleges]);

  return {
    colleges: data?.colleges ?? [],
    totalCount: data?.totalCount ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 6,
    loading,
    error,
    retry: fetchColleges,
  };
}
