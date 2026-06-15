import type { School } from "@/lib/types";
import { SITE_URL } from "@/lib/constants";

interface SchoolJsonLdProps {
  school: School;
}

export function SchoolJsonLd({ school }: SchoolJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: school.name,
    url: `${SITE_URL}/schools/${school.slug}`,
    description: school.description.substring(0, 300),
    address: {
      "@type": "PostalAddress",
      streetAddress: school.address,
      addressCountry: "SG",
    },
    ...(school.contact.phone && { telephone: school.contact.phone }),
    ...(school.contact.email && { email: school.contact.email }),
    ...(school.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: school.coordinates.lat,
        longitude: school.coordinates.lng,
      },
    }),
    ...(school.stats.founded && { foundingDate: String(school.stats.founded) }),
    ...(school.stats.studentCount && {
      numberOfStudents: school.stats.studentCount,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
