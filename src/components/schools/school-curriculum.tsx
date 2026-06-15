import { Badge } from "@/components/ui/badge";
import type { School } from "@/lib/types";

interface SchoolCurriculumProps {
  school: School;
}

export function SchoolCurriculum({ school }: SchoolCurriculumProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {school.curriculum.map((c) => (
          <Badge key={c} variant="default" className="px-3 py-1 text-sm">
            {c}
          </Badge>
        ))}
      </div>

      {/* Languages */}
      {school.languages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Languages Offered
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {school.languages.map((lang) => (
              <Badge key={lang} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Facilities */}
      {school.facilities.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Facilities
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {school.facilities.map((f) => (
              <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Accreditation */}
      {school.accreditation.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Accreditation
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {school.accreditation.map((acc) => (
              <Badge key={acc} variant="secondary" className="text-xs">
                {acc}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
