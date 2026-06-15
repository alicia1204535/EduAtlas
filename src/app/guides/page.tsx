import type { Metadata } from "next";
import { loadAllGuides } from "@/lib/guides";
import { GuideCard } from "@/components/guides/guide-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "International School Guides — Expert Advice for Parents | EduAtlas",
  description:
    "Comprehensive guides on choosing international schools in Singapore. Compare curricula (IB, IGCSE, AP), understand fees, admission processes, and more.",
};

export const revalidate = 3600;

export default function GuidesPage() {
  const guides = loadAllGuides();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumbs items={[{ label: "Guides" }]} />

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Guides & Resources
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Expert-written guides to help you navigate Singapore&apos;s
          international school landscape. From curriculum comparisons to
          admission timelines — we&apos;ve got you covered.
        </p>
      </header>

      {guides.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg mb-2">No guides published yet.</p>
          <p className="text-muted-foreground text-sm">
            Our editorial team is working on the first batch of guides. Check
            back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
}
