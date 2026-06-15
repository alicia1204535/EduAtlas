"use client";

import { useState, useEffect, useCallback } from "react";
import Fuse from "fuse.js";
import { loadAllSchools } from "@/lib/schools";
import type { School } from "@/lib/types";

const STORAGE_KEY = "eduatlas-compare-schools";
const MAX_SCHOOLS = 3;

export function useSchoolCompare() {
  const [allSchools] = useState(() => loadAllSchools());
  const [selected, setSelected] = useState<School[]>([]);
  const [query, setQuery] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const slugs: string[] = JSON.parse(saved);
        const schools = slugs
          .map((slug) => allSchools.find((s) => s.slug === slug))
          .filter(Boolean) as School[];
        if (schools.length > 0) setSelected(schools);
      }
    } catch {}
  }, [allSchools]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(selected.map((s) => s.slug))
    );
  }, [selected]);

  const fuse = new Fuse(allSchools, {
    keys: ["name", "curriculum", "region", "tagline"],
    threshold: 0.3,
  });

  const searchResults = query.trim()
    ? fuse
        .search(query)
        .map((r) => r.item)
        .filter((s) => !selected.some((sel) => sel.slug === s.slug))
        .slice(0, 5)
    : [];

  const addSchool = useCallback(
    (slug: string) => {
      if (selected.length >= MAX_SCHOOLS) return;
      const school = allSchools.find((s) => s.slug === slug);
      if (school && !selected.some((s) => s.slug === slug)) {
        setSelected((prev) => [...prev, school]);
      }
      setQuery("");
    },
    [selected, allSchools]
  );

  const removeSchool = useCallback((slug: string) => {
    setSelected((prev) => prev.filter((s) => s.slug !== slug));
  }, []);

  const clearAll = useCallback(() => {
    setSelected([]);
    setQuery("");
  }, []);

  return {
    allSchools,
    selected,
    query,
    setQuery,
    searchResults,
    addSchool,
    removeSchool,
    clearAll,
    maxReached: selected.length >= MAX_SCHOOLS,
  };
}
