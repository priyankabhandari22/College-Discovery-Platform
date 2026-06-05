import dynamic from 'next/dynamic';
import { getCollegeById } from '@/lib/data-service';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Star,
  Calendar,
  Award,
  ArrowLeft,
  Briefcase,
  BookOpen,
  MessageSquare,
  BarChart3,
  GraduationCap,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CollegeImage from '@/components/college/CollegeImage';
import { Badge } from '@/components/ui/badge';
import { ChartSkeleton } from '@/components/college/ChartSkeleton';

const PlacementCharts = dynamic(
  () => import('@/components/college/PlacementCharts'),
  { loading: () => <ChartSkeleton className="h-64" /> }
);

const RatingRadar = dynamic(
  () => import('@/components/college/RatingRadar'),
  { loading: () => <ChartSkeleton className="h-80" /> }
);

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    notFound();
  }

  const formattedFees = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(college.fees);

  return (
    <main id="main-content" className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <Link
            href="/"
            className="group mb-6 inline-flex items-center rounded text-sm font-semibold text-gray-500 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
            Back to Discovery
          </Link>

          <div className="flex flex-col items-start gap-6 md:flex-row md:gap-8">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-sm sm:h-24 sm:w-24 md:h-32 md:w-32">
              <CollegeImage
                collegeId={college.id}
                src={college.logo}
                alt={`${college.name} logo`}
                type="logo"
                fill
                sizes="(max-width: 768px) 80px, 128px"
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
                <Badge
                  variant={
                    college.stream === 'Engineering'
                      ? 'blue'
                      : college.stream === 'Arts'
                        ? 'orange'
                        : 'green'
                  }
                >
                  {college.stream}
                </Badge>
                <div
                  className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1"
                  aria-label={`Rating ${college.rating} out of 5`}
                >
                  <Star className="h-4 w-4 fill-current text-green-600" aria-hidden />
                  <span className="text-sm font-bold text-green-700">{college.rating} Rating</span>
                </div>
              </div>

              <h1 className="mb-3 text-2xl font-extrabold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl">
                {college.name}
              </h1>

              <div className="flex flex-col gap-3 font-medium text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-blue-500" aria-hidden />
                  <span>{college.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-blue-500" aria-hidden />
                  <span>Est. {college.established}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 shrink-0 text-blue-500" aria-hidden />
                  <span>{college.accreditation}</span>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:gap-4 md:w-auto">
              <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-xl shadow-blue-600/20 sm:p-6">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-100">
                  Average Annual Fees
                </p>
                <p className="text-xl font-black sm:text-2xl">{formattedFees}</p>
              </div>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' admissions 2026 application')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-5 text-base font-bold text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:py-6"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-8 lg:col-span-2 lg:space-y-12">
            <section
              id="overview"
              aria-labelledby="overview-heading"
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8"
            >
              <h2
                id="overview-heading"
                className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl"
              >
                <BookOpen className="h-6 w-6 text-blue-600" aria-hidden />
                About Institution
              </h2>
              <blockquote className="mb-6 text-base italic leading-relaxed text-gray-600 sm:text-lg">
                &ldquo;{college.description}&rdquo;
              </blockquote>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-6 sm:grid-cols-4 sm:gap-6">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase text-gray-400">Rank</p>
                  <p className="font-bold text-gray-800">#12 (NIRF)</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase text-gray-400">Campus Size</p>
                  <p className="font-bold text-gray-800">550 Acres</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase text-gray-400">Students</p>
                  <p className="font-bold text-gray-800">12,000+</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase text-gray-400">Faculty</p>
                  <p className="font-bold text-gray-800">850+</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center border-t border-gray-50 pt-8 sm:mt-12 sm:pt-12">
                <p className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-gray-400">
                  Academic Excellence Breakdown
                </p>
                <RatingRadar data={college.ratingBreakdown} />
              </div>
            </section>

            <section
              id="courses"
              aria-labelledby="courses-heading"
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8"
            >
              <h2
                id="courses-heading"
                className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl"
              >
                <GraduationCap className="h-6 w-6 text-blue-600" aria-hidden />
                Available Courses
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {college.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center justify-between rounded-2xl border border-gray-50 bg-gray-50/50 p-4 transition-all hover:border-blue-100 hover:bg-blue-50"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-gray-900 transition-colors group-hover:text-blue-700">
                        {course.name}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase text-gray-500">{course.duration}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-gray-700">₹{course.fees.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] font-bold uppercase text-gray-400">Per Year</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              id="reviews"
              aria-labelledby="reviews-heading"
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8"
            >
              <h2
                id="reviews-heading"
                className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-900 sm:mb-8 sm:text-2xl"
              >
                <MessageSquare className="h-6 w-6 text-blue-600" aria-hidden />
                Student Reviews
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {college.reviews.map((review, idx) => (
                  <article
                    key={idx}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
                  >
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{review.studentName}</p>
                        <div
                          className="mt-1 flex"
                          role="img"
                          aria-label={`${review.rating} out of 5 stars`}
                        >
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? 'fill-orange-400 text-orange-400' : 'fill-gray-300 text-gray-300'}`}
                              aria-hidden
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Verified Student
                      </span>
                    </div>
                    <p className="mb-4 leading-relaxed text-gray-600 sm:mb-6">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase text-green-600">Pros</p>
                        <div className="flex flex-wrap gap-2">
                          {review.pros.map((p, i) => (
                            <Badge key={i} variant="green" className="normal-case">
                              {p}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase text-orange-600">Cons</p>
                        <div className="flex flex-wrap gap-2">
                          {review.cons.map((c, i) => (
                            <Badge key={i} variant="orange" className="normal-case">
                              {c}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 sm:space-y-8">
            <section
              id="placements"
              aria-labelledby="placements-heading"
              className="rounded-2xl bg-gray-900 p-5 text-white shadow-xl shadow-gray-900/10 sm:rounded-3xl sm:p-8"
            >
              <h2
                id="placements-heading"
                className="mb-6 flex items-center gap-3 text-lg font-bold sm:mb-8 sm:text-xl"
              >
                <BarChart3 className="h-6 w-6 text-blue-400" aria-hidden />
                Placement Overview
              </h2>

              <div className="mb-8 space-y-6 sm:mb-10 sm:space-y-8">
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-400">
                      Placement Rate
                    </span>
                    <span className="font-black text-white">
                      {college.placements.placementPercentage}%
                    </span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                    aria-valuenow={college.placements.placementPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Placement rate"
                  >
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${college.placements.placementPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Average CTC
                    </p>
                    <p className="text-2xl font-black text-blue-400">
                      ₹{(college.placements.avgCTC / 100000).toFixed(1)} LPA
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Highest CTC
                    </p>
                    <p className="text-2xl font-black text-green-400">
                      ₹{(college.placements.highestCTC / 100000).toFixed(1)} LPA
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:mb-6">
                    CTC Benchmarks (LPA)
                  </p>
                  <PlacementCharts data={college.placements} />
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 sm:mb-4">
                  Top Recruiters
                </p>
                <div className="flex flex-wrap gap-2">
                  {college.placements.topRecruiters.map((r, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-white/20"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8 lg:sticky lg:top-24">
              <h3 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6">Need more info?</h3>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href={college.image}
                  download={`${college.name.replace(/\s+/g, '-').toLowerCase()}-brochure.svg`}
                  className="inline-flex w-full items-center justify-start rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:py-6"
                >
                  <Briefcase className="mr-3 h-5 w-5 text-blue-600" aria-hidden />
                  Download Brochure
                </a>
                <Link
                  href="/counseling"
                  className="inline-flex w-full items-center justify-start rounded-2xl border border-gray-200 bg-white px-5 py-5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:py-6"
                >
                  <Users className="mr-3 h-5 w-5 text-blue-600" aria-hidden />
                  Counseling Help
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = await getCollegeById(id);
  if (!college) return { title: 'College Not Found' };

  return {
    title: `${college.name} - EduTrack`,
    description: `Learn about fees, placements, courses, and student reviews of ${college.name} in ${college.location}.`,
  };
}
