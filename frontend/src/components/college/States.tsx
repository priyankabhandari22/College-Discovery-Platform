import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LoadingSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="status"
      aria-label="Loading colleges"
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white"
        >
          <div className="h-44 bg-gray-200 sm:h-48" />
          <div className="space-y-4 p-5">
            <div className="h-6 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 rounded bg-gray-100" />
              <div className="h-10 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-20"
      role="status"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <SearchX className="h-10 w-10 text-gray-400" aria-hidden />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">No colleges found</h3>
      <p className="mb-8 max-w-sm text-gray-500">
        We couldn&apos;t find any colleges matching your current filters. Try adjusting your search term or selection.
      </p>
      <Button onClick={onClear} variant="outline" size="lg" className="rounded-full">
        Clear all filters
      </Button>
    </div>
  );
}
