import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import type { GuideMeta } from "@/lib/types";

interface GuideCardProps {
  guide: GuideMeta;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow group cursor-pointer border-muted/60">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            {guide.category && (
              <Badge variant="secondary" className="text-xs">
                {guide.category}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {guide.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {guide.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(guide.publishDate).toLocaleDateString("en-SG", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {guide.readTime} min read
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
