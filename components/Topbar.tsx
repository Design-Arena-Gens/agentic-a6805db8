"use client";

import { MagnifyingGlassIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="flex items-center gap-4 px-6 py-4">
        <div className="relative flex-1 max-w-xl">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find products, purchase orders, suppliers, or documents..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-600 hover:border-primary-300 hover:text-primary-700 transition bg-white shadow-sm"
          >
            {theme === "dark" ? (
              <>
                <SunIcon className="h-5 w-5" /> Light
              </>
            ) : (
              <>
                <MoonIcon className="h-5 w-5" /> Dark
              </>
            )}
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2 bg-white shadow-sm">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
              CS
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Store Control</p>
              <p className="text-xs text-slate-500">Operations Lead</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
