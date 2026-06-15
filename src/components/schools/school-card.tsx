import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap, DollarSign } from "lucide-react";
import type { School } from "@/lib/types";

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Link href={`/schools/${school.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow group cursor-pointer border-muted/60">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0 text-lg font-bold text-muted-foreground">
              {school.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors truncate">
                {school.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                {school.tagline}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {school.region}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {school.curriculum.slice(0, 2).join(", ")}
                  {school.curriculum.length > 2 && "..."}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <DollarSign className="h-3 w-3 mr-1" />
                  ${(school.feeRange.min / 1000).toFixed(0)}k–${(school.feeRange.max / 1000).toFixed(0)}k/yr
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
