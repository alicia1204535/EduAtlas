import { Badge } from "@/components/ui/badge";
import { MapPin, Globe } from "lucide-react";
import type { School } from "@/lib/types";

interface SchoolHeroProps {
  school: School;
}

export function SchoolHero({ school }: SchoolHeroProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-3xl font-bold text-primary">
        {school.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          {school.name}
        </h1>
        <p className="text-lg text-muted-foreground mb-4">{school.tagline}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {school.address}
          </Badge>
          {school.nearestMRT && (
            <Badge variant="secondary" className="gap-1">
              🚇 {school.nearestMRT}
            </Badge>
          )}
          <a
            href={school.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Globe className="h-3.5 w-3.5" />
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
}
