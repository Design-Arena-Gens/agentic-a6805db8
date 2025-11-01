"use client";

import { AppShell } from "@/components/AppShell";
import { PerformanceChart } from "@/components/PerformanceChart";
import { purchaseOrders } from "@/data/mock";
import { useMemo, useState } from "react";

const statusFilters = ["All", "Inbound", "Confirmed", "Delivered", "Delayed"];

export default function OrdersPage() {
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return purchaseOrders.filter((order) => status === "All" || order.status === status);
  }, [status]);

  const timeline = purchaseOrders.map((order, index) => ({
    name: `W${index + 1}`,
    value: order.fillRate
  }));

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Purchase Orchestration</h1>
          <p className="mt-2 text-sm text-slate-500">
            Track supplier confirmations, inbound fill rate, and working capital commitments.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <article className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Fill Rate Stability</h2>
                <p className="text-sm text-slate-500">
                  Week over week service level alignment across priority vendors.
                </p>
              </div>
            </div>
            <div className="card-body">
              <PerformanceChart data={timeline} color="#0ea5e9" label="Fill rate %" />
            </div>
          </article>
          <article className="card">
            <div className="card-header">
              <h2 className="card-title">Status Filters</h2>
              <p className="text-sm text-slate-500">Segment purchase order pipeline by risk level.</p>
            </div>
            <div className="card-body flex flex-wrap gap-3">
              {statusFilters.map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => setStatus(statusOption)}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                    statusOption === status
                      ? "border-primary-400 bg-primary-50 text-primary-600"
                      : "border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600"
                  }`}
                >
                  {statusOption}
                </button>
              ))}
            </div>
          </article>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Active Purchase Orders</h2>
            <span className="text-sm font-medium text-slate-500">
              {filtered.length} of {purchaseOrders.length} results
            </span>
          </div>
          <div className="card-body overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["PO #", "Supplier", "ETA", "Status", "Value", "Fill Rate"].map((header) => (
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
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-primary-600">{order.id}</td>
                    <td className="px-4 py-3 text-slate-600">{order.supplier}</td>
                    <td className="px-4 py-3 text-slate-600">{order.eta}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          order.status === "Delayed"
                            ? "bg-rose-100 text-rose-600"
                            : order.status === "Inbound"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "Confirmed"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">${order.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{order.fillRate}%</td>
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
