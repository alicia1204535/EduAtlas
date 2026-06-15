import type { School } from "@/lib/types";

interface SchoolFeesTableProps {
  school: School;
}

function formatSGD(n: number): string {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function SchoolFeesTable({ school }: SchoolFeesTableProps) {
  if (!school.fees || school.fees.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        School Fees ({school.feeRange.currency})
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Annual fees for academic year 2025/2026. Additional costs may include
        application fees, enrolment fees, uniforms, meals, and transport.
      </p>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 font-semibold">Grade Level</th>
              <th className="text-right px-4 py-3 font-semibold">Annual Fee</th>
              {school.fees[0]?.termFee && (
                <th className="text-right px-4 py-3 font-semibold">Per Term</th>
              )}
            </tr>
          </thead>
          <tbody>
            {school.fees.map((fee) => (
              <tr key={fee.grade} className="border-t hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2.5 font-medium">{fee.grade}</td>
                <td className="text-right px-4 py-2.5 tabular-nums">
                  {formatSGD(fee.annualFee)}
                </td>
                {fee.termFee != null && (
                  <td className="text-right px-4 py-2.5 text-muted-foreground tabular-nums">
                    {formatSGD(fee.termFee)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        * Fees are shown for reference only and may have changed. Always verify with
        the school&apos;s admissions office.
      </p>
    </section>
  );
}
