'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import type { CollegeListItem as College } from '@/types/college';

export default function SavedPage() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [colleges, setColleges] = useState<(College & { savedAt: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;

    if (!isLoggedIn) {
      router.push('/login?callbackUrl=/saved');
      return;
    }

    fetch('/api/saved')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((data) => {
        setColleges(data.map((s: { college: College; savedAt: string }) => ({ ...s.college, savedAt: s.savedAt })));
      })
      .catch(() => setError('Could not load saved colleges'))
      .finally(() => setLoading(false));
  }, [isLoggedIn, authLoading, router]);

  if (authLoading || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-16" role="status">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </main>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 pt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-semibold text-gray-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Link>

        <div className="mb-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
            <Heart className="h-6 w-6 fill-red-500 text-red-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Saved Colleges</h1>
          <p className="mt-2 text-sm text-gray-500">Colleges you have bookmarked for later.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600" role="alert">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        {colleges.length === 0 && !error ? (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center">
            <Heart className="mx-auto mb-4 h-10 w-10 text-gray-300" />
            <h2 className="mb-2 text-xl font-bold text-gray-900">No saved colleges yet</h2>
            <p className="mb-6 text-sm text-gray-500">Start exploring and save colleges you are interested in.</p>
            <Link
              href="/"
              className="inline-block rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
            >
              Browse Colleges
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {colleges.map((college) => (
              <Link
                key={college.id}
                href={`/colleges/${college.id}`}
                className="group rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{college.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{college.city && college.state ? `${college.city}, ${college.state}` : college.city || college.state || ''}</p>
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
                  <span className="font-semibold">₹{college.annualFees.toLocaleString('en-IN')}/yr</span>
                  <span className="text-gray-300">|</span>
                  <span>{college.placementPct ?? 0}% placement</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
