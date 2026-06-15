import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Questionnaire } from "@/components/recommend/questionnaire";

export const metadata: Metadata = {
  title: { absolute: "Find Your Ideal International School — Personalised Recommendation | EduAtlas" },
  description:
    "Answer a few questions about your preferences and get a personalised list of the top 3 international schools in Singapore that match your family's needs.",
};

export const revalidate = 3600;

export default function RecommendPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Recommend" }]} />

      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Find Your Ideal School
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Answer 6 quick questions and we&apos;ll match you with the top 3
          international schools that best fit your family&apos;s needs.
        </p>
      </header>

      <Questionnaire />
    </div>
  );
}
