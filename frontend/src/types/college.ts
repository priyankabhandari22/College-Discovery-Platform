/** Engineering branch streams for MHT-CET / JEE listing filters */
export type EngineeringStream = 'CS' | 'IT' | 'ECE' | 'EXTC' | 'Mech' | 'Civil' | 'ENTC' | 'AIML' | 'AIDS' | 'Cybersecurity';

export type Ownership = 'Government' | 'Aided' | 'Private' | 'Deemed';

export type NaacGrade = 'A++' | 'A+' | 'A' | 'B++' | 'B+';

export type ApprovalBody = 'AICTE' | 'NBA' | 'UGC';

export type SortOption = 'rating' | 'fees-asc' | 'fees-desc' | 'name';

export interface CollegeListItem {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  annualFees: number;
  naacGrade: NaacGrade;
  ownership: Ownership;
  streams: EngineeringStream[];
  approvedBy: ApprovalBody[];
  logo?: string | null;
  image?: string | null;
  placementPct?: number | null;
}

export interface CollegeSeedInput extends CollegeListItem {
  description?: string;
  established?: number;
}

export interface CollegesQueryParams {
  search?: string;
  location?: string[];
  minRating?: number;
  minFees?: number;
  maxFees?: number;
  stream?: EngineeringStream[];
  ownership?: Ownership;
  naac?: NaacGrade[];
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface CollegesApiResponse {
  colleges: CollegeListItem[];
  totalCount: number;
  page: number;
  limit: number;
}

export const ENGINEERING_STREAMS: EngineeringStream[] = ['CS', 'IT', 'ECE', 'EXTC', 'Mech', 'Civil', 'ENTC', 'AIML', 'AIDS', 'Cybersecurity'];

export const OWNERSHIP_OPTIONS: Ownership[] = [
  'Government',
  'Aided',
  'Private',
  'Deemed',
];

export const NAAC_GRADES: NaacGrade[] = ['A++', 'A+', 'A', 'B++', 'B+'];

export const APPROVAL_BODIES: ApprovalBody[] = ['AICTE', 'NBA', 'UGC'];

export const LOCATION_OPTIONS = [
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Navi Mumbai', state: 'Maharashtra' },
  { city: 'Sangli', state: 'Maharashtra' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Delhi', state: 'Delhi' },
  { city: 'New Delhi', state: 'Delhi' },
  { city: 'Bangalore', state: 'Karnataka' },
  { city: 'Mangalore', state: 'Karnataka' },
  { city: 'Mysore', state: 'Karnataka' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Trichy', state: 'Tamil Nadu' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Warangal', state: 'Telangana' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Kharagpur', state: 'West Bengal' },
  { city: 'Kanpur', state: 'Uttar Pradesh' },
  { city: 'Varanasi', state: 'Uttar Pradesh' },
  { city: 'Lucknow', state: 'Uttar Pradesh' },
  { city: 'Noida', state: 'Uttar Pradesh' },
  { city: 'Gandhinagar', state: 'Gujarat' },
  { city: 'Surat', state: 'Gujarat' },
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Jodhpur', state: 'Rajasthan' },
  { city: 'Pilani', state: 'Rajasthan' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Calicut', state: 'Kerala' },
  { city: 'Thiruvananthapuram', state: 'Kerala' },
  { city: 'Kochi', state: 'Kerala' },
  { city: 'Indore', state: 'Madhya Pradesh' },
  { city: 'Bhopal', state: 'Madhya Pradesh' },
  { city: 'Ropar', state: 'Punjab' },
  { city: 'Jalandhar', state: 'Punjab' },
  { city: 'Patiala', state: 'Punjab' },
  { city: 'Bhubaneswar', state: 'Odisha' },
  { city: 'Rourkela', state: 'Odisha' },
  { city: 'Guwahati', state: 'Assam' },
  { city: 'Silchar', state: 'Assam' },
  { city: 'Roorkee', state: 'Uttarakhand' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { city: 'Ranchi', state: 'Jharkhand' },
  { city: 'Dhanbad', state: 'Jharkhand' },
  { city: 'Chandigarh', state: 'Chandigarh' },
  { city: 'Panaji', state: 'Goa' },
] as const;

export const FEES_MIN = 0;
export const FEES_MAX = 500000;
export const DEFAULT_PAGE_LIMIT = 6;

/** Legacy detail-page types (compare, predictor, detail routes) */
export type Stream = 'Engineering' | 'Arts' | 'Commerce';

export interface Course {
  name: string;
  duration: string;
  fees: number;
}

export interface PlacementData {
  avgCTC: number;
  highestCTC: number;
  placementPercentage: number;
  topRecruiters: string[];
}

export interface Review {
  studentName: string;
  rating: number;
  comment: string;
  pros: string[];
  cons: string[];
}

export interface RatingBreakdown {
  faculty: number;
  campus: number;
  placements: number;
  infrastructure: number;
  valueForMoney: number;
}

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
  courses: Course[];
  placements: PlacementData;
  reviews: Review[];
  ratingBreakdown: RatingBreakdown;
  cutoffs: Record<string, { min: number; max: number }>;
}

export interface ComparisonState {
  collegeIds: string[];
}

export interface PredictorInput {
  exam: 'JEE Main' | 'JEE Advanced' | 'GATE' | 'CAT' | 'NEET' | 'MHT-CET';
  rank: number;
}
