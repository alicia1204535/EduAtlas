"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/lib/types";

interface SchoolFAQProps {
  faqs: FAQ[];
}

export function SchoolFAQ({ faqs }: SchoolFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
