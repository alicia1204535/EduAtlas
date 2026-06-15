import { School, BookOpen, MapPin, Users } from "lucide-react";

interface StatsBannerProps {
  schoolCount: number;
  curriculumCount: number;
  regionCount: number;
}

export function StatsBanner({
  schoolCount,
  curriculumCount,
  regionCount,
}: StatsBannerProps) {
  const stats = [
    { icon: School, label: "Schools", value: `${schoolCount}+` },
    { icon: BookOpen, label: "Curricula", value: String(curriculumCount) },
    { icon: MapPin, label: "Regions", value: String(regionCount) },
    { icon: Users, label: "Expert Guides", value: "Coming" },
  ];

  return (
    <section className="py-10 border-y bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
