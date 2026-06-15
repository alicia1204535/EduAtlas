import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CompareTool } from "@/components/schools/compare-table";

export const metadata: Metadata = {
  title: { absolute: "Compare International Schools in Singapore | EduAtlas" },
  description:
    "Compare international schools in Singapore side-by-side. View fees, curriculum, class sizes, facilities and more across up to 3 schools.",
};

export const revalidate = 3600;

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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
          Select up to 3 schools to compare fees, curriculum, admission, and
          facilities side by side.
        </p>
      </header>

      <CompareTool />
    </div>
  );
}
