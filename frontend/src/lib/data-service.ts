import type { College } from '@/types/college';
import { resolveCollegeMedia } from '@/lib/college-images';
import {
  getCollegeDetailById,
  getCollegeDetailsByIds,
  predictCollegesByRank,
} from '@/data/college-details';

export const getCollegeById = async (id: string): Promise<College | undefined> => {
  const college = getCollegeDetailById(id);
  return college ? resolveCollegeMedia(college) : undefined;
};

export const getCollegesByIds = async (ids: string[]): Promise<College[]> => {
  if (ids.length === 0) return [];
  const colleges = getCollegeDetailsByIds(ids);
  return colleges.map(resolveCollegeMedia);
};

export interface PredictResult {
  colleges: College[];
  tier: 'exact' | 'reach' | 'broadest';
}

export const predictColleges = async (exam: string, rank: number): Promise<PredictResult> => {
  const { colleges, tier } = predictCollegesByRank(exam, rank);
  return { colleges: colleges.map(resolveCollegeMedia), tier };
};
