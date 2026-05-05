"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiGrid, FiLayout, FiTool, FiUser, FiEdit3, 
  FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX, FiCheckCircle
} from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Overview", icon: FiGrid, href: "/admin" },
  { label: "Projects", icon: FiLayout, href: "/admin/projects" },
  { label: "Skills", icon: FiTool, href: "/admin/skills" },
  { label: "About", icon: FiUser, href: "/admin/about" },
  { label: "Blog", icon: FiEdit3, href: "/admin/blog" },
  { label: "Testimonials", icon: FiCheckCircle, href: "/admin/testimonials" },
  { label: "Messages", icon: FiMessageSquare, href: "/admin/messages" },
  { label: "Settings", icon: FiSettings, href: "/admin/settings" },
];

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (c: boolean) => void }) {
  const pathname = usePathname();
  const logout = useAuthStore((state: any) => state.logout);

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          {!collapsed && <span className="font-bold text-xl text-violet-600">Admin Panel</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg">
            {collapsed ? <FiMenu size={20} /> : <FiX size={20} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-colors group",
                pathname === item.href 
                  ? "bg-violet-600 text-white" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              )}
            >
              <item.icon size={20} className={cn("shrink-0", pathname === item.href ? "text-white" : "group-hover:text-violet-600")} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <ThemeToggle className="w-full justify-start" />
          <button 
            onClick={logout}
            className={cn(
              "flex items-center gap-4 p-3 w-full rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            )}
          >
            <FiLogOut size={20} className="shrink-0" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
