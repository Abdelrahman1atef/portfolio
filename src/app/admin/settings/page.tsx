"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { FiSave, FiGithub, FiLinkedin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("/settings");
        reset(response.data);
      } catch (error) {
        console.error("Failed to fetch settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      await api.put("/settings", data);
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-8">...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your contact info and social media links.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 max-w-4xl">
          {/* Personal Info */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <input
                  {...register("name")}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email</label>
                <input
                  {...register("email")}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><FiGithub /> GitHub URL</label>
                <input
                  {...register("socialLinks.github")}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><FiLinkedin /> LinkedIn URL</label>
                <input
                  {...register("socialLinks.linkedin")}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><FaWhatsapp /> WhatsApp URL</label>
                <input
                  {...register("socialLinks.whatsapp")}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </section>

          <Button type="submit" size="lg" className="gap-2" disabled={submitting}>
            <FiSave size={20} />
            {submitting ? "Saving Settings..." : "Save Settings"}
          </Button>
        </form>
      </div>
    </div>
  );
}
