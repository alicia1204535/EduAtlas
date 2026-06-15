import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About ${SITE_NAME} — Your Singapore International School Guide`,
  description: `Learn about ${SITE_NAME}, the independent guide to international schools in Singapore. Our mission is to help families make informed decisions about their children's education.`,
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "About" }]} />

      <h1 className="text-4xl font-bold tracking-tight mb-6">About EduAtlas</h1>

      <div className="prose prose-neutral max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          EduAtlas is an independent guide to international schools in Singapore.
          We help families — expats and locals alike — make confident, informed
          decisions about their children&apos;s education.
        </p>

        <h2>Our Mission</h2>
        <p>
          Choosing an international school is one of the most consequential
          decisions a family can make. Yet the information available is often
          fragmented across school websites, forums, and word-of-mouth. EduAtlas
          brings everything together in one place — structured, data-driven, and
          transparent.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Comprehensive school profiles</strong> — 40+ international
            schools with detailed information on fees, curriculum, admission,
            and facilities.
          </li>
          <li>
            <strong>Data-driven comparisons</strong> — Compare schools
            side-by-side on the metrics that matter to you.
          </li>
          <li>
            <strong>Expert-written guides</strong> — In-depth articles on
            curriculum choices, admission processes, and navigating
            Singapore&apos;s education landscape.
          </li>
          <li>
            <strong>Personalised recommendations</strong> — A smart
            questionnaire that matches your preferences with the best-fit
            schools.
          </li>
        </ul>

        <h2>Our Data</h2>
        <p>
          We collect school information from official school websites, publicly
          available documents, and direct communication with admissions offices.
          Fees, admission requirements, and other details are updated regularly,
          but always verify with the school directly before making decisions.
        </p>

        <h2>Contact</h2>
        <p>
          Have a question, correction, or suggestion? We&apos;d love to hear
          from you. Reach us at{" "}
          <a href="/contact" className="text-primary hover:underline">
            our contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
