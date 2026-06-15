import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSchoolsByFeeRange } from "@/lib/schools";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SchoolCard } from "@/components/schools/school-card";
import { FEE_RANGES } from "@/lib/constants";

interface Props {
  params: Promise<{ range: string }>;
}

export async function generateStaticParams() {
  return FEE_RANGES.map((r) => ({ range: r.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { range } = await params;
  const feeRange = FEE_RANGES.find((r) => r.slug === range);
  if (!feeRange) return {};

  return {
    title: `International Schools in Singapore: ${feeRange.label} | EduAtlas`,
    description: `Browse international schools in Singapore with annual fees ${feeRange.label}. Compare curriculum, facilities, and admission requirements.`,
  };
}

export default async function FeeRangePage({ params }: Props) {
  const { range } = await params;
  const feeRange = FEE_RANGES.find((r) => r.slug === range);
  if (!feeRange) notFound();

  const schools = getSchoolsByFeeRange(feeRange.min, feeRange.max);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumbs
        items={[{ label: `Fees: ${feeRange.label}` }]}
      />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          International Schools: {feeRange.label}
        </h1>
        <p className="text-muted-foreground">
          {schools.length} international school{schools.length !== 1 ? "s" : ""} with annual fees {feeRange.label}
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
          No schools found in this fee range yet.
        </p>
      )}

      <div className="mt-12 pt-8 border-t">
        <h2 className="text-lg font-semibold mb-3">Browse Other Fee Ranges</h2>
        <div className="flex flex-wrap gap-2">
          {FEE_RANGES.filter((r) => r.slug !== range).map((r) => (
            <a
              key={r.slug}
              href={`/fee-range/${r.slug}`}
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
