"use client";

import { AppShell } from "@/components/AppShell";
import { inventoryItems } from "@/data/mock";
import { useMemo, useState } from "react";

const categories = ["All", "Fresh Food", "Beverages", "Dry Goods", "General Merch"];
const riskLevels = ["All", "None", "Low", "Medium", "High"];

export default function InventoryPage() {
  const [category, setCategory] = useState("All");
  const [risk, setRisk] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesRisk = risk === "All" || item.spoilageRisk === risk;
      const matchesSearch =
        search.length === 0 ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesRisk && matchesSearch;
    });
  }, [category, risk, search]);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Inventory Control</h1>
          <p className="mt-2 text-sm text-slate-500">
            Balance on-hand availability with spoilage risk and replenishment lead times.
          </p>
        </div>
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">SKU Performance Matrix</h2>
              <p className="text-sm text-slate-500">
                Dynamic view of stock positions, reorder points, and turnover velocity.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Search SKU or product..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <select
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:border-primary-400 focus:outline-none"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:border-primary-400 focus:outline-none"
                value={risk}
                onChange={(event) => setRisk(event.target.value)}
              >
                {riskLevels.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-body overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "SKU",
                    "Product",
                    "Category",
                    "On-hand",
                    "Reorder Point",
                    "Lead Time",
                    "Turnover",
                    "Spoilage"
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">{item.sku}</td>
                    <td className="px-4 py-3 text-slate-600">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.category}</td>
                    <td className="px-4 py-3 text-slate-600">{item.stock.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{item.reorderPoint.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{item.leadTimeDays} days</td>
                    <td className="px-4 py-3 text-slate-600">{item.turnoverDays} days</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.spoilageRisk === "High"
                            ? "bg-rose-100 text-rose-600"
                            : item.spoilageRisk === "Medium"
                            ? "bg-amber-100 text-amber-600"
                            : item.spoilageRisk === "Low"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.spoilageRisk}
                      </span>
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
