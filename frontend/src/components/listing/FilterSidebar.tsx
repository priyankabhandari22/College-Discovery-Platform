'use client';

import { useState } from 'react';
import {
  ENGINEERING_STREAMS,
  FEES_MAX,
  FEES_MIN,
  LOCATION_OPTIONS,
  NAAC_GRADES,
  OWNERSHIP_OPTIONS,
} from '@/types/college';
import type { ListingFiltersState } from '@/hooks/useListingFilters';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RangeSlider } from '@/components/ui/slider';
import type { EngineeringStream, NaacGrade, Ownership } from '@/types/college';

interface FilterSidebarProps {
  filters: ListingFiltersState;
  onChange: (patch: Partial<ListingFiltersState>) => void;
}

function CollapsibleSection({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)}
        className="mb-1 flex w-full items-center justify-between text-sm font-bold uppercase tracking-wider text-slate-500">
        {title}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleLocation = (key: string) => {
    const next = filters.location.includes(key)
      ? filters.location.filter((l) => l !== key)
      : [...filters.location, key];
    onChange({ location: next });
  };

  const toggleStream = (stream: EngineeringStream) => {
    const next = filters.stream.includes(stream)
      ? filters.stream.filter((s) => s !== stream)
      : [...filters.stream, stream];
    onChange({ stream: next });
  };

  const toggleNaac = (grade: NaacGrade) => {
    const next = filters.naac.includes(grade)
      ? filters.naac.filter((g) => g !== grade)
      : [...filters.naac, grade];
    onChange({ naac: next });
  };

  const activeLocationCount = filters.location.length;
  const activeNaacCount = filters.naac.length;
  const activeStreamCount = filters.stream.length;

  return (
    <aside
      className="w-full shrink-0 space-y-6 rounded-xl border border-slate-200 bg-white p-4 lg:w-64 xl:w-72"
      aria-label="College filters"
    >
      <CollapsibleSection title={`Location${activeLocationCount ? ` (${activeLocationCount})` : ''}`}>
        <div className="max-h-64 space-y-2 overflow-y-auto">
          {LOCATION_OPTIONS.map(({ city, state }) => {
            const key = `${city}|${state}`;
            const id = `loc-${city}`;
            return (
              <Checkbox
                key={key}
                id={id}
                label={`${city}, ${state}`}
                checked={filters.location.includes(key) || filters.location.includes(city)}
                onChange={() => toggleLocation(key)}
              />
            );
          })}
        </div>
      </CollapsibleSection>

      <div>
        <Label htmlFor="fees-range" className="mb-3 block text-sm font-bold uppercase tracking-wider text-slate-500">
          Annual fees range
        </Label>
        <RangeSlider
          id="fees-range"
          min={FEES_MIN}
          max={FEES_MAX}
          step={10000}
          value={[filters.minFees, filters.maxFees]}
          onValueChange={([minFees, maxFees]) => onChange({ minFees, maxFees })}
          aria-label="Filter by annual fees"
        />
      </div>

      <CollapsibleSection title={`NAAC grade${activeNaacCount ? ` (${activeNaacCount})` : ''}`}>
        {NAAC_GRADES.map((grade) => (
          <Checkbox
            key={grade}
            id={`naac-${grade}`}
            label={grade}
            checked={filters.naac.includes(grade)}
            onChange={() => toggleNaac(grade)}
          />
        ))}
      </CollapsibleSection>

      <CollapsibleSection title={`Ownership${filters.ownership ? ` (${filters.ownership})` : ''}`}>
        <fieldset>
          <div className="space-y-2">
            {OWNERSHIP_OPTIONS.map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  name="ownership"
                  checked={filters.ownership === type}
                  onChange={() => onChange({ ownership: type as Ownership })}
                  className="text-blue-600 focus:ring-blue-600"
                />
                {type}
              </label>
            ))}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                name="ownership"
                checked={!filters.ownership}
                onChange={() => onChange({ ownership: '' })}
                className="text-blue-600 focus:ring-blue-600"
              />
              All types
            </label>
          </div>
        </fieldset>
      </CollapsibleSection>

      <CollapsibleSection title={`Stream${activeStreamCount ? ` (${activeStreamCount})` : ''}`}>
        {ENGINEERING_STREAMS.map((stream) => (
          <Checkbox
            key={stream}
            id={`stream-${stream}`}
            label={stream}
            checked={filters.stream.includes(stream)}
            onChange={() => toggleStream(stream)}
          />
        ))}
      </CollapsibleSection>
    </aside>
  );
}
