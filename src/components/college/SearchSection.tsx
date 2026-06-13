import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Stream } from '@/types/college';
import { SortOption } from '@/hooks/useColleges';

interface SearchSectionProps {
  search: string;
  setSearch: (value: string) => void;
  stream: Stream | 'All';
  setStream: (value: Stream | 'All') => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

export function SearchSection({
  search,
  setSearch,
  stream,
  setStream,
  sortBy,
  setSortBy
}: SearchSectionProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 mb-10 translate-y-[-50%] max-w-5xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by college name, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all text-gray-700 font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full lg:w-auto">
          {/* Stream Filter */}
          <div className="relative w-full md:w-44">
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value as Stream | 'All')}
              className="w-full appearance-none pl-4 pr-10 py-4 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all text-gray-700 font-medium cursor-pointer"
            >
              <option value="All">All Streams</option>
              <option value="Engineering">Engineering</option>
              <option value="Arts">Arts</option>
              <option value="Commerce">Commerce</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Filter */}
          <div className="relative w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full appearance-none pl-4 pr-10 py-4 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all text-gray-700 font-medium cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="fees-asc">Lowest Fees</option>
              <option value="fees-desc">Highest Fees</option>
              <option value="placement">Best Placements</option>
            </select>
            <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap justify-center lg:justify-start">
        {['Mumbai', 'Delhi', 'Chennai', 'Pune', 'Bangalore'].map((city) => (
          <button
            key={city}
            onClick={() => setSearch(city)}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold hover:bg-blue-100 transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
