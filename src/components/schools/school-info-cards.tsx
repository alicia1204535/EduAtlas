import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, UserCheck, Building2, School as SchoolIcon } from "lucide-react";
import type { School } from "@/lib/types";

const formatNumber = (n: number) => new Intl.NumberFormat("en-SG").format(n);

interface SchoolInfoCardsProps {
  school: School;
}

export function SchoolInfoCards({ school }: SchoolInfoCardsProps) {
  const cards = [
    ...(school.stats.founded
      ? [{ icon: Calendar, label: "Founded", value: String(school.stats.founded) }]
      : []),
    ...(school.stats.studentCount
      ? [{ icon: Users, label: "Students", value: formatNumber(school.stats.studentCount) }]
      : []),
    ...(school.stats.teacherStudentRatio
      ? [{ icon: UserCheck, label: "Teacher:Student", value: school.stats.teacherStudentRatio }]
      : []),
    ...(school.stats.averageClassSize
      ? [{ icon: SchoolIcon, label: "Avg. Class Size", value: String(school.stats.averageClassSize) }]
      : []),
    ...(school.stats.campusSize
      ? [{ icon: Building2, label: "Campus", value: school.stats.campusSize }]
      : []),
  ];

  if (cards.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
      {cards.map(({ icon: Icon, label, value }) => (
        <Card key={label} className="border-muted/60">
          <CardContent className="p-4 text-center">
            <Icon className="h-5 w-5 mx-auto mb-1.5 text-muted-foreground" />
            <div className="text-lg font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
