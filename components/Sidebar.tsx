"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartPieIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  DocumentChartBarIcon,
  ShoppingCartIcon,
  TruckIcon,
  UsersIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const navigation = [
  { name: "Overview", href: "/", icon: ChartPieIcon },
  { name: "Inventory", href: "/inventory", icon: CubeIcon },
  { name: "Purchase Orders", href: "/orders", icon: ClipboardDocumentListIcon },
  { name: "Suppliers", href: "/suppliers", icon: UsersIcon },
  { name: "Logistics", href: "/logistics", icon: TruckIcon },
  { name: "Sales & FMCG", href: "/sales", icon: ShoppingCartIcon },
  { name: "Reports", href: "/reports", icon: DocumentChartBarIcon }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-72 bg-white border-r border-slate-200 min-h-screen">
      <div className="h-20 px-8 flex items-center border-b border-slate-200">
        <div>
          <p className="text-xl font-semibold text-primary-600">PulseMart ERP</p>
          <p className="text-sm text-slate-500">Convenience Supply Command Center</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition",
                active
                  ? "bg-primary-50 text-primary-700 border border-primary-100"
                  : "text-slate-600 hover:text-primary-700 hover:bg-primary-50/60"
              )}
            >
              <Icon className={clsx("h-5 w-5", active ? "text-primary-600" : "text-slate-400")} />
              {name}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-5 border-t border-slate-200">
        <div className="p-4 bg-primary-50 rounded-xl">
          <p className="text-sm font-semibold text-primary-700">Inventory Health</p>
          <p className="text-xs text-primary-500 mt-1 leading-5">
            Monitor real-time freshness windows and spoilage risk by zone to keep margins under
            control.
          </p>
        </div>
      </div>
    </aside>
  );
}
