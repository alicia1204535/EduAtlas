"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { School } from "@/lib/types";

interface HeroSearchProps {
  schools: Pick<School, "slug" | "name" | "region" | "curriculum">[];
}

const POPULAR = [
  "IB schools",
  "Central region",
  "Under $30k",
  "British curriculum",
];

export function HeroSearch({ schools }: HeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return schools
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.curriculum.some((c) => c.toLowerCase().includes(q)) ||
          s.region.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [query, schools]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <section className="py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Find the Right International School in{" "}
        <span className="text-primary">Singapore</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Compare fees, curriculum, and admission info across 40+ international
        schools. Your data-driven guide to choosing the best school for your
        child.
      </p>

      <div ref={ref} className="relative max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder='Try "IB schools in Central" or "Dulwich College"...'
            className="pl-10 h-14 text-base rounded-xl shadow-sm"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
        </div>

        {open && query.trim() && (
          <div className="absolute top-full mt-2 w-full bg-popover rounded-xl border shadow-lg z-50 text-left overflow-hidden">
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <button
                  key={s.slug}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center justify-between"
                  onClick={() => {
                    setQuery("");
                    setOpen(false);
                    router.push(`/schools/${s.slug}`);
                  }}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.region} · {s.curriculum.slice(0, 2).join(", ")}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-muted-foreground text-sm">
                No schools found for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        <span className="text-sm text-muted-foreground self-center">
          Popular:
        </span>
        {POPULAR.map((term) => (
          <Badge
            key={term}
            variant="secondary"
            className="cursor-pointer hover:bg-muted transition-colors"
            onClick={() => {
              setQuery(term);
              setOpen(true);
            }}
          >
            {term}
          </Badge>
        ))}
      </div>
    </section>
  );
}
