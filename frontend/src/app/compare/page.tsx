'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { College } from '@/types/college';
import { getCollegesByIds } from '@/lib/data-service';
import { useCompareStore, MAX_COMPARE_COLLEGES } from '@/stores/useCompareStore';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import CollegeImage from '@/components/college/CollegeImage';
import { ArrowLeft, Star, MapPin, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CompareMobileView from '@/components/compare/CompareMobileView';

function CompareContent() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login?callbackUrl=/compare');
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16" role="status">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }
  const searchParams = useSearchParams();
  const compareIds = useCompareStore((s) => s.selectedIds);
  const removeFromCompare = useCompareStore((s) => s.remove);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  const urlIds = searchParams.get('ids')?.split(',').filter(Boolean) || [];
  const effectiveIds = urlIds.length > 0 ? urlIds : compareIds;

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      if (effectiveIds.length > 0) {
        const data = await getCollegesByIds(effectiveIds);
        setColleges(data);
      } else {
        setColleges([]);
      }
      setLoading(false);
    };
    fetchColleges();
  }, [JSON.stringify(effectiveIds)]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50" role="status" aria-label="Loading comparison">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <main id="main-content" className="min-h-screen bg-gray-50 px-4 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
            <Plus className="h-10 w-10 text-blue-600" aria-hidden />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            No colleges selected for comparison
          </h1>
          <p className="mb-10 text-base text-gray-500 sm:text-lg">
            Add some colleges from the homepage to see a detailed side-by-side comparison.
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-full px-10">
              Browse Colleges
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-gray-50 px-4 pb-20 pt-20 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center text-sm font-semibold text-gray-500 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
              Back to Search
            </Link>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              Compare <span className="text-blue-600">Colleges</span>
            </h1>
          </div>

          <Badge variant="blue" className="self-start px-3 py-1 text-xs sm:self-auto">
            {colleges.length} Colleges Compared
          </Badge>
        </div>

        <CompareMobileView colleges={colleges} />

        <div className="hidden overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl md:block">
          <p className="sr-only">Scroll horizontally on smaller screens to view all columns</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-1/4 border-b border-gray-50 bg-gray-50/30 p-4 lg:p-8" scope="col">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Compare Parameters
                    </span>
                  </th>
                  {colleges.map((college) => (
                    <th
                      key={college.id}
                      className="group relative w-1/4 border-b border-gray-50 p-4 lg:p-8"
                      scope="col"
                    >
                      <button
                        type="button"
                        onClick={() => removeFromCompare(college.id)}
                        className="absolute right-2 top-2 rounded-full bg-red-50 p-1 text-red-500 opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-red-500 lg:right-4 lg:top-4 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
                        aria-label={`Remove ${college.name} from comparison`}
                      >
                        <X className="h-4 w-4" aria-hidden />
                      </button>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-xl border border-gray-100 bg-white p-1">
                          <CollegeImage
                            collegeId={college.id}
                            src={college.logo}
                            alt={`${college.name} logo`}
                            type="logo"
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </div>
                        <span className="line-clamp-2 font-bold leading-tight text-gray-900">
                          {college.name}
                        </span>
                      </div>
                    </th>
                  ))}
                  {colleges.length < MAX_COMPARE_COLLEGES && (
                    <th className="w-1/4 border-b border-gray-50 bg-gray-50/10 p-4 lg:p-8" scope="col">
                      <Link
                        href="/"
                        className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 p-6 transition-all hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        <Plus className="mb-2 h-8 w-8 text-gray-300" aria-hidden />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Add College
                        </span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="border-b border-gray-50 bg-gray-50/30 p-4 font-bold text-gray-900 lg:p-8" scope="row">
                    Overall Rating
                  </th>
                  {colleges.map((c) => (
                    <td key={c.id} className="border-b border-gray-50 p-4 lg:p-8">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-orange-400 text-orange-400" aria-hidden />
                        <span className="text-xl font-black text-gray-900">{c.rating}</span>
                        <span className="text-sm text-gray-400">/ 5</span>
                      </div>
                    </td>
                  ))}
                  {colleges.length < MAX_COMPARE_COLLEGES && <td className="border-b border-gray-50 bg-gray-50/10 p-4 lg:p-8" />}
                </tr>
                <tr>
                  <th className="border-b border-gray-50 bg-gray-50/30 p-4 font-bold text-gray-900 lg:p-8" scope="row">
                    Annual Fees
                  </th>
                  {colleges.map((c) => (
                    <td key={c.id} className="border-b border-gray-50 p-4 lg:p-8">
                      <p className="text-lg font-bold text-gray-900">₹{c.fees.toLocaleString('en-IN')}</p>
                      <p className="mt-1 text-xs font-semibold uppercase text-gray-400">Per Academic Year</p>
                    </td>
                  ))}
                  {colleges.length < MAX_COMPARE_COLLEGES && <td className="border-b border-gray-50 bg-gray-50/10 p-4 lg:p-8" />}
                </tr>
                <tr>
                  <th className="border-b border-gray-50 bg-gray-50/30 p-4 font-bold text-gray-900 lg:p-8" scope="row">
                    Location
                  </th>
                  {colleges.map((c) => (
                    <td key={c.id} className="border-b border-gray-50 p-4 font-medium text-gray-600 lg:p-8">
                      <MapPin className="mr-2 inline h-4 w-4 text-blue-500" aria-hidden />
                      {c.location}
                    </td>
                  ))}
                  {colleges.length < MAX_COMPARE_COLLEGES && <td className="border-b border-gray-50 bg-gray-50/10 p-4 lg:p-8" />}
                </tr>
                <tr>
                  <th className="border-b border-gray-50 bg-gray-50/30 p-4 font-bold text-gray-900 lg:p-8" scope="row">
                    Placement Rate
                  </th>
                  {colleges.map((c) => (
                    <td key={c.id} className="border-b border-gray-50 p-4 lg:p-8">
                      <div className="flex items-center gap-4">
                        <div className="h-2 max-w-[100px] flex-1 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${c.placementPercentage}%` }}
                            role="progressbar"
                            aria-valuenow={c.placementPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${c.placementPercentage}% placement rate`}
                          />
                        </div>
                        <span className="font-bold text-gray-900">{c.placementPercentage}%</span>
                      </div>
                    </td>
                  ))}
                  {colleges.length < MAX_COMPARE_COLLEGES && <td className="border-b border-gray-50 bg-gray-50/10 p-4 lg:p-8" />}
                </tr>
                <tr>
                  <th className="border-b border-gray-50 bg-gray-50/30 p-4 font-bold text-gray-900 lg:p-8" scope="row">
                    Average CTC
                  </th>
                  {colleges.map((c) => (
                    <td key={c.id} className="border-b border-gray-50 p-4 lg:p-8">
                      <p className="text-lg font-bold text-blue-600">
                        ₹{(c.placements.avgCTC / 100000).toFixed(1)} LPA
                      </p>
                    </td>
                  ))}
                  {colleges.length < MAX_COMPARE_COLLEGES && <td className="border-b border-gray-50 bg-gray-50/10 p-4 lg:p-8" />}
                </tr>
                <tr>
                  <th className="border-b border-gray-50 bg-gray-50/30 p-4 font-bold text-gray-900 lg:p-8" scope="row">
                    Highest CTC
                  </th>
                  {colleges.map((c) => (
                    <td key={c.id} className="border-b border-gray-50 p-4 lg:p-8">
                      <p className="text-lg font-bold text-green-600">
                        ₹{(c.placements.highestCTC / 100000).toFixed(1)} LPA
                      </p>
                    </td>
                  ))}
                  {colleges.length < MAX_COMPARE_COLLEGES && <td className="border-b border-gray-50 bg-gray-50/10 p-4 lg:p-8" />}
                </tr>
                <tr>
                  <th className="bg-gray-50/30 p-4 font-bold text-gray-900 lg:p-8" scope="row">
                    Primary Stream
                  </th>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-4 lg:p-8">
                      <Badge
                        variant={
                          c.stream === 'Engineering'
                            ? 'blue'
                            : c.stream === 'Arts'
                              ? 'orange'
                              : 'green'
                        }
                      >
                        {c.stream}
                      </Badge>
                    </td>
                  ))}
                  {colleges.length < MAX_COMPARE_COLLEGES && <td className="bg-gray-50/10 p-4 lg:p-8" />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50" role="status">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
