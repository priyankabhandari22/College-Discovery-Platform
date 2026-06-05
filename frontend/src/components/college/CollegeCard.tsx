'use client';

import Link from 'next/link';
import { Star, MapPin, GitCompare, Bookmark } from 'lucide-react';
import type { CollegeListItem } from '@/types/college';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AuthGuard from '@/components/auth/AuthGuard';
import { cn, formatINR } from '@/lib/utils';

export interface CollegeCardProps {
  college: CollegeListItem;
  isCompareSelected: boolean;
  isCompareDisabled: boolean;
  isSaved: boolean;
  onCompareToggle: (id: string) => void;
  onSaveToggle: (id: string) => void;
}

const ownershipVariant: Record<CollegeListItem['ownership'], 'default' | 'secondary' | 'outline' | 'success'> = {
  Government: 'success',
  Aided: 'secondary',
  Private: 'outline',
  Deemed: 'default',
};

export default function CollegeCard({
  college,
  isCompareSelected,
  isCompareDisabled,
  isSaved,
  onCompareToggle,
  onSaveToggle,
}: CollegeCardProps) {
  const locationLabel = `${college.city}, ${college.state}`;
  const fullStars = Math.floor(college.rating);
  const hasHalf = college.rating - fullStars >= 0.25;

  return (
    <Card
      className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md"
      aria-label={`${college.name}, ${locationLabel}, rated ${college.rating}`}
    >
      <Link href={`/colleges/${college.id}`} className="block flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-t-xl">
        <div
          className="relative h-36 bg-gradient-to-br from-blue-600 to-indigo-800 sm:h-40"
          style={
            college.image
              ? { backgroundImage: `url(${college.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : undefined
          }
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant="default">{college.naacGrade} NAAC</Badge>
            <Badge variant={ownershipVariant[college.ownership]}>{college.ownership}</Badge>
          </div>
        </div>

        <CardContent className="space-y-3 pb-2">
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 group-hover:text-blue-700">
            {college.name}
          </h3>

          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">{locationLabel}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1" aria-label={`Rating ${college.rating} out of 5`}>
              <div className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-3.5 w-3.5',
                      i < fullStars
                        ? 'fill-amber-400 text-amber-400'
                        : i === fullStars && hasHalf
                          ? 'fill-amber-200 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">{college.rating.toFixed(1)}</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{formatINR(college.annualFees)}<span className="text-xs font-normal text-slate-500">/yr</span></p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {college.approvedBy.map((body) => (
              <Badge key={body} variant="outline" className="text-[10px]">
                {body}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-1">
            {college.streams.map((s) => (
              <span key={s} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                {s}
              </span>
            ))}
          </div>
        </CardContent>
      </Link>

      <div className="flex items-center gap-2 border-t border-slate-100 p-3">
        <AuthGuard title="Sign in to compare colleges">
          <Button
            type="button"
            variant={isCompareSelected ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            disabled={isCompareDisabled}
            onClick={() => onCompareToggle(college.id)}
            aria-pressed={isCompareSelected}
            aria-label={
              isCompareSelected
                ? `Remove ${college.name} from compare`
                : isCompareDisabled
                  ? `Compare limit reached`
                  : `Add ${college.name} to compare`
            }
          >
            <GitCompare className="h-3.5 w-3.5" aria-hidden />
            {isCompareSelected ? 'Comparing' : 'Compare'}
          </Button>
        </AuthGuard>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onSaveToggle(college.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Unsave ${college.name}` : `Save ${college.name}`}
        >
          <Bookmark
            className={cn('h-4 w-4', isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-400')}
            aria-hidden
          />
        </Button>
      </div>
    </Card>
  );
}
