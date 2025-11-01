"use client";

import { AppShell } from "@/components/AppShell";
import { reportSections } from "@/data/mock";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";

const reportTypes = [
  {
    id: "daily",
    title: "Daily Store Pulse",
    description: "Inventory freshness, inbound exceptions, and sell-through snapshot."
  },
  {
    id: "weekly",
    title: "Weekly Executive Brief",
    description: "Top-line KPIs and supplier actions for leadership teams."
  },
  {
    id: "custom",
    title: "Custom Scenario",
    description: "Choose sections to tailor for stakeholder requirements."
  }
];

const kpiTable = [
  ["On-hand value", "$482,550", "+6.4% vs LW"],
  ["FMCG sell-through", "12,480 units", "+14% fresh food"],
  ["Supplier fill rate", "96.2%", "+1.2 pts"],
  ["Spoilage exposure", "$5,420", "-11%"]
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState(reportTypes[1]);
  const [selectedSections, setSelectedSections] = useState(() =>
    reportSections.map((section) => section.title)
  );

  const handleGenerateReport = () => {
    const document = new jsPDF({ unit: "pt", format: "a4" });
    document.setFont("Helvetica", "bold");
    document.setFontSize(20);
    document.text("PulseMart Convenience ERP", 40, 70);

    document.setFontSize(14);
    document.setTextColor(23, 105, 170);
    document.text(`${selectedType.title}`, 40, 95);

    document.setFont("Helvetica", "normal");
    document.setTextColor(51, 65, 85);
    document.setFontSize(11);
    document.text(`Generated: ${new Date().toLocaleString()}`, 40, 120);

    document.setDrawColor(226, 232, 240);
    document.line(40, 130, 555, 130);

    autoTable(document, {
      head: [["Metric", "Value", "Notes"]],
      body: kpiTable,
      startY: 150,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [23, 105, 170] }
    });

    const tableY = document.lastAutoTable?.finalY ?? 180;
    let cursorY = tableY + 30;

    selectedSections.forEach((title) => {
      const section = reportSections.find((item) => item.title === title);
      if (!section) return;

      document.setFont("Helvetica", "bold");
      document.setFontSize(13);
      document.setTextColor(30, 41, 59);
      document.text(section.title, 40, cursorY);
      cursorY += 16;

      document.setFont("Helvetica", "normal");
      document.setFontSize(11);
      section.bullets.forEach((bullet) => {
        const lines = document.splitTextToSize(`• ${bullet}`, 500);
        document.text(lines, 60, cursorY);
        cursorY += lines.length * 14;
      });
      cursorY += 8;
    });

    document.setDrawColor(226, 232, 240);
    document.line(40, cursorY + 10, 555, cursorY + 10);
    document.setFontSize(10);
    document.setTextColor(100);
    document.text("Prepared by: Store Operations Control Tower", 40, cursorY + 28);

    document.save(`PulseMart-${selectedType.id}-report.pdf`);
  };

  const toggleSection = (title: string) => {
    setSelectedSections((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Reports & Document Builder</h1>
          <p className="mt-2 text-sm text-slate-500">
            Generate stakeholder-ready documents with curated KPIs and executive summaries.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`text-left rounded-2xl border px-5 py-4 shadow-sm transition ${
                selectedType.id === type.id
                  ? "border-primary-400 bg-primary-50/40"
                  : "border-slate-200 bg-white hover:border-primary-200"
              }`}
            >
              <p className="text-sm font-semibold text-primary-700">{type.title}</p>
              <p className="mt-2 text-xs text-slate-500 leading-5">{type.description}</p>
            </button>
          ))}
        </div>
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Document Blueprint</h2>
              <p className="text-sm text-slate-500">
                Select insights to include in the generated PDF document.
              </p>
            </div>
            <button
              onClick={handleGenerateReport}
              className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition"
            >
              Generate PDF Report
            </button>
          </div>
          <div className="card-body grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reportSections.map((section) => {
              const selected = selectedSections.includes(section.title);
              return (
                <label
                  key={section.title}
                  className={`relative rounded-2xl border px-4 py-4 shadow-sm cursor-pointer transition ${
                    selected
                      ? "border-primary-400 bg-primary-50/60"
                      : "border-slate-200 bg-white hover:border-primary-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleSection(section.title)}
                    className="absolute right-4 top-4 h-5 w-5 accent-primary-600"
                  />
                  <p className="text-sm font-semibold text-slate-700 pr-8">{section.title}</p>
                  <ul className="mt-3 text-xs text-slate-500 leading-5 space-y-1 list-disc list-inside">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </label>
              );
            })}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
