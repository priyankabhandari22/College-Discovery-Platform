'use client';

import Image from 'next/image';
import { X, BookmarkPlus, Share2, Star } from 'lucide-react';
import type { College } from '@/types/college';
import { Button } from '@/components/ui/button';
import { formatINR, cn } from '@/lib/utils';
import {
  COMPARE_ROWS,
  CompareRow,
  getWinner,
  getCellClass,
  Winner,
} from '@/lib/compare';

/* ─── value extractor ────────────────────────────────────────────── */
function extractValue(row: CompareRow, college: College): unknown {
  switch (row.key) {
    case 'location':        return college.location;
    case 'fees':            return college.fees;
    case 'accreditation':   return college.accreditation;
    case 'stream':          return college.stream;
    case 'established':     return String(college.established);
    case 'avgCTC':          return college.placements.avgCTC;
    case 'highestCTC':      return college.placements.highestCTC;
    case 'placementPct':    return college.placementPercentage;
    case 'topRecruiters':   return college.placements.topRecruiters.join(', ');
    case 'courseCount':     return String(college.courses.length);
    case 'jeeCutoff':       return Object.keys(college.cutoffs ?? {}).includes('JEE Main') ? 'Yes' : 'No';
    case 'mhtCetCutoff':    return Object.keys(college.cutoffs ?? {}).includes('MHT-CET') ? 'Yes' : 'No';
    case 'rating':          return college.rating;
    case 'faculty':         return college.ratingBreakdown.faculty;
    case 'infrastructure':  return college.ratingBreakdown.infrastructure;
    case 'placements':      return college.ratingBreakdown.placements;
    default:                return '—';
  }
}

/* ─── value formatter ────────────────────────────────────────────── */
function formatValue(row: CompareRow, raw: unknown): string {
  if (raw === null || raw === undefined) return '—';
  if (typeof raw === 'string') return raw;

  const n = Number(raw);
  switch (row.format) {
    case 'currency': return formatINR(n);
    case 'percent':  return `${n}%`;
    case 'rating':   return `${n.toFixed(1)} / 5`;
    default:         return String(raw);
  }
}

/* ─── section header row ──────────────────────────────────────────── */
const SECTION_BREAKS: Record<string, string> = {
  location: 'General Info',
  avgCTC:   'Placement Data',
  courseCount: 'Courses & Eligibility',
  rating:   'Ratings Breakdown',
};

/* ─── CollegeHeader ─────────────────────────────────────────────── */
interface CollegeHeaderProps {
  college: College;
  side: 'a' | 'b';
  onSave: (id: string) => void;
  isSaved: boolean;
}

function CollegeHeader({ college, side, onSave, isSaved }: CollegeHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 text-center">
      {college.logo && (
        <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          <Image
            src={college.logo}
            alt={`${college.name} logo`}
            fill
            className="object-contain p-1"
            sizes="56px"
          />
        </div>
      )}
      <h2 className="text-sm font-bold leading-snug text-slate-900 line-clamp-2">
        {college.name}
      </h2>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1 text-xs"
        onClick={() => onSave(college.id)}
        aria-pressed={isSaved}
        aria-label={isSaved ? `Unsave ${college.name}` : `Save ${college.name}`}
      >
        <BookmarkPlus className={cn('h-3.5 w-3.5', isSaved && 'fill-blue-600 text-blue-600')} />
        {isSaved ? 'Saved' : 'Save'}
      </Button>
    </div>
  );
}

/* ─── CompareTable (main export) ─────────────────────────────────── */
export interface CompareTableProps {
  collegeA: College;
  collegeB: College;
  savedIds: string[];
  onSave: (id: string) => void;
  onShare: () => void;
}

export default function CompareTable({
  collegeA,
  collegeB,
  savedIds,
  onSave,
  onShare,
}: CompareTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl print:shadow-none print:border-0">
      {/* ── Share button (hidden in print) ── */}
      <div className="flex justify-end border-b border-slate-100 px-4 py-2 print:hidden">
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={onShare}>
          <Share2 className="h-3.5 w-3.5" />
          Share comparison
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          {/* ── Column definition ── */}
          <colgroup>
            <col className="w-[32%]" />
            <col className="w-[34%]" />
            <col className="w-[34%]" />
          </colgroup>

          {/* ── Column headers ── */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th scope="col" className="p-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">
                Parameter
              </th>
              <th scope="col" className="p-0 border-l border-slate-100">
                <CollegeHeader
                  college={collegeA}
                  side="a"
                  onSave={onSave}
                  isSaved={savedIds.includes(collegeA.id)}
                />
              </th>
              <th scope="col" className="p-0 border-l border-slate-100">
                <CollegeHeader
                  college={collegeB}
                  side="b"
                  onSave={onSave}
                  isSaved={savedIds.includes(collegeB.id)}
                />
              </th>
            </tr>
          </thead>

          {/* ── Data rows ── */}
          <tbody>
            {COMPARE_ROWS.map((row) => {
              const valA = extractValue(row, collegeA);
              const valB = extractValue(row, collegeB);
              const winner: Winner = getWinner(row, valA, valB);
              const sectionLabel = SECTION_BREAKS[row.key];

              return (
                <>
                  {/* Section header (only for first row in section) */}
                  {sectionLabel && (
                    <tr key={`section-${row.key}`} className="bg-slate-900 print:bg-slate-100">
                      <td
                        colSpan={3}
                        className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white print:text-slate-700"
                      >
                        {sectionLabel}
                      </td>
                    </tr>
                  )}

                  {/* Data row */}
                  <tr
                    key={row.key}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Label */}
                    <th
                      scope="row"
                      className="bg-slate-50/60 p-4 text-left text-xs font-semibold text-slate-600"
                    >
                      {row.label}
                    </th>

                    {/* College A value */}
                    <td
                      className={cn(
                        'border-l border-slate-100 p-4 transition-colors',
                        getCellClass(winner, 'a'),
                      )}
                    >
                      <CellContent row={row} value={valA} winner={winner} side="a" />
                    </td>

                    {/* College B value */}
                    <td
                      className={cn(
                        'border-l border-slate-100 p-4 transition-colors',
                        getCellClass(winner, 'b'),
                      )}
                    >
                      <CellContent row={row} value={valB} winner={winner} side="b" />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── CellContent ─────────────────────────────────────────────────── */
function CellContent({
  row,
  value,
  winner,
  side,
}: {
  row: CompareRow;
  value: unknown;
  winner: Winner;
  side: 'a' | 'b';
}) {
  const isWinner = winner === side;
  const text = formatValue(row, value);

  if (row.format === 'rating') {
    const n = Number(value);
    return (
      <div className="flex items-center gap-1.5">
        <Star
          className={cn('h-3.5 w-3.5', isWinner ? 'fill-amber-400 text-amber-400' : 'fill-slate-300 text-slate-300')}
          aria-hidden
        />
        <span>{text}</span>
      </div>
    );
  }

  if (row.key === 'jeeCutoff' || row.key === 'mhtCetCutoff') {
    const yes = text === 'Yes';
    return (
      <span className={cn('inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase', yes ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500')}>
        {text}
      </span>
    );
  }

  return <span>{text}</span>;
}
