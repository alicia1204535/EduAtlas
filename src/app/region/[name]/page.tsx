import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSchoolsByRegion } from "@/lib/schools";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SchoolCard } from "@/components/schools/school-card";
import { REGION_OPTIONS } from "@/lib/constants";

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return REGION_OPTIONS.map((r) => ({ name: r.value.toLowerCase() }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const region = REGION_OPTIONS.find((r) => r.value.toLowerCase() === name);
  if (!region) return {};

  return {
    title: `International Schools in ${region.label} Singapore — Full List | EduAtlas`,
    description: `Browse international schools located in the ${region.label} region of Singapore. Compare fees, curriculum, and facilities for ${region.label}-area schools.`,
  };
}

export default async function RegionPage({ params }: Props) {
  const { name } = await params;
  const region = REGION_OPTIONS.find((r) => r.value.toLowerCase() === name);
  if (!region) notFound();

  const schools = getSchoolsByRegion(region.value);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumbs items={[{ label: `${region.label} Region` }]} />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          International Schools in {region.label} Singapore
        </h1>
        <p className="text-muted-foreground">
          {schools.length} international school{schools.length !== 1 ? "s" : ""} in the {region.label} region
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
          No schools found in this region yet.
        </p>
      )}

      <div className="mt-12 pt-8 border-t">
        <h2 className="text-lg font-semibold mb-3">Browse Other Regions</h2>
        <div className="flex flex-wrap gap-2">
          {REGION_OPTIONS.filter((r) => r.value.toLowerCase() !== name).map((r) => (
            <a
              key={r.value}
              href={`/region/${r.value.toLowerCase()}`}
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-muted transition-colors"
            >
              {r.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
