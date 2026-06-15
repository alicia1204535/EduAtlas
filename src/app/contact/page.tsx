import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Contact EduAtlas — Get in Touch",
  description:
    "Have questions about international schools in Singapore? Contact the EduAtlas team for corrections, suggestions, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <h1 className="text-4xl font-bold tracking-tight mb-6">Contact Us</h1>

      <div className="prose prose-neutral max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          We&apos;re here to help. Whether you have a question about a specific
          school, found an error in our data, or want to suggest a feature — we
          want to hear from you.
        </p>

        <div className="not-prose mt-8 p-6 rounded-xl bg-muted/30 text-center">
          <p className="text-muted-foreground mb-2">
            Contact form coming soon. For now, reach us at:
          </p>
          <a
            href="mailto:hello@eduatlas.sg"
            className="text-primary hover:underline font-medium text-lg"
          >
            hello@eduatlas.sg
          </a>
        </div>

        <h2 className="mt-8">Frequently Asked</h2>
        <h3>How often is school data updated?</h3>
        <p>
          We review and update school data quarterly. Fee information is updated
          annually when schools publish their new academic year rates.
        </p>
        <h3>Can I suggest a school that&apos;s not listed?</h3>
        <p>
          Absolutely! Email us with the school details and we&apos;ll add it to
          our database.
        </p>
        <h3>Do you accept advertising or sponsored placements?</h3>
        <p>
          We are exploring sustainable monetization options that preserve our
          editorial independence. Schools cannot pay for higher rankings or more
          favorable descriptions.
        </p>
      </div>
    </div>
  );
}
