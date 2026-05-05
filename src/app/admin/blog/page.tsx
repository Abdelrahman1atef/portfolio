"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { DataTable } from "@/components/admin/ui/DataTable";
import { Modal } from "@/components/admin/ui/Modal";
import { BlogForm } from "@/components/admin/forms/BlogForm";
import { Button } from "@/components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  publishDate: string;
  isPublished: boolean;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/blog");
      setPosts(response.data);
    } catch (error) {
      toast.error("Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      if (selectedPost) {
        await api.put(`/blog/${selectedPost._id}`, data);
        toast.success("Blog post updated");
      } else {
        await api.post("/blog", data);
        toast.success("Blog post created");
      }
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { header: "Title", accessor: "title" as keyof BlogPost },
    { 
      header: "Date", 
      accessor: (item: BlogPost) => new Date(item.publishDate).toLocaleDateString() 
    },
    { 
      header: "Status", 
      accessor: (item: BlogPost) => (
        <span className={cn(
          "px-2 py-1 rounded-md text-xs font-bold",
          item.isPublished ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blog Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Write and publish articles on your portfolio.</p>
        </div>
        <Button size="lg" className="gap-2" onClick={() => { setSelectedPost(null); setIsModalOpen(true); }}>
          <FiPlus size={20} />
          New Post
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-950 p-2 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
        <DataTable 
          columns={columns} 
          data={posts} 
          isLoading={loading}
          onEdit={(item) => { setSelectedPost(item); setIsModalOpen(true); }}
          onDelete={async (item) => {
            if (!confirm("Delete this post?")) return;
            await api.delete(`/blog/${item._id}`);
            toast.success("Post deleted");
            fetchPosts();
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPost ? "Edit Post" : "Create Post"}
        className="max-w-4xl"
      >
        <BlogForm 
          initialData={selectedPost} 
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </Modal>
    </div>
  );
}
