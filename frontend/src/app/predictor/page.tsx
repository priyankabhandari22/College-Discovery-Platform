'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { College, CollegeListItem } from '@/types/college';
import { predictColleges, type PredictResult } from '@/lib/data-service';
import CollegeGridSkeleton from '@/components/listing/CollegeGridSkeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trophy, Search, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type ExamType = 'JEE Main' | 'JEE Advanced' | 'GATE' | 'CAT' | 'NEET' | 'MHT-CET';
type InputType = 'rank' | 'marks' | 'percentile';

function percentileToRank(percentile: number, exam: string): number {
  const total: Record<string, number> = {
    'JEE Main': 1200000, 'JEE Advanced': 250000, 'MHT-CET': 150000,
    'NEET': 1800000, 'GATE': 1000000, 'CAT': 300000,
  };
  return Math.round((total[exam] || 500000) * (1 - percentile / 100));
}

function marksToRank(marks: number, maxMarks: number): number {
  const pct = marks / maxMarks;
  if (pct >= 0.99) return Math.round(1 + (1 - pct) * 1000);
  if (pct >= 0.9) return Math.round(1000 + (0.99 - pct) * 90000);
  return Math.round(100000 + (0.9 - pct) * 900000);
}

interface AiResult {
  recommendations: { id: string; name: string; location: string; rating: number; fees: number; placementPercentage: number; avgCTC: number; highestCTC: number }[];
  aiAdvice: string;
  summary: string;
}

