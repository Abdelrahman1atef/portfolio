"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { FiSave } from "react-icons/fi";

interface TestimonialFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function TestimonialForm({ initialData, onSubmit, isLoading }: TestimonialFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: "",
      role: "",
      company: "",
      content: "",
      image: "",
      order: 0,
    },
  });

  const image = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-medium">Avatar Image</label>
        <ImageUpload 
          value={image} 
          onChange={(url) => setValue("image", url)} 
          folder="testimonials" 
          className="max-w-[200px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Author Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Role / Position</label>
          <input
            {...register("role")}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="e.g. CEO, Developer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Company</label>
        <input
          {...register("company")}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Testimonial Content</label>
        <textarea
          {...register("content", { required: true })}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Order</label>
        <input
          type="number"
          {...register("order")}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
        <FiSave size={20} />
        {isLoading ? "Saving..." : "Save Testimonial"}
      </Button>
    </form>
  );
}
