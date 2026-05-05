"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { DataTable } from "@/components/admin/ui/DataTable";
import { Modal } from "@/components/admin/ui/Modal";
import { TestimonialForm } from "@/components/admin/forms/TestimonialForm";
import { Button } from "@/components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import Image from "next/image";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  order: number;
}

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get("/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      if (selectedTestimonial) {
        await api.put(`/testimonials/${selectedTestimonial._id}`, data);
        toast.success("Testimonial updated");
      } else {
        await api.post("/testimonials", data);
        toast.success("Testimonial added");
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { 
      header: "Author", 
      accessor: (item: Testimonial) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900">
            {item.image ? (
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-400">
                {item.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
            <div className="text-xs text-slate-500">{item.role} @ {item.company}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Content", 
      accessor: (item: Testimonial) => (
        <p className="line-clamp-2 text-xs max-w-md">{item.content}</p>
      )
    },
    { header: "Order", accessor: "order" as keyof Testimonial },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Testimonials</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">What clients say about your work.</p>
        </div>
        <Button size="lg" className="gap-2" onClick={() => { setSelectedTestimonial(null); setIsModalOpen(true); }}>
          <FiPlus size={20} />
          New Testimonial
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-950 p-2 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
        <DataTable 
          columns={columns} 
          data={testimonials} 
          isLoading={loading}
          onEdit={(item) => { setSelectedTestimonial(item); setIsModalOpen(true); }}
          onDelete={async (item) => {
            if (!confirm("Delete this testimonial?")) return;
            await api.delete(`/testimonials/${item._id}`);
            toast.success("Deleted successfully");
            fetchTestimonials();
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTestimonial ? "Edit Testimonial" : "Add Testimonial"}
      >
        <TestimonialForm 
          initialData={selectedTestimonial} 
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </Modal>
    </div>
  );
}
