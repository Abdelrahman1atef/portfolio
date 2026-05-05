"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { AdminGuard } from "./AdminGuard";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className={cn(
          "transition-all duration-300 min-h-screen pt-4 pb-12 px-4 sm:px-6 lg:px-8",
          collapsed ? "pl-24" : "pl-72"
        )}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </AdminGuard>
  );
}
