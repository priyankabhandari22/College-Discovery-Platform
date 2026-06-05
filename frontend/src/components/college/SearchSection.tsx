import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Stream } from '@/types/college';
import { SortOption } from '@/types/college';

interface SearchSectionProps {
  search: string;
  setSearch: (value: string) => void;
  stream: Stream | 'All';
  setStream: (value: Stream | 'All') => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

const cityQuickFilters = ['Mumbai', 'Delhi', 'Chennai', 'Pune', 'Bangalore'] as const;

export function SearchSection({
  search,
  setSearch,
  stream,
  setStream,
  sortBy,
  setSortBy,
}: SearchSectionProps) {
  return (
    <section
      aria-label="Search and filter colleges"
      className="mx-auto mb-8 w-full max-w-5xl -mt-20 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-blue-900/5 sm:-mt-24 sm:mb-10 sm:rounded-3xl sm:p-6 md:-mt-32"
    >
      <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
        <div className="relative w-full flex-1">
          <label htmlFor="college-search" className="sr-only">
            Search colleges by name or city
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            id="college-search"
            type="search"
            placeholder="Search by college name, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            className="w-full rounded-2xl border border-transparent bg-gray-50 py-3.5 pl-12 pr-4 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600 sm:py-4"
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative w-full sm:w-44">
            <label htmlFor="stream-filter" className="sr-only">
              Filter by stream
            </label>
            <select
              id="stream-filter"
              value={stream}
              onChange={(e) => setStream(e.target.value as Stream | 'All')}
              className="w-full cursor-pointer appearance-none rounded-2xl border border-transparent bg-gray-50 py-3.5 pl-4 pr-10 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600 sm:py-4"
            >
              <option value="All">All Streams</option>
              <option value="Engineering">Engineering</option>
              <option value="Arts">Arts</option>
              <option value="Commerce">Commerce</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
          </div>

          <div className="relative w-full sm:w-48">
            <label htmlFor="sort-filter" className="sr-only">
              Sort results
            </label>
            <select
              id="sort-filter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full cursor-pointer appearance-none rounded-2xl border border-transparent bg-gray-50 py-3.5 pl-4 pr-10 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600 sm:py-4"
            >
              <option value="rating">Top Rated</option>
              <option value="fees-asc">Lowest Fees</option>
              <option value="fees-desc">Highest Fees</option>
              <option value="placement">Best Placements</option>
            </select>
            <SlidersHorizontal
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div
        className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start"
        role="group"
        aria-label="Quick city filters"
      >
        {cityQuickFilters.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setSearch(city)}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}
