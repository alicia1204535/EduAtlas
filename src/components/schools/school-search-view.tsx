"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SchoolCard } from "@/components/schools/school-card";
import { CURRICULUM_OPTIONS, REGION_OPTIONS } from "@/lib/constants";
import type { School } from "@/lib/types";

type SearchSchool = Pick<School, "slug" | "name" | "tagline" | "region" | "curriculum" | "feeRange" | "featured">;

interface Props {
  schools: SearchSchool[];
}

export function SchoolSearchView({ schools }: Props) {
  const [query, setQuery] = useState("");
  const [curriculum, setCurriculum] = useState("all");
  const [region, setRegion] = useState("all");

  const fuse = useMemo(
    () =>
      new Fuse(schools, {
        keys: ["name", "tagline", "curriculum", "region"],
        threshold: 0.3,
      }),
    [schools]
  );

  const filtered = useMemo(() => {
    let results = schools;
    if (curriculum !== "all") {
      results = results.filter((s) =>
        s.curriculum.some((c) => c.toLowerCase() === curriculum.toLowerCase())
      );
    }
    if (region !== "all") {
      results = results.filter((s) => s.region === region);
    }
    if (query.trim()) {
      results = fuse.search(query).map((r) => r.item);
    }
    return results;
  }, [query, curriculum, region, schools, fuse]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by school name..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={curriculum}
          onChange={(e) => setCurriculum(e.target.value)}
        >
          <option value="all">All Curricula</option>
          {CURRICULUM_OPTIONS.map((c) => (
            <option key={c.value} value={c.value.toLowerCase()}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="all">All Regions</option>
          {REGION_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
        {schools.length} schools
      </p>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((school) => (
            <SchoolCard key={school.slug} school={school as School} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-2">
            No schools match your filters.
          </p>
          <button
            className="text-primary text-sm hover:underline"
            onClick={() => {
              setQuery("");
              setCurriculum("all");
              setRegion("all");
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
