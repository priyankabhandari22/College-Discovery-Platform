'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, GitCompare, Plus } from 'lucide-react';
import Link from 'next/link';
import { useCompareStore } from '@/stores/useCompareStore';
import { useCollegeNames } from '@/hooks/useCollegeNames';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * CompareBar — floating bottom bar shown when ≥1 college is in the compare selection.
 * Rendered in the root layout so it appears on every page.
 */
export default function CompareBar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { selectedIds, remove, clear } = useCompareStore();
  const names = useCollegeNames(selectedIds);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (selectedIds.length === 0) return null;

  const canCompare = selectedIds.length === 2;
  const compareUrl = `/compare?ids=${selectedIds.join(',')}`;

  const handleCompare = () => {
    router.push(compareUrl);
  };

  return (
    <div
      role="region"
      aria-label="College comparison bar"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]',
        'animate-in slide-in-from-bottom-2 duration-300',
        /* Print: hide this bar */
        'print:hidden',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        {/* Left: title */}
        <span className="hidden shrink-0 text-xs font-bold uppercase tracking-widest text-slate-500 sm:block">
          Comparing
        </span>

        {/* Slots */}
        <div className="flex flex-1 items-center gap-2 overflow-x-auto">
          {selectedIds.map((id) => (
            <div
              key={id}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800"
            >
              <span className="max-w-[140px] truncate sm:max-w-[200px]">
                {names[id] ?? 'Loading…'}
              </span>
              <button
                type="button"
                onClick={() => remove(id)}
                aria-label={`Remove ${names[id] ?? id} from comparison`}
                className="rounded-full p-0.5 hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </div>
          ))}

          {/* Empty slot when only 1 selected */}
          {selectedIds.length === 1 && (
            <Link
              href="/"
              className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-dashed border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-400 hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
              aria-label="Add another college to compare"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add college
            </Link>
          )}
        </div>

        {/* Right: actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={clear}
            className="text-xs font-medium text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            Clear all
          </button>

          <Button
            onClick={handleCompare}
            disabled={!canCompare}
            size="sm"
            className="gap-1.5 rounded-full px-4"
            aria-label={canCompare ? 'Compare selected colleges' : 'Select 2 colleges to compare'}
          >
            <GitCompare className="h-3.5 w-3.5" aria-hidden />
            Compare now
          </Button>
        </div>
      </div>
    </div>
  );
}
