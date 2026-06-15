// ── Curriculum ──
export type CurriculumType =
  | "IB PYP"
  | "IB MYP"
  | "IB DP"
  | "IGCSE"
  | "AP"
  | "A-Levels"
  | "IPC"
  | "Cambridge"
  | "Montessori"
  | "Reggio Emilia"
  | "Australian"
  | "Canadian"
  | "French"
  | "German"
  | "Indian";

// ── Region ──
export type SingaporeRegion = "Central" | "East" | "West" | "North" | "North-East";

// ── Fee ──
export interface FeeByGrade {
  grade: string;
  annualFee: number;
  termFee?: number;
  notes?: string;
}

export interface FeeRange {
  min: number;
  max: number;
  currency: "SGD";
}

// ── Admission ──
export interface AdmissionInfo {
  process: string;
  requirements: string[];
  deadlines: string;
  assessmentInfo?: string;
  waitingList?: boolean;
  priorityGroups?: string[];
}

// ── Contact ──
export interface ContactInfo {
  phone?: string;
  email?: string;
  website: string;
}

// ── FAQ ──
export interface FAQ {
  question: string;
  answer: string;
}

// ── School Stats ──
export interface SchoolStats {
  founded?: number;
  studentCount?: number;
  teacherStudentRatio?: string;
  averageClassSize?: number;
  campusSize?: string;
}

// ── School ──
export interface School {
  id: string;
  name: string;
  slug: string;
  logo: string;
  heroImage: string;
  tagline: string;
  description: string;
  curriculum: CurriculumType[];
  region: SingaporeRegion;
  address: string;
  nearestMRT?: string;
  coordinates: { lat: number; lng: number };
  feeRange: FeeRange;
  fees: FeeByGrade[];
  admission: AdmissionInfo;
  contact: ContactInfo;
  stats: SchoolStats;
  facilities: string[];
  languages: string[];
  accreditation: string[];
  faqs: FAQ[];
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
  featured: boolean;
  order: number;
  updatedAt: string;
}

// ── Guide ──
export interface GuideMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  updatedDate?: string;
  featuredImage: string;
  readTime: number;
  category: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
  };
}

// ── Recommendation ──
export interface RecommendationQuestion {
  id: string;
  question: string;
  type: "single" | "multi" | "range";
  options: { label: string; value: string }[];
  weight: number;
}

export interface RecommendationResult {
  school: School;
  score: number;
  reasons: string[];
}
