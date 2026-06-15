import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSchoolBySlug, loadAllSchools } from "@/lib/schools";
import { SITE_URL } from "@/lib/constants";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SchoolHero } from "@/components/schools/school-hero";
import { SchoolInfoCards } from "@/components/schools/school-info-cards";
import { SchoolFeesTable } from "@/components/schools/school-fees-table";
import { SchoolCurriculum } from "@/components/schools/school-curriculum";
import { SchoolAdmission } from "@/components/schools/school-admission";
import { SchoolFAQ } from "@/components/schools/school-faq";
import { SchoolLocation } from "@/components/schools/school-location";
import { SchoolRelated } from "@/components/schools/school-related";
import { SchoolCTA } from "@/components/schools/school-cta";
import { SchoolJsonLd } from "@/components/schools/school-jsonld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const schools = loadAllSchools();
  return schools.map((school) => ({ slug: school.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) return {};

  return {
    title: { absolute: school.seo.title },
    description: school.seo.description,
    alternates: { canonical: `${SITE_URL}/schools/${school.slug}` },
    openGraph: {
      title: school.seo.title,
      description: school.seo.description,
      type: "article",
      images: [{ url: school.heroImage }],
    },
  };
}

export default async function SchoolDetailPage({ params }: Props) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);

  if (!school) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <SchoolJsonLd school={school} />
      <Breadcrumbs
        items={[
          { label: "Schools", href: "/schools" },
          { label: school.name },
        ]}
      />

      <SchoolHero school={school} />
      <SchoolInfoCards school={school} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4">About {school.name}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {school.description}
            </p>
          </section>

          <SchoolCurriculum school={school} />
          <SchoolFeesTable school={school} />
          <SchoolAdmission school={school} />
          <SchoolFAQ faqs={school.faqs} />
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <SchoolLocation school={school} />
          <SchoolCTA school={school} />
        </aside>
      </div>

      <div className="mt-16 pt-10 border-t">
        <SchoolRelated school={school} />
      </div>
    </div>
  );
}
