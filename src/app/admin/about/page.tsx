"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { toast } from "sonner";
import { FiSave } from "react-icons/fi";

export default function AboutManagementPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get("/about");
        reset(response.data);
      } catch (error) {
        toast.error("Failed to fetch about details");
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, [reset]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      await api.put("/about", data);
      toast.success("About details updated successfully");
    } catch (error) {
      toast.error("Failed to update details");
    } finally {
      setSubmitting(false);
    }
  };

  const profileImage = watch("profileImage");

  if (loading) return <div className="animate-pulse space-y-8">...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">About Me Editor</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Update your professional bio, title, and profile image.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Image</label>
            <ImageUpload 
              value={profileImage} 
              onChange={(url) => setValue("profileImage", url)} 
              folder="profile" 
              className="max-w-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Main Title</label>
              <input
                {...register("title")}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtitle</label>
              <input
                {...register("subtitle")}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Full Bio</label>
            <textarea
              {...register("bio")}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
              rows={8}
            />
          </div>

          <Button type="submit" size="lg" className="gap-2" disabled={submitting}>
            <FiSave size={20} />
            {submitting ? "Saving..." : "Update About Details"}
          </Button>
        </form>
      </div>
    </div>
  );
}
