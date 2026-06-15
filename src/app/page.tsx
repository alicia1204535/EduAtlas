import { loadAllSchools, getUniqueCurriculums, getUniqueRegions } from "@/lib/schools";
import { HeroSearch } from "@/components/home/hero-search";
import { StatsBanner } from "@/components/home/stats-banner";
import { FeaturedSchools } from "@/components/home/featured-schools";

export const revalidate = 3600;

export default function HomePage() {
  const schools = loadAllSchools();
  const curriculumCount = getUniqueCurriculums().length;
  const regionCount = getUniqueRegions().length;

  const searchSchools = schools.map((s) => ({
    slug: s.slug,
    name: s.name,
    region: s.region,
    curriculum: s.curriculum,
  }));

  return (
    <div>
      <div className="container mx-auto px-4">
        <HeroSearch schools={searchSchools} />
      </div>
      <StatsBanner
        schoolCount={schools.length}
        curriculumCount={curriculumCount}
        regionCount={regionCount}
      />
      <FeaturedSchools />
    </div>
  );
}
