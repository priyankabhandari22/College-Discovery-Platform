'use client';

import Link from 'next/link';
import CollegeImage from '@/components/college/CollegeImage';
import { Star, MapPin, X, Plus } from 'lucide-react';
import { College } from '@/types/college';
import { Badge } from '@/components/ui/badge';
import { useCompareStore, MAX_COMPARE_COLLEGES } from '@/stores/useCompareStore';

interface CompareMobileViewProps {
  colleges: College[];
}

const rows = [
  { key: 'rating', label: 'Overall Rating', render: (c: College) => (
    <span className="flex items-center gap-1 font-bold text-gray-900">
      <Star className="h-4 w-4 fill-orange-400 text-orange-400" aria-hidden />
      {c.rating} / 5
    </span>
  )},
  { key: 'fees', label: 'Annual Fees', render: (c: College) => (
    <span className="font-bold text-gray-900">₹{c.fees.toLocaleString('en-IN')}</span>
  )},
  { key: 'location', label: 'Location', render: (c: College) => (
    <span className="flex items-start gap-1 text-gray-600">
      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" aria-hidden />
      {c.location}
    </span>
  )},
  { key: 'placement', label: 'Placement Rate', render: (c: College) => (
    <span className="font-bold text-gray-900">{c.placementPercentage}%</span>
  )},
  { key: 'avgCTC', label: 'Average CTC', render: (c: College) => (
    <span className="font-bold text-blue-600">₹{(c.placements.avgCTC / 100000).toFixed(1)} LPA</span>
  )},
  { key: 'stream', label: 'Primary Stream', render: (c: College) => (
    <Badge variant={c.stream === 'Engineering' ? 'blue' : c.stream === 'Arts' ? 'orange' : 'green'}>
      {c.stream}
    </Badge>
  )},
] as const;

export default function CompareMobileView({ colleges }: CompareMobileViewProps) {
  const removeFromCompare = useCompareStore((s) => s.remove);

  return (
    <div className="space-y-6 md:hidden" role="region" aria-label="College comparison cards">
      {colleges.map((college) => (
        <article
          key={college.id}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <div className="flex items-center gap-4 border-b border-gray-50 bg-gray-50/50 p-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-1">
              <CollegeImage
                collegeId={college.id}
                src={college.logo}
                alt={`${college.name} logo`}
                type="logo"
                fill
                className="object-contain p-1"
                sizes="56px"
              />
            </div>
            <h2 className="flex-1 text-base font-bold leading-tight text-gray-900">{college.name}</h2>
            <button
              type="button"
              onClick={() => removeFromCompare(college.id)}
              className="rounded-full bg-red-50 p-2 text-red-500 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label={`Remove ${college.name} from comparison`}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <dl className="divide-y divide-gray-50">
            {rows.map(({ key, label, render }) => (
              <div key={key} className="flex justify-between gap-4 px-4 py-3">
                <dt className="text-sm font-semibold text-gray-500">{label}</dt>
                <dd className="text-right text-sm">{render(college)}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}

      {colleges.length < MAX_COMPARE_COLLEGES && (
        <Link
          href="/"
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-8 transition-colors hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Plus className="mb-2 h-8 w-8 text-gray-300" aria-hidden />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Add another college</span>
        </Link>
      )}
    </div>
  );
}
