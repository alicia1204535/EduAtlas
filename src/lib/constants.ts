import type { CurriculumType, SingaporeRegion } from "./types";

export const SITE_NAME = "EduAtlas";
export const SITE_DESCRIPTION =
  "Your guide to international schools in Singapore. Compare fees, curriculum, and admission info across 40+ international schools.";
export const SITE_URL = "https://www.eduatlas.sg";

export const CURRICULUM_OPTIONS: { label: string; value: CurriculumType }[] = [
  { label: "IB PYP", value: "IB PYP" },
  { label: "IB MYP", value: "IB MYP" },
  { label: "IB DP", value: "IB DP" },
  { label: "IGCSE", value: "IGCSE" },
  { label: "AP", value: "AP" },
  { label: "A-Levels", value: "A-Levels" },
  { label: "IPC", value: "IPC" },
  { label: "Cambridge", value: "Cambridge" },
  { label: "Montessori", value: "Montessori" },
  { label: "Australian", value: "Australian" },
  { label: "Canadian", value: "Canadian" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Indian", value: "Indian" },
];

export const REGION_OPTIONS: { label: string; value: SingaporeRegion }[] = [
  { label: "Central", value: "Central" },
  { label: "East", value: "East" },
  { label: "West", value: "West" },
  { label: "North", value: "North" },
  { label: "North-East", value: "North-East" },
];

export const FEE_RANGES = [
  { label: "Under $20,000/year", slug: "under-20000", min: 0, max: 20000 },
  { label: "$20,000 – $30,000/year", slug: "20000-30000", min: 20000, max: 30000 },
  { label: "$30,000 – $40,000/year", slug: "30000-40000", min: 30000, max: 40000 },
  { label: "Above $40,000/year", slug: "above-40000", min: 40000, max: 100000 },
];

export const NAV_LINKS = [
  { label: "Schools", href: "/schools" },
  { label: "Recommend", href: "/recommend" },
  { label: "Guides", href: "/guides" },
  { label: "Compare", href: "/schools/compare" },
  { label: "About", href: "/about" },
] as const;
