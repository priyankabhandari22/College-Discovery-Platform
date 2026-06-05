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

export const predictColleges = async (exam: string, rank: number): Promise<College[]> => {
  const colleges = predictCollegesByRank(exam, rank);
  return colleges.map(resolveCollegeMedia);
};
