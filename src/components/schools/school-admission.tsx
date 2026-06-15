import { Badge } from "@/components/ui/badge";
import type { School } from "@/lib/types";

interface SchoolAdmissionProps {
  school: School;
}

export function SchoolAdmission({ school }: SchoolAdmissionProps) {
  const { admission } = school;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Admission</h2>

      <div className="space-y-4">
        {/* Process */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Process</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {admission.process}
          </p>
        </div>

        {/* Requirements */}
        {admission.requirements.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Requirements
            </h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
              {admission.requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Deadlines */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Deadlines</h3>
          <p className="text-sm text-muted-foreground">{admission.deadlines}</p>
        </div>

        {/* Assessment */}
        {admission.assessmentInfo && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Assessment
            </h3>
            <p className="text-sm text-muted-foreground">{admission.assessmentInfo}</p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {admission.waitingList && (
            <Badge variant="destructive" className="text-xs">
              ⏳ Waiting List
            </Badge>
          )}
          {admission.priorityGroups && admission.priorityGroups.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              Priority: {admission.priorityGroups.join(", ")}
            </Badge>
          )}
        </div>
      </div>
    </section>
  );
}
