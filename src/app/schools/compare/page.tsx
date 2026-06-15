import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Compare International Schools in Singapore | EduAtlas",
  description:
    "Compare international schools in Singapore side-by-side. View fees, curriculum, class sizes, and more across up to 3 schools.",
};

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumbs
        items={[
          { label: "Schools", href: "/schools" },
          { label: "Compare" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Compare Schools
        </h1>
        <p className="text-muted-foreground">
          Select up to 3 schools to compare side-by-side
        </p>
      </header>

      <div className="text-center py-20 rounded-xl border-2 border-dashed">
        <div className="text-4xl mb-4">🔨</div>
        <h2 className="text-xl font-semibold mb-2">
          Comparison Tool Coming Soon
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We&apos;re building an interactive comparison tool that lets you
          compare fees, curriculum, admission requirements, and more across
          multiple schools.
        </p>
        <p className="text-sm text-muted-foreground">
          In the meantime, browse individual school profiles at{" "}
          <a href="/schools" className="text-primary hover:underline font-medium">
            /schools
          </a>
          .
        </p>
      </div>
    </div>
  );
}
