"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { FiSave, FiX } from "react-icons/fi";

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function ProjectForm({ initialData, onSubmit, isLoading }: ProjectFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: "",
      slug: "",
      category: "Mobile App",
      shortDescription: "",
      description: "",
      techStack: [],
      features: [],
      image: "",
      liveUrl: "",
      githubUrl: "",
      problem: "",
      solution: "",
      architecture: "",
      challenges: "",
      isPublished: true,
      order: 0,
    },
  });

  const image = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="e.g. Abher"
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input
            {...register("slug", { required: "Slug is required" })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="e.g. abher-app"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Image</label>
        <ImageUpload 
          value={image} 
          onChange={(url) => setValue("image", url)} 
          folder="projects" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Short Description</label>
        <textarea
          {...register("shortDescription", { required: true })}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Full Description</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Live URL</label>
          <input
            {...register("liveUrl")}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub URL</label>
          <input
            {...register("githubUrl")}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Button type="submit" size="lg" className="flex-1 gap-2" disabled={isLoading}>
          <FiSave size={20} />
          {isLoading ? "Saving..." : "Save Project"}
        </Button>
      </div>
    </form>
  );
}
