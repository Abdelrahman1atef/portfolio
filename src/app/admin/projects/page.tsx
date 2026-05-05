"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { DataTable } from "@/components/admin/ui/DataTable";
import { Modal } from "@/components/admin/ui/Modal";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import { Button } from "@/components/ui/Button";
import { FiPlus, FiImage } from "react-icons/fi";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  techStack: string[];
  image: string;
  shortDescription: string;
  description: string;
  isPublished: boolean;
}

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      if (selectedProject) {
        await api.put(`/projects/${selectedProject._id}`, data);
        toast.success("Project updated successfully");
      } else {
        await api.post("/projects", data);
        toast.success("Project created successfully");
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

    try {
      await api.delete(`/projects/${project._id}`);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const columns = [
    { 
      header: "Project", 
      accessor: (item: Project) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
            {item.image ? (
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            ) : (
              <FiImage className="absolute inset-0 m-auto text-slate-400" />
            )}
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{item.title}</div>
            <div className="text-xs text-slate-500">{item.category}</div>
          </div>
        </div>
      ) 
    },
    { 
      header: "Status", 
      accessor: (item: Project) => (
        <span className={cn(
          "px-2 py-1 rounded-md text-xs font-bold",
          item.isPublished ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        )}>
          {item.isPublished ? "Published" : "Draft"}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Projects</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Add, edit or remove projects from your portfolio.</p>
        </div>
        <Button size="lg" className="gap-2" onClick={handleAdd}>
          <FiPlus size={20} />
          New Project
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-950 p-2 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
        <DataTable 
          columns={columns} 
          data={projects} 
          isLoading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProject ? "Edit Project" : "Add New Project"}
      >
        <ProjectForm 
          initialData={selectedProject} 
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </Modal>
    </div>
  );
}
