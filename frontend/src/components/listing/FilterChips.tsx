'use client';

import { X } from 'lucide-react';
import type { ListingFiltersState } from '@/hooks/useListingFilters';
import { FEES_MAX, FEES_MIN } from '@/types/college';
import { formatINR } from '@/lib/utils';

interface FilterChipsProps {
  filters: ListingFiltersState;
  onRemove: (patch: Partial<ListingFiltersState>) => void;
  onClearAll: () => void;
}

export default function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
  const chips: { key: string; label: string; clear: Partial<ListingFiltersState> }[] = [];

  if (filters.search) {
    chips.push({ key: 'search', label: `Search: ${filters.search}`, clear: { search: '' } });
  }

  filters.location.forEach((loc) => {
    chips.push({
      key: `loc-${loc}`,
      label: loc.replace('|', ', '),
      clear: { location: filters.location.filter((l) => l !== loc) },
    });
  });

  if (filters.minFees > FEES_MIN || filters.maxFees < FEES_MAX) {
    chips.push({
      key: 'fees',
      label: `Fees: ${formatINR(filters.minFees)} – ${formatINR(filters.maxFees)}`,
      clear: { minFees: FEES_MIN, maxFees: FEES_MAX },
    });
  }

  filters.naac.forEach((grade) => {
    chips.push({
      key: `naac-${grade}`,
      label: `NAAC ${grade}`,
      clear: { naac: filters.naac.filter((g) => g !== grade) },
    });
  });

  if (filters.ownership) {
    chips.push({
      key: 'ownership',
      label: filters.ownership,
      clear: { ownership: '' },
    });
  }

  filters.stream.forEach((stream) => {
    chips.push({
      key: `stream-${stream}`,
      label: stream,
      clear: { stream: filters.stream.filter((s) => s !== stream) },
    });
  });

  if (filters.minRating != null) {
    chips.push({
      key: 'rating',
      label: `Min rating ${filters.minRating}+`,
      clear: { minRating: undefined },
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Active filters">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          role="listitem"
          onClick={() => onRemove(chip.clear)}
          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {chip.label}
          <X className="h-3 w-3" aria-hidden />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-semibold text-slate-500 underline-offset-2 hover:text-blue-600 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
