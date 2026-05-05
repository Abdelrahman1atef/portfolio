"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { RichTextEditor } from "@/components/admin/ui/RichTextEditor";
import { FiSave } from "react-icons/fi";

interface BlogFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function BlogForm({ initialData, onSubmit, isLoading }: BlogFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: initialData || {
      title: "",
      slug: "",
      preview: "",
      content: "",
      coverImage: "",
      tags: [],
      isPublished: false,
    },
  });

  const content = watch("content");
  const coverImage = watch("coverImage");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Post Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input
            {...register("slug", { required: true })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Image</label>
        <ImageUpload 
          value={coverImage} 
          onChange={(url) => setValue("coverImage", url)} 
          folder="blog" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Short Preview</label>
        <textarea
          {...register("preview", { required: true })}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <RichTextEditor 
          value={content} 
          onChange={(val) => setValue("content", val)} 
        />
      </div>

      <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
        <FiSave size={20} />
        {isLoading ? "Saving..." : "Save Post"}
      </Button>
    </form>
  );
}
