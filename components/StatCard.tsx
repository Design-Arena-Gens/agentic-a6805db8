"use client";

import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  trend?: {
    label: string;
    value: string;
    direction: "up" | "down" | "neutral";
  };
  icon?: ReactNode;
  accent?: "primary" | "accent" | "default";
};

export function StatCard({ label, value, trend, icon, accent = "default" }: Props) {
  return (
    <article
      className={clsx(
        "card relative overflow-hidden",
        accent === "primary" && "bg-gradient-to-br from-primary-600 to-primary-500 text-white",
        accent === "accent" && "bg-gradient-to-br from-accent to-orange-400 text-white"
      )}
    >
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={clsx(
                "text-sm font-medium",
                accent === "default" ? "text-slate-500" : "text-white/80"
              )}
            >
              {label}
            </p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </div>
          {icon ? (
            <div
              className={clsx(
                "h-14 w-14 rounded-2xl flex items-center justify-center",
                accent === "default"
                  ? "bg-primary-50 text-primary-600"
                  : "bg-white/15 text-white"
              )}
            >
              {icon}
            </div>
          ) : null}
        </div>
        {trend ? (
          <div
            className={clsx(
              "mt-4 inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full",
              accent === "default"
                ? "bg-slate-100 text-slate-600"
                : "bg-white/15 text-white/90"
            )}
          >
            <span
              className={clsx(
                "inline-flex h-2.5 w-2.5 rounded-full",
                trend.direction === "up" && "bg-emerald-400",
                trend.direction === "down" && "bg-rose-400",
                trend.direction === "neutral" && "bg-slate-300"
              )}
            />
            <span>{trend.label}</span>
            <span>{trend.value}</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
