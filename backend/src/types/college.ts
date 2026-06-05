export type Stream = 'Engineering' | 'Arts' | 'Commerce';

export interface College {
  id: string;
  name: string;
  logo: string;
  image: string;
  location: string;
  rating: number;
  fees: number;
  placementPercentage: number;
  description: string;
  accreditation: string;
  established: number;
  stream: Stream;
  courses: { name: string; duration: string; fees: number }[];
  placements: {
    avgCTC: number;
    highestCTC: number;
    placementPercentage: number;
    topRecruiters: string[];
  };
  reviews: {
    studentName: string;
    rating: number;
    comment: string;
    pros: string[];
    cons: string[];
  }[];
  ratingBreakdown: {
    faculty: number;
    campus: number;
    placements: number;
    infrastructure: number;
    valueForMoney: number;
  };
  cutoffs: Record<string, { min: number; max: number }>;
}
