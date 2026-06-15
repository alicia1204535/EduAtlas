import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSchoolsByCurriculum } from "@/lib/schools";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SchoolCard } from "@/components/schools/school-card";
import { CURRICULUM_OPTIONS } from "@/lib/constants";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return CURRICULUM_OPTIONS.map((c) => ({
    type: c.value.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const curriculum = CURRICULUM_OPTIONS.find(
    (c) => c.value.toLowerCase().replace(/\s+/g, "-") === type
  );
  if (!curriculum) return {};

  return {
    title: `${curriculum.label} Schools in Singapore — Full List & Comparison | EduAtlas`,
    description: `Browse all ${curriculum.label} international schools in Singapore. Compare fees, admission requirements, and facilities across ${curriculum.label}-offering schools.`,
  };
}

export default async function CurriculumPage({ params }: Props) {
  const { type } = await params;
  const curriculum = CURRICULUM_OPTIONS.find(
    (c) => c.value.toLowerCase().replace(/\s+/g, "-") === type
  );

  if (!curriculum) notFound();

  const schools = getSchoolsByCurriculum(curriculum.value);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumbs items={[{ label: curriculum.label }]} />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {curriculum.label} Schools in Singapore
        </h1>
        <p className="text-muted-foreground">
          {schools.length} international school{schools.length !== 1 ? "s" : ""} offering the {curriculum.label} curriculum
        </p>
      </header>

      {schools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schools.map((school) => (
            <SchoolCard key={school.slug} school={school} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-12 text-center">
          No schools found for this curriculum.
        </p>
      )}

      {/* Cross-links */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-lg font-semibold mb-3">Browse Other Curricula</h2>
        <div className="flex flex-wrap gap-2">
          {CURRICULUM_OPTIONS.filter(
            (c) =>
              c.value.toLowerCase().replace(/\s+/g, "-") !== type
          ).map((c) => (
            <a
              key={c.value}
              href={`/curriculum/${c.value.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-muted transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
