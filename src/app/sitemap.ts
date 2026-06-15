import type { MetadataRoute } from "next";
import { loadAllSchools } from "@/lib/schools";
import { loadAllGuides } from "@/lib/guides";
import { CURRICULUM_OPTIONS, REGION_OPTIONS, FEE_RANGES, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const schools = loadAllSchools();
  const guides = loadAllGuides();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/schools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/recommend`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/schools/compare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // School detail pages
  const schoolPages: MetadataRoute.Sitemap = schools.map((school) => ({
    url: `${SITE_URL}/schools/${school.slug}`,
    lastModified: new Date(school.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedDate || guide.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Curriculum pages
  const curriculumPages: MetadataRoute.Sitemap = CURRICULUM_OPTIONS.map((c) => ({
    url: `${SITE_URL}/curriculum/${c.value.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Region pages
  const regionPages: MetadataRoute.Sitemap = REGION_OPTIONS.map((r) => ({
    url: `${SITE_URL}/region/${r.value.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Fee range pages
  const feeRangePages: MetadataRoute.Sitemap = FEE_RANGES.map((f) => ({
    url: `${SITE_URL}/fee-range/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...schoolPages,
    ...guidePages,
    ...curriculumPages,
    ...regionPages,
    ...feeRangePages,
  ];
}
