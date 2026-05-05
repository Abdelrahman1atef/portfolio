"use client";

import { useEffect, useState } from "react";
import { FiLayout, FiEdit3, FiMessageSquare, FiTrendingUp } from "react-icons/fi";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, blogs, messages] = await Promise.all([
          api.get("/projects"),
          api.get("/blog"),
          api.get("/messages"),
        ]);

        setStats({
          projects: projects.data.length,
          blogs: blogs.data.length,
          messages: messages.data.length,
          unreadMessages: messages.data.filter((m: any) => !m.isRead).length,
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Projects", value: stats.projects, icon: FiLayout, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/10" },
    { label: "Total Posts", value: stats.blogs, icon: FiEdit3, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/10" },
    { label: "Total Messages", value: stats.messages, icon: FiMessageSquare, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/10" },
    { label: "Unread", value: stats.unreadMessages, icon: FiTrendingUp, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome to your portfolio control center.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {loading ? "..." : stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Messages</h3>
          <div className="text-center py-10 text-slate-500">
            <p>API connection pending...</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
             {/* Action buttons could go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add cn helper or import it if needed
import { cn } from "@/lib/utils";
