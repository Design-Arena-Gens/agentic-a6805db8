"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: { name: string; value: number }[];
  color?: string;
  label?: string;
};

export function PerformanceChart({ data, color = "#1769aa", label = "value" }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ strokeDasharray: "4 4" }}
          contentStyle={{
            borderRadius: "0.75rem",
            border: "1px solid #cbd5f5",
            boxShadow: "0 15px 40px rgba(15, 23, 42, 0.08)"
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#chartColor)"
          name={label}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
