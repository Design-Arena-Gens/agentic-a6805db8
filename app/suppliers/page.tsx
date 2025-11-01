"use client";

import { AppShell } from "@/components/AppShell";
import { supplierScorecards } from "@/data/mock";
import { useMemo, useState } from "react";

const categories = ["All", "Fresh Food", "Beverages", "Snacks"];

export default function SuppliersPage() {
  const [category, setCategory] = useState("All");
  const [threshold, setThreshold] = useState(90);

  const filtered = useMemo(() => {
    return supplierScorecards.filter((supplier) => {
      const categoryMatch = category === "All" || supplier.category === category;
      const fillRateMatch = supplier.fillRate >= threshold;
      return categoryMatch && fillRateMatch;
    });
  }, [category, threshold]);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Supplier Performance</h1>
          <p className="mt-2 text-sm text-slate-500">
            End-to-end vendor insight with fill rate, punctuality, and escalation notes.
          </p>
        </div>
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Scorecards</h2>
              <p className="text-sm text-slate-500">
                Quickly isolate partners impacting freshness SLAs or availability.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-500">
                Fill rate ≥{" "}
                <input
                  type="number"
                  className="ml-1 w-20 rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-600 focus:border-primary-400 focus:outline-none"
                  value={threshold}
                  onChange={(event) => setThreshold(Number(event.target.value))}
                />
              </label>
              <select
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:border-primary-400 focus:outline-none"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-body grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((supplier) => (
              <div key={supplier.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-primary-600">{supplier.name}</p>
                <p className="text-xs text-slate-500 mt-1 uppercase">{supplier.category}</p>
                <dl className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <dt>Fill Rate</dt>
                    <dd className="font-semibold text-emerald-600">{supplier.fillRate}%</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>On-Time</dt>
                    <dd className="font-semibold text-primary-600">{supplier.onTime}%</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Lead Time</dt>
                    <dd className="font-medium">{supplier.leadTime}</dd>
                  </div>
                </dl>
                <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500 leading-5">
                  <span className="font-semibold text-slate-600">Escalations:</span>{" "}
                  {supplier.escalation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