export default function PredictorPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const [exam, setExam] = useState<ExamType>('JEE Main');
  const [inputType, setInputType] = useState<InputType>('rank');
  const [rank, setRank] = useState('');
  const [marks, setMarks] = useState('');
  const [maxMarks, setMaxMarks] = useState('300');
  const [percentile, setPercentile] = useState('');
  const [results, setResults] = useState<College[]>([]);
  const [predictionTier, setPredictionTier] = useState<PredictResult['tier'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiFallback, setApiFallback] = useState<CollegeListItem[]>([]);
  const [apiFallbackLoading, setApiFallbackLoading] = useState(false);

  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

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

  const resolvedRank = (() => {
    if (inputType === 'rank' && rank) return parseInt(rank, 10);
    if (inputType === 'marks' && marks && maxMarks) return marksToRank(parseInt(marks), parseInt(maxMarks));
    if (inputType === 'percentile' && percentile) return percentileToRank(parseFloat(percentile), exam);
    return 0;
  })();

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedRank || resolvedRank < 1) return;

    setLoading(true);
    setHasSearched(true);
    setAiResult(null);
    setAiError('');
    setApiFallback([]);
    setApiFallbackLoading(false);
    try {
      const { colleges, tier } = await predictColleges(exam, resolvedRank);
      setResults(colleges);
      setPredictionTier(tier);
    } catch {
      setResults([]);
      setPredictionTier(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApiSearch = async () => {
    setApiFallbackLoading(true);
    try {
      const res = await fetch(`/api/colleges?search=${encodeURIComponent(exam)}&limit=12`);
      const data = await res.json();
      setApiFallback(data.colleges || []);
    } catch {
      setApiFallback([]);
    } finally {
      setApiFallbackLoading(false);
    }
  };

  const handleAiAdvice = async () => {
    if (!resolvedRank || resolvedRank < 1) return;
    setAiLoading(true);
    setAiError('');
    setAiResult(null);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          rank: resolvedRank,
          marks: inputType === 'marks' ? marks : undefined,
          maxMarks: inputType === 'marks' ? maxMarks : undefined,
          percentile: inputType === 'percentile' ? percentile : undefined,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'AI service unavailable');
      }
      setAiResult(await res.json());
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'AI recommendation failed');
    } finally {
      setAiLoading(false);
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
            Enter your rank, marks, or percentile to discover matching colleges. Get AI-powered recommendations.
          </p>
        </div>

        <div className="mx-auto mb-16 max-w-4xl rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8">
          <form onSubmit={handlePredict} aria-label="Admission predictor form">
            <div className="grid grid-cols-1 items-end gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
              <div className="space-y-2">
                <label htmlFor="exam-select" className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">Select Exam</label>
                <select id="exam-select" value={exam} onChange={(e) => setExam(e.target.value as ExamType)}
                  className="w-full cursor-pointer appearance-none rounded-2xl border border-transparent bg-gray-50 px-4 py-4 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600">
                  <option value="JEE Main">JEE Main</option>
                  <option value="JEE Advanced">JEE Advanced</option>
                  <option value="GATE">GATE</option>
                  <option value="CAT">CAT</option>
                  <option value="NEET">NEET</option>
                  <option value="MHT-CET">MHT-CET</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">Input Type</label>
                <div className="flex rounded-2xl border border-gray-200 bg-gray-50 p-1">
                  {(['rank', 'marks', 'percentile'] as InputType[]).map((t) => (
                    <button key={t} type="button" onClick={() => setInputType(t)}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold uppercase transition-all ${inputType === t ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      {t === 'rank' ? 'Rank' : t === 'marks' ? 'Marks' : '%ile'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {inputType === 'rank' && (
                  <>
                    <label htmlFor="rank-input" className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">All India Rank</label>
                    <input id="rank-input" type="number" placeholder="e.g. 5000" value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="w-full rounded-2xl border border-transparent bg-gray-50 px-4 py-4 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
                      required min={1} inputMode="numeric" />
                  </>
                )}
                {inputType === 'marks' && (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label htmlFor="marks-input" className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">Marks</label>
                      <input id="marks-input" type="number" placeholder="e.g. 250" value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="w-full rounded-2xl border border-transparent bg-gray-50 px-4 py-4 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
                        required min={0} inputMode="numeric" />
                    </div>
                    <div className="w-24">
                      <label htmlFor="max-marks" className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">Out of</label>
                      <input id="max-marks" type="number" placeholder="300" value={maxMarks}
                        onChange={(e) => setMaxMarks(e.target.value)}
                        className="w-full rounded-2xl border border-transparent bg-gray-50 px-4 py-4 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
                        required min={1} inputMode="numeric" />
                    </div>
                  </div>
                )}
                {inputType === 'percentile' && (
                  <>
                    <label htmlFor="percentile-input" className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">Percentile</label>
                    <input id="percentile-input" type="number" step="0.01" placeholder="e.g. 98.5" value={percentile}
                      onChange={(e) => setPercentile(e.target.value)}
                      className="w-full rounded-2xl border border-transparent bg-gray-50 px-4 py-4 font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
                      required min={0} max={100} inputMode="decimal" />
                  </>
                )}
              </div>

              <Button type="submit" size="lg"
                className="h-14 rounded-2xl font-bold shadow-lg shadow-blue-600/20 sm:h-[60px]">
                Predict
              </Button>
            </div>

            {resolvedRank > 0 && inputType !== 'rank' && (
              <p className="mt-3 text-center text-xs text-gray-400">
                Approximate rank: ~{resolvedRank.toLocaleString('en-IN')}
              </p>
            )}
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm italic text-orange-800 sm:mt-8" role="note">
            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
            Predictions are based on previous year cutoff trends and are indicative only. Rank from marks/percentile is approximate.
          </div>
        </div>

        {resolvedRank > 0 && hasSearched && !loading && results.length > 0 && (
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <Button onClick={handleAiAdvice} disabled={aiLoading}
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-purple-700 hover:to-blue-700">
              {aiLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              {aiLoading ? 'Analyzing...' : 'Get AI Recommendation'}
            </Button>
            {aiError && <p className="mt-2 text-sm font-semibold text-red-500">{aiError}</p>}
          </div>
        )}

        {aiResult && (
          <div className="mx-auto mb-12 max-w-5xl rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-blue-50 p-6 shadow-lg sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">AI Recommendation</h2>
            </div>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {aiResult.aiAdvice}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-gray-500 hover:text-gray-700">View matched college data</summary>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {aiResult.recommendations.map((c) => (
                  <Link key={c.id} href={`/college/${c.id}`}
                    className="rounded-xl border border-gray-200 bg-white p-3 text-sm transition-shadow hover:shadow-md">
                    <p className="font-bold text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.location}</p>
                    <p className="mt-1 text-xs text-gray-600">⭐ {c.rating} · ₹{c.fees.toLocaleString('en-IN')}/yr</p>
                    <p className="text-xs text-gray-600">{c.placementPercentage}% placement · Avg ₹{c.avgCTC}L</p>
                  </Link>
                ))}
              </div>
            </details>
          </div>
        )}

        {hasSearched && (
          <section aria-live="polite" aria-busy={loading}>
            <div className="mb-6 flex flex-col gap-2 border-b border-gray-100 pb-6 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {loading ? 'Analyzing possibilities...' : `Matching Colleges (${results.length})`}
              </h2>
              {!loading && (
                <p className="text-sm font-medium italic text-gray-500">
                  {exam} · {inputType === 'rank' ? `Rank ${rank}` : inputType === 'marks' ? `${marks}/${maxMarks} marks` : `${percentile}%ile`} · ~{resolvedRank.toLocaleString('en-IN')} rank
                </p>
              )}
            </div>

            {predictionTier && predictionTier !== 'exact' && results.length > 0 && (
              <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <span className="font-bold">Reach colleges:</span> No exact cutoff matches in our dataset. Below are colleges with the
                {predictionTier === 'reach' ? ' closest cutoff ranges to your rank.' : ' broadest cutoff ranges for this exam.'}
              </div>
            )}

            {loading ? (
              <CollegeGridSkeleton count={3} />
            ) : results.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((college) => (
                  <li key={college.id}>
                    <Link href={`/college/${college.id}`}
                      className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                      <h3 className="font-bold text-slate-900">{college.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{college.location}</p>
                      <p className="mt-2 text-sm font-semibold text-blue-600">
                        ⭐ {college.rating} · {college.placementPercentage}% placements · ₹{college.fees.toLocaleString('en-IN')}/yr
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-3xl border border-dashed border-gray-100 bg-white py-16 text-center sm:py-20">
                <Search className="mx-auto mb-6 h-16 w-16 text-gray-300" aria-hidden />
                <h3 className="mb-2 text-xl font-bold text-gray-900">No matches in our dataset</h3>
                <p className="mx-auto max-w-md text-gray-500">
                  Your rank doesn't match any colleges in our database. Try searching the CollegeDB for more options.
                </p>
                <Button onClick={handleApiSearch} disabled={apiFallbackLoading}
                  className="mt-6 rounded-xl px-6 py-3 font-semibold">
                  {apiFallbackLoading ? 'Searching...' : 'Search More Colleges'}
                </Button>
              </div>
            )}

            {apiFallback.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-bold text-gray-800">More Colleges to Explore</h3>
                <p className="mb-4 text-sm text-gray-500">
                  These colleges are fetched from CollegeDB and may accept your rank. Visit their websites for cutoff details.
                </p>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {apiFallback.map((c) => (
                    <li key={c.id}>
                      <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <h4 className="font-semibold text-gray-900">{c.name}</h4>
                        <p className="text-sm text-gray-500">{c.city}, {c.state}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
