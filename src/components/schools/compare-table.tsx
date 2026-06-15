"use client";

import { useState } from "react";
import { X, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSchoolCompare } from "@/hooks/use-school-compare";
import Link from "next/link";

function formatSGD(n: number) {
  return new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 }).format(n);
}

export function CompareTool() {
  const { selected, query, setQuery, searchResults, addSchool, removeSchool, clearAll, maxReached } = useSchoolCompare();
  const [expandedFees, setExpandedFees] = useState<Record<string, boolean>>({});

  function toggleFees(slug: string) {
    setExpandedFees((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  return (
    <div>
      {/* Search + Add */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder={maxReached ? "Remove a school first (max 3)" : "Search for a school to compare..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={maxReached}
            />
            {query && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-popover border rounded-lg shadow-lg z-50">
                {searchResults.map((s) => (
                  <button
                    key={s.slug}
                    className="w-full text-left px-3 py-2.5 hover:bg-muted transition-colors flex items-center justify-between"
                    onClick={() => addSchool(s.slug)}
                  >
                    <span className="font-medium text-sm">{s.name}</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>
          {selected.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>
        {!maxReached && !query && (
          <p className="text-sm text-muted-foreground">
            Add up to {3 - selected.length} more school{3 - selected.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Empty State */}
      {selected.length === 0 && (
        <Card className="border-dashed border-2 py-16 text-center">
          <CardContent>
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Compare Schools Side by Side</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Search and add up to 3 schools to compare their fees, curriculum,
              admission requirements, and more.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      {selected.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className="text-left px-4 py-3 font-semibold w-40 shrink-0 sticky left-0 bg-muted/40">
                  Category
                </th>
                {selected.map((school) => (
                  <th key={school.slug} className="px-4 py-3 font-semibold min-w-[200px]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-base">{school.name}</div>
                        <div className="text-xs text-muted-foreground font-normal mt-0.5">
                          {school.curriculum.slice(0, 2).join(" · ")}
                        </div>
                      </div>
                      <button
                        onClick={() => removeSchool(school.slug)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Tagline */}
              <CompareRow label="Tagline">
                {selected.map((s) => (
                  <td key={s.slug} className="px-4 py-2.5 text-muted-foreground">{s.tagline}</td>
                ))}
              </CompareRow>

              {/* Curriculum */}
              <CompareRow label="Curriculum" highlight>
                {selected.map((s) => (
                  <td key={s.slug} className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {s.curriculum.map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                    </div>
                  </td>
                ))}
              </CompareRow>

              {/* Region */}
              <CompareRow label="Region">{selected.map((s) => <td key={s.slug} className="px-4 py-2.5">{s.region}</td>)}</CompareRow>

              {/* Fee Range */}
              <CompareRow label="Fee Range" highlight>
                {selected.map((s) => (
                  <td key={s.slug} className="px-4 py-2.5">
                    <span className="font-semibold">{formatSGD(s.feeRange.min)} – {formatSGD(s.feeRange.max)}</span>
                    <span className="text-muted-foreground"> / year</span>
                    <button onClick={() => toggleFees(s.slug)} className="ml-2 text-primary text-xs hover:underline">
                      {expandedFees[s.slug] ? <ChevronUp className="h-3.5 w-3.5 inline" /> : <ChevronDown className="h-3.5 w-3.5 inline" />}
                      {expandedFees[s.slug] ? " Less" : " Details"}
                    </button>
                    {expandedFees[s.slug] && (
                      <div className="mt-2 text-xs text-muted-foreground space-y-0.5">
                        {s.fees.map((f) => (
                          <div key={f.grade}>{f.grade}: {formatSGD(f.annualFee)}</div>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </CompareRow>

              {/* Founded */}
              <CompareRow label="Founded">{selected.map((s) => <td key={s.slug} className="px-4 py-2.5">{s.stats.founded || "—"}</td>)}</CompareRow>

              {/* Students */}
              <CompareRow label="Students" highlight>{selected.map((s) => <td key={s.slug} className="px-4 py-2.5">{s.stats.studentCount?.toLocaleString() || "—"}</td>)}</CompareRow>

              {/* Teacher:Student */}
              <CompareRow label="Teacher:Student">{selected.map((s) => <td key={s.slug} className="px-4 py-2.5">{s.stats.teacherStudentRatio || "—"}</td>)}</CompareRow>

              {/* Class Size */}
              <CompareRow label="Avg Class Size" highlight>{selected.map((s) => <td key={s.slug} className="px-4 py-2.5">{s.stats.averageClassSize || "—"}</td>)}</CompareRow>

              {/* Nearest MRT */}
              <CompareRow label="Nearest MRT">{selected.map((s) => <td key={s.slug} className="px-4 py-2.5 text-muted-foreground">{s.nearestMRT || s.address.split(",").pop()?.trim() || "—"}</td>)}</CompareRow>

              {/* Languages */}
              <CompareRow label="Languages" highlight>
                {selected.map((s) => (
                  <td key={s.slug} className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {s.languages.map((l) => <Badge key={l} variant="outline" className="text-xs">{l}</Badge>)}
                    </div>
                  </td>
                ))}
              </CompareRow>

              {/* Accreditation */}
              <CompareRow label="Accreditation">{selected.map((s) => (
                <td key={s.slug} className="px-4 py-2.5"><div className="flex flex-wrap gap-1">{s.accreditation.map((a) => <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>)}</div></td>
              ))}</CompareRow>

              {/* Facilities */}
              <CompareRow label="Facilities" highlight>
                {selected.map((s) => (
                  <td key={s.slug} className="px-4 py-2.5 text-xs text-muted-foreground">
                    <ul className="list-disc list-inside space-y-0.5">
                      {s.facilities.slice(0, 6).map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </td>
                ))}
              </CompareRow>

              {/* Waiting List */}
              <CompareRow label="Waiting List">{selected.map((s) => (
                <td key={s.slug} className="px-4 py-2.5">
                  <Badge variant={s.admission.waitingList ? "destructive" : "secondary"} className="text-xs">
                    {s.admission.waitingList ? "⏳ Yes" : "No"}
                  </Badge>
                </td>
              ))}</CompareRow>

              {/* Links */}
              <CompareRow label="View Profile" highlight>
                {selected.map((s) => (
                  <td key={s.slug} className="px-4 py-2.5">
                    <Link href={`/schools/${s.slug}`} className="text-primary hover:underline text-sm font-medium">
                      Full Profile →
                    </Link>
                  </td>
                ))}
              </CompareRow>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Helper for alternating row backgrounds
function CompareRow({ label, children, highlight }: { label: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <tr className={`border-t ${highlight ? "bg-muted/10" : ""}`}>
      <td className="px-4 py-2.5 font-medium text-muted-foreground sticky left-0 bg-background border-r">
        {label}
      </td>
      {children}
    </tr>
  );
}
