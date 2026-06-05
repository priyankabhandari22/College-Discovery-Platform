import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ListingEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
      <SearchX className="mb-4 h-12 w-12 text-slate-300" aria-hidden />
      <h3 className="mb-2 text-lg font-bold text-slate-900">No colleges match your filters</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500">
        Try adjusting search, location, fees, or stream filters to discover more engineering colleges.
      </p>
      <Button type="button" variant="outline" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  );
}
