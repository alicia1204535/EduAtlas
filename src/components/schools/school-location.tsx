import { MapPin, Train } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { School } from "@/lib/types";

interface SchoolLocationProps {
  school: School;
}

export function SchoolLocation({ school }: SchoolLocationProps) {
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(school.address)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-muted-foreground">{school.address}</p>
        {school.nearestMRT && (
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <Train className="h-3.5 w-3.5" />
            {school.nearestMRT}
          </p>
        )}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-primary hover:underline text-sm font-medium"
        >
          View on Google Maps →
        </a>
      </CardContent>
    </Card>
  );
}
