import { SITE_URL } from "@/lib/constants";
import type { GuideMeta } from "@/lib/types";

interface GuideJsonLdProps {
  meta: GuideMeta;
  content: string;
}

export function GuideJsonLd({ meta, content }: GuideJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    author: {
      "@type": "Organization",
      name: meta.author,
    },
    datePublished: meta.publishDate,
    ...(meta.updatedDate && { dateModified: meta.updatedDate }),
    url: `${SITE_URL}/guides/${meta.slug}`,
    wordCount: content.split(/\s+/).length,
    ...(meta.featuredImage && { image: `${SITE_URL}${meta.featuredImage}` }),
    publisher: {
      "@type": "Organization",
      name: "EduAtlas",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
