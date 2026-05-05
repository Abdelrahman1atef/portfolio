"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { DataTable } from "@/components/admin/ui/DataTable";
import { Modal } from "@/components/admin/ui/Modal";
import { SkillForm } from "@/components/admin/forms/SkillForm";
import { Button } from "@/components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

interface SkillCategory {
  _id: string;
  category: string;
  skills: { name: string; level: number }[];
  order: number;
}

export default function SkillsManagementPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      if (selectedCategory) {
        await api.put(`/skills/${selectedCategory._id}`, data);
        toast.success("Category updated successfully");
      } else {
        await api.post("/skills", data);
        toast.success("Category created successfully");
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: SkillCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (category: SkillCategory) => {
    if (!confirm(`Delete category "${category.category}"?`)) return;
    try {
      await api.delete(`/skills/${category._id}`);
      toast.success("Category deleted");
      fetchSkills();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const columns = [
    { header: "Category", accessor: "category" as keyof SkillCategory },
    { 
      header: "Skills Count", 
      accessor: (item: SkillCategory) => item.skills.length 
    },
    { 
      header: "Skills Preview", 
      accessor: (item: SkillCategory) => item.skills.map(s => s.name).slice(0, 5).join(", ") + (item.skills.length > 5 ? "..." : "")
    },
    { header: "Order", accessor: "order" as keyof SkillCategory },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Skills</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Group and organize your technical expertise.</p>
        </div>
        <Button size="lg" className="gap-2" onClick={handleAdd}>
          <FiPlus size={20} />
          New Category
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-950 p-2 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
        <DataTable 
          columns={columns} 
          data={categories} 
          isLoading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCategory ? "Edit Category" : "Add New Category"}
      >
        <SkillForm 
          initialData={selectedCategory} 
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </Modal>
    </div>
  );
}
