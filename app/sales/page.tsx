"use client";

import { AppShell } from "@/components/AppShell";
import { PerformanceChart } from "@/components/PerformanceChart";
import { fmcgVelocity, salesByCategory } from "@/data/mock";

export default function SalesPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Sales & FMCG Pulse</h1>
          <p className="mt-2 text-sm text-slate-500">
            Align promotional cadence, demand shaping, and predictive replenishment.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <article className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Velocity Trend</h2>
                <p className="text-sm text-slate-500">
                  FMCG unit throughput aligned with daypart demand and micro-promotions.
                </p>
              </div>
            </div>
            <div className="card-body">
              <PerformanceChart data={fmcgVelocity} color="#6366f1" label="Units sold" />
            </div>
          </article>
          <article className="card">
            <div className="card-header">
              <h2 className="card-title">Attach Rate Initiatives</h2>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                2.5x breakfast bundle uplift
              </span>
            </div>
            <div className="card-body space-y-3 text-sm text-slate-600">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="font-semibold text-slate-700">Localized breakfast bundle</p>
                <p>Combining baked goods + premium coffee SKUs to lift AOV.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="font-semibold text-slate-700">Chiller-first merchandising</p>
                <p>Front-of-house planogram drives +18% iced beverage velocity.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="font-semibold text-slate-700">Predictive replenishment</p>
                <p>AI-led reorder windows now covering 36 stores and 48 SKUs.</p>
              </div>
            </div>
          </article>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Category Scoreboard</h2>
            <p className="text-sm text-slate-500">
              Margin mix and unit velocity to prioritize marketing spend.
            </p>
          </div>
          <div className="card-body overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["Category", "Units (7d)", "Gross Margin", "Priority Action"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salesByCategory.map((row) => (
                  <tr key={row.category} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{row.category}</td>
                    <td className="px-4 py-3 text-slate-600">{row.units.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{row.margin}%</td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.category === "Fresh Food"
                        ? "Expand prep-station coverage"
                        : row.category === "Beverages"
                        ? "Secure seasonal vendor rebates"
                        : row.category === "Snacks"
                        ? "Cross-link with beverage offers"
                        : "Launch essentials subscription"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
