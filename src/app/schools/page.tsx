import type { Metadata } from "next";
import { loadAllSchools } from "@/lib/schools";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SchoolSearchView } from "@/components/schools/school-search-view";

export const metadata: Metadata = {
  title: { absolute: "All International Schools in Singapore — Browse & Compare | EduAtlas" },
  description:
    "Browse all 40+ international schools in Singapore. Filter by curriculum (IB, IGCSE, AP), region, and fee range. Compare schools side-by-side.",
};

export const revalidate = 3600;

export default function SchoolsPage() {
  const schools = loadAllSchools();

  const searchData = schools.map((s) => ({
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    region: s.region,
    curriculum: s.curriculum,
    feeRange: s.feeRange,
    featured: s.featured,
  }));

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumbs items={[{ label: "Schools" }]} />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          International Schools in Singapore
        </h1>
        <p className="text-muted-foreground">
          Browse {schools.length} international schools across {new Set(schools.map((s) => s.region)).size} regions of Singapore
        </p>
      </header>

      <SchoolSearchView schools={searchData} />
    </div>
  );
}
