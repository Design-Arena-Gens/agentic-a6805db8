"use client";

import { AppShell } from "@/components/AppShell";
import { PerformanceChart } from "@/components/PerformanceChart";
import { StatCard } from "@/components/StatCard";
import {
  inboundPerformance,
  kpiOverview,
  logisticsTimeline,
  freshnessBands
} from "@/data/mock";

const freshnessPalette = [
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500"
];

export default function OverviewPage() {
  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Operations Overview</h1>
          <p className="mt-2 text-sm text-slate-500">
            Real-time visibility into inventory turnover, supplier performance, and logistics pace
            across the convenience portfolio.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {kpiOverview.map((metric) => (
            <StatCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              trend={metric.trend}
              accent={metric.accent as any}
            />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          <article className="card xl:col-span-2">
            <div className="card-header">
              <div>
                <h2 className="card-title">Inbound Availability Index</h2>
                <p className="text-sm text-slate-500">
                  Tracking ready-to-shelf units synchronized with vendor routings.
                </p>
              </div>
            </div>
            <div className="card-body">
              <PerformanceChart data={inboundPerformance} color="#1769aa" label="Inbound readiness" />
            </div>
          </article>
          <article className="card">
            <div className="card-header">
              <h2 className="card-title">Freshness Compliance</h2>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                88% healthy inventory
              </span>
            </div>
            <div className="card-body space-y-4">
              {freshnessBands.map((band) => (
                <div key={band.zone}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700">{band.zone}</p>
                    <p className="text-sm text-slate-500">{band.healthy}% healthy</p>
                  </div>
                  <div className="mt-2 flex w-full overflow-hidden rounded-full bg-slate-100 h-3">
                    <div className="bg-emerald-500" style={{ width: `${band.healthy}%` }} />
                    <div className="bg-amber-400" style={{ width: `${band.risk}%` }} />
                    <div className="bg-rose-500" style={{ width: `${band.expired}%` }} />
                  </div>
                  <ul className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <li className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Healthy
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-400" /> Risk Window
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-rose-500" /> Expired
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>
        <article className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Logistics Control Tower</h2>
              <p className="text-sm text-slate-500">
                Upcoming supply events and exception handling across inbound and last-mile.
              </p>
            </div>
          </div>
          <div className="card-body grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {logisticsTimeline.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary-600">{event.id}</span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      event.status === "On Track"
                        ? "bg-emerald-100 text-emerald-700"
                        : event.status === "Delay"
                        ? "bg-rose-100 text-rose-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700">{event.milestone}</p>
                <p className="text-xs text-slate-500">{event.location}</p>
                <p className="text-sm text-primary-600 font-medium">{event.eta}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
