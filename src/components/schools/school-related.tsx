import { getRelatedSchools } from "@/lib/schools";
import { SchoolCard } from "./school-card";
import type { School } from "@/lib/types";

interface SchoolRelatedProps {
  school: School;
}

export function SchoolRelated({ school }: SchoolRelatedProps) {
  const related = getRelatedSchools(school, 4);

  if (related.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Similar Schools You Might Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((s) => (
          <SchoolCard key={s.slug} school={s} />
        ))}
      </div>
    </section>
  );
}
