import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { School } from "@/lib/types";

interface SchoolCTAProps {
  school: School;
}

export function SchoolCTA({ school }: SchoolCTAProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-5 space-y-3">
        <h3 className="font-semibold text-base">Interested in {school.name}?</h3>
        <p className="text-sm text-muted-foreground">
          Not sure if this is the right school for your child? Use our
          recommendation tool to find your best match.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href={school.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Visit School Website
          </a>
          <Link
            href="/recommend"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            Get Personalised Recommendation
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
