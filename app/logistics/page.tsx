"use client";

import { AppShell } from "@/components/AppShell";
import { PerformanceChart } from "@/components/PerformanceChart";
import { logisticsTimeline } from "@/data/mock";

const routeVelocity = [
  { name: "05:00", value: 42 },
  { name: "07:00", value: 58 },
  { name: "09:00", value: 64 },
  { name: "11:00", value: 52 },
  { name: "13:00", value: 60 },
  { name: "15:00", value: 66 },
  { name: "17:00", value: 70 }
];

export default function LogisticsPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Logistics Control</h1>
          <p className="mt-2 text-sm text-slate-500">
            Synchronize inbound inventory with last-mile dispatch and vendor returns.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          <article className="card xl:col-span-2">
            <div className="card-header">
              <div>
                <h2 className="card-title">Route Velocity</h2>
                <p className="text-sm text-slate-500">
                  Pallets cleared through dock vs. schedule to spot congestion ahead.
                </p>
              </div>
            </div>
            <div className="card-body">
              <PerformanceChart data={routeVelocity} color="#f97316" label="Pallets/hour" />
            </div>
          </article>
          <article className="card">
            <div className="card-header">
              <h2 className="card-title">Exception Summary</h2>
              <span className="text-xs font-semibold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                2 attention items
              </span>
            </div>
            <div className="card-body space-y-3 text-sm text-slate-600">
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                <p className="font-semibold text-rose-600">SnackWorks Intl</p>
                <p>Port congestion causing 14h delay. Temporary re-route approved.</p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                <p className="font-semibold text-amber-600">Vendor Returns</p>
                <p>Awaiting pickup for perishable reversal &mdash; escalate to carrier.</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                <p className="font-semibold text-emerald-600">On-Time Dispatch</p>
                <p>99.1% of store drops executed as scheduled in past 24h.</p>
              </div>
            </div>
          </article>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Live Shipment Watchlist</h2>
            <p className="text-sm text-slate-500">Drill into upcoming milestones that require action.</p>
          </div>
          <div className="card-body grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {logisticsTimeline.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-primary-600">{entry.type}</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{entry.milestone}</p>
                <p className="text-xs text-slate-500 mt-1">{entry.location}</p>
                <p className="text-sm text-primary-600 font-semibold mt-3">{entry.eta}</p>
                <span
                  className={`mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    entry.status === "On Track"
                      ? "bg-emerald-100 text-emerald-600"
                      : entry.status === "Delay"
                      ? "bg-rose-100 text-rose-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
