'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { College } from '@/types/college';
import { predictColleges } from '@/lib/data-service';
import CollegeGridSkeleton from '@/components/listing/CollegeGridSkeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trophy, Search, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type ExamType = 'JEE Main' | 'JEE Advanced' | 'GATE' | 'CAT' | 'NEET' | 'MHT-CET';

export default function PredictorPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login?callbackUrl=/predictor');
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 pt-16" role="status">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </main>
    );
  }
  const [exam, setExam] = useState<ExamType>('JEE Main');
  const [rank, setRank] = useState<string>('');
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const data = await predictColleges(exam, parseInt(rank, 10));
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-gray-50 px-4 pb-20 pt-20 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <Trophy className="h-4 w-4" aria-hidden />
            Empowering Your Future
          </div>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:mb-6 sm:text-5xl md:text-6xl">
            Admission <span className="text-blue-600">Predictor</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-500 sm:text-lg">
            Input your entrance exam rank to discover which top institutions are likely to offer you a seat this year.
          </p>
        </div>

        <div className="mx-auto mb-16 max-w-3xl rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:mb-20 sm:rounded-3xl sm:p-8">
          <form
            onSubmit={handlePredict}
            className="grid grid-cols-1 items-end gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6"
            aria-label="Admission predictor form"
          >
            <div className="space-y-2">
              <label htmlFor="exam-select" className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">
                Select Exam
              </label>
              <select
                id="exam-select"
                value={exam}
                onChange={(e) => setExam(e.target.value as ExamType)}
                className="w-full cursor-pointer appearance-none rounded-2xl border border-transparent bg-gray-50 px-4 py-4 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <option value="JEE Main">JEE Main</option>
                <option value="JEE Advanced">JEE Advanced</option>
                <option value="GATE">GATE</option>
                <option value="CAT">CAT</option>
                <option value="NEET">NEET</option>
                <option value="MHT-CET">MHT-CET</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="rank-input" className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">
                Your All India Rank
              </label>
              <input
                id="rank-input"
                type="number"
                placeholder="e.g. 5000"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full rounded-2xl border border-transparent bg-gray-50 px-4 py-4 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
                required
                min={1}
                inputMode="numeric"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-14 rounded-2xl font-bold shadow-lg shadow-blue-600/20 sm:h-[60px] md:col-span-1"
            >
              Predict Colleges
            </Button>
          </form>

          <div
            className="mt-6 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm italic text-orange-800 sm:mt-8"
            role="note"
          >
            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
            Predictions are based on previous year cutoff trends and are indicative only.
          </div>
        </div>

        {hasSearched && (
          <section aria-live="polite" aria-busy={loading}>
            <div className="mb-6 flex flex-col gap-2 border-b border-gray-100 pb-6 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {loading ? 'Analyzing possibilities...' : `Recommended Institutions (${results.length})`}
              </h2>
              {!loading && (
                <p className="text-sm font-medium italic text-gray-500">
                  Matched {results.length} colleges for {exam} Rank {rank}
                </p>
              )}
            </div>

            {loading ? (
              <CollegeGridSkeleton count={3} />
            ) : results.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((college) => (
                  <li key={college.id}>
                    <Link
                      href={`/college/${college.id}`}
                      className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      <h3 className="font-bold text-slate-900">{college.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{college.location}</p>
                      <p className="mt-2 text-sm font-semibold text-blue-600">
                        Rating {college.rating} · {college.placementPercentage}% placements
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-3xl border border-dashed border-gray-100 bg-white py-16 text-center sm:py-20">
                <Search className="mx-auto mb-6 h-16 w-16 text-gray-300" aria-hidden />
                <h3 className="mb-2 text-xl font-bold text-gray-900">No direct matches found</h3>
                <p className="mx-auto max-w-sm text-gray-500">
                  Your rank might be outside the range for our current dataset colleges. Try searching for other institutions.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
