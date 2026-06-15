import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedSchools } from "@/lib/schools";
import { SchoolCard } from "@/components/schools/school-card";

export function FeaturedSchools() {
  const schools = getFeaturedSchools(6);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Featured Schools
            </h2>
            <p className="text-muted-foreground">
              Popular international schools in Singapore
            </p>
          </div>
          <Link
            href="/schools"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all schools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schools.map((school) => (
            <SchoolCard key={school.slug} school={school} />
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/schools"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all schools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
