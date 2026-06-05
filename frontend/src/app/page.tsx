'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { Search, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useListingFilters } from '@/hooks/useListingFilters';
import { useColleges } from '@/hooks/useColleges';
import { useCompareStore } from '@/stores/useCompareStore';
import { useSavedColleges } from '@/hooks/useSavedColleges';
import CollegeCard from '@/components/college/CollegeCard';
import FilterSidebar from '@/components/listing/FilterSidebar';
import FilterChips from '@/components/listing/FilterChips';
import CollegeGridSkeleton from '@/components/listing/CollegeGridSkeleton';
import ListingEmptyState from '@/components/listing/ListingEmptyState';
import ListingPagination from '@/components/listing/ListingPagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { SortOption } from '@/types/college';

function CollegeListingContent() {
  const { filters, apiParams, updateUrl, clearFilters, setPage } = useListingFilters();
  const [searchInput, setSearchInput] = useState(filters.search);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      updateUrl({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, updateUrl]);

  const { colleges, totalCount, page, limit, loading, error, retry } = useColleges(apiParams);

  const compareIds = useCompareStore((s) => s.selectedIds);
  const toggleCompare = useCompareStore((s) => s.toggle);
  const canAddCompare = useCompareStore((s) => s.canAdd);
  const { toggle: toggleSaved, isSaved } = useSavedColleges();

  const handleFilterChange = useCallback(
    (patch: Parameters<typeof updateUrl>[0]) => updateUrl(patch),
    [updateUrl]
  );

  const handleChipRemove = useCallback(
    (patch: Parameters<typeof updateUrl>[0]) => updateUrl(patch),
    [updateUrl]
  );

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 pt-16">
      <section className="border-b border-slate-200 bg-gradient-to-br from-blue-700 to-indigo-900 px-4 py-10 text-white sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-200">
            MHT-CET & JEE Mains · Maharashtra
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            Discover Engineering Colleges
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-blue-100 sm:text-base">
            Compare fees, NAAC grades, and placements. Save favourites and compare up to 2 colleges side-by-side.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-4">
          <Label htmlFor="college-search" className="sr-only">
            Search colleges by name
          </Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden />
            <Input
              id="college-search"
              type="search"
              placeholder="Search by college name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-11 pl-10"
              autoComplete="off"
            />
          </div>
        </div>

        <FilterChips
          filters={filters}
          onRemove={handleChipRemove}
          onClearAll={clearFilters}
        />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <div className="lg:hidden">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setMobileFiltersOpen((o) => !o)}
              aria-expanded={mobileFiltersOpen}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              {mobileFiltersOpen ? 'Hide filters' : 'Show filters'}
            </Button>
            {mobileFiltersOpen && (
              <div className="mt-4">
                <FilterSidebar filters={filters} onChange={handleFilterChange} />
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600" aria-live="polite">
                {loading ? 'Loading colleges...' : `${totalCount} colleges found`}
              </p>
              <div className="flex items-center gap-2">
                <Label htmlFor="sort-select" className="sr-only">
                  Sort results
                </Label>
                <Select
                  id="sort-select"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value as SortOption })}
                  className="w-full sm:w-48"
                  aria-label="Sort colleges"
                >
                  <option value="rating">Rating (high → low)</option>
                  <option value="fees-asc">Fees (low → high)</option>
                  <option value="fees-desc">Fees (high → low)</option>
                  <option value="name">Name (A → Z)</option>
                </Select>
              </div>
            </div>

            {error ? (
              <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-8 text-center">
                <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" aria-hidden />
                <p className="mb-4 font-medium text-red-800">{error}</p>
                <Button type="button" variant="outline" onClick={retry}>
                  Try again
                </Button>
              </div>
            ) : loading ? (
              <CollegeGridSkeleton count={6} />
            ) : colleges.length === 0 ? (
              <ListingEmptyState onClear={clearFilters} />
            ) : (
              <>
                <div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                  aria-busy={loading}
                >
                  {colleges.map((college) => {
                    const selected = compareIds.includes(college.id);
                    return (
                      <CollegeCard
                        key={college.id}
                        college={college}
                        isCompareSelected={selected}
                        isCompareDisabled={!canAddCompare(college.id)}
                        isSaved={isSaved(college.id)}
                        onCompareToggle={toggleCompare}
                        onSaveToggle={toggleSaved}
                      />
                    );
                  })}
                </div>
                <ListingPagination
                  page={page}
                  limit={limit}
                  totalCount={totalCount}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<CollegeGridSkeleton count={6} />}>
      <CollegeListingContent />
    </Suspense>
  );
}
