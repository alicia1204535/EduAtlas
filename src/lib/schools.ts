import type { School } from "./types";
import { cache } from "react";
import { allSchools } from "@/data/schools";

export const loadAllSchools = cache((): School[] => {
  return [...allSchools].sort((a, b) => a.order - b.order);
});

export const getSchoolBySlug = cache((slug: string): School | undefined => {
  return allSchools.find((s) => s.slug === slug);
});

export const getSchoolsByCurriculum = cache((type: string): School[] => {
  const t = type.toLowerCase();
  return allSchools.filter((s) =>
    s.curriculum.some((c) => c.toLowerCase().includes(t) || slugify(c).includes(t))
  );
});

export const getSchoolsByRegion = cache((name: string): School[] => {
  const n = name.toLowerCase();
  return allSchools.filter((s) => s.region.toLowerCase() === n);
});

export const getSchoolsByFeeRange = cache((min: number, max: number): School[] => {
  return allSchools.filter(
    (s) => s.feeRange.min >= min && s.feeRange.min <= max
  );
});

export const getFeaturedSchools = cache((count = 6): School[] => {
  return allSchools.filter((s) => s.featured).slice(0, count);
});

export const getRelatedSchools = cache((school: School, count = 4): School[] => {
  return allSchools
    .filter((s) => s.slug !== school.slug)
    .filter(
      (s) =>
        s.region === school.region ||
        s.curriculum.some((c) => school.curriculum.includes(c))
    )
    .slice(0, count);
});

export const getUniqueCurriculums = cache((): string[] => {
  const set = new Set<string>();
  allSchools.forEach((s) => s.curriculum.forEach((c) => set.add(c)));
  return Array.from(set).sort();
});

export const getUniqueRegions = cache((): string[] => {
  const set = new Set<string>();
  allSchools.forEach((s) => set.add(s.region));
  return Array.from(set).sort();
});

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-");
}
