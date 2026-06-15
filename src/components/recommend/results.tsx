"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw, CheckCircle2, Trophy, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RecommendationResult } from "@/lib/recommendation";

interface Props {
  results: RecommendationResult[];
  onRestart: () => void;
}

const MEDALS = [
  { icon: Trophy, color: "text-yellow-500", label: "Best Match" },
  { icon: Medal, color: "text-slate-400", label: "Runner Up" },
  { icon: Medal, color: "text-amber-600", label: "Third Pick" },
];

export function RecommendationResults({ results, onRestart }: Props) {
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted-foreground mb-4">
          No schools matched your criteria. Try adjusting your preferences.
        </p>
        <Button onClick={onRestart} variant="outline">
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Your Top {results.length} Matches</h2>
        <p className="text-muted-foreground">
          Based on your preferences, here are the best international schools for
          your family.
        </p>
      </div>

      {/* Results Cards */}
      <div className="space-y-5 mb-10">
        {results.map((result, i) => {
          const { school, score, reasons } = result;
          const { icon: MedalIcon, color, label } = MEDALS[i];
          const avgFee = Math.round(
            (school.feeRange.min + school.feeRange.max) / 2 / 1000
          );

          return (
            <Card
              key={school.slug}
              className={`border-2 transition-all ${
                i === 0
                  ? "border-primary/40 shadow-md"
                  : "border-muted/60 hover:border-muted-foreground/20"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Rank + Score */}
                  <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 shrink-0 sm:w-24">
                    <MedalIcon className={`h-7 w-7 ${color}`} />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {score}%
                      </div>
                      <div className="text-xs text-muted-foreground">match</div>
                    </div>
                    <Badge variant="secondary" className="text-xs sm:hidden">
                      {label}
                    </Badge>
                  </div>

                  {/* School Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-xl font-bold">
                          {school.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                          {school.tagline}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0 hidden sm:inline-flex">
                        {label}
                      </Badge>
                    </div>

                    {/* Quick facts */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {school.region}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ~SGD {avgFee}k/yr
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {school.curriculum.slice(0, 2).join(", ")}
                      </Badge>
                    </div>

                    {/* Match reasons */}
                    <div className="space-y-1.5">
                      {reasons.map((reason, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-4">
                      <Link
                        href={`/schools/${school.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        View full school profile
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onRestart} variant="outline" size="lg" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Start Over
        </Button>
        <Link href="/schools">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            Browse All Schools
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
