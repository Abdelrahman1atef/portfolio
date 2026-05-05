"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { FiSave, FiPlus, FiTrash2 } from "react-icons/fi";

interface SkillFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function SkillForm({ initialData, onSubmit, isLoading }: SkillFormProps) {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      category: "",
      order: 0,
      skills: [{ name: "", level: 80 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category Name</label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="e.g. Frontend"
          />
          {errors.category && <p className="text-red-500 text-xs">{errors.category.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Display Order</label>
          <input
            type="number"
            {...register("order")}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Skills List</label>
          <button
            type="button"
            onClick={() => append({ name: "", level: 80 })}
            className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 font-medium"
          >
            <FiPlus /> Add Skill
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 group">
              <input
                {...register(`skills.${index}.name` as const, { required: true })}
                className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Skill name"
              />
              <div className="w-24">
                <input
                  type="number"
                  {...register(`skills.${index}.level` as const, { valueAsNumber: true })}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="%"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-3 text-slate-400 hover:text-red-500 transition-colors"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
        <FiSave size={20} />
        {isLoading ? "Saving..." : "Save Skills Category"}
      </Button>
    </form>
  );
}
