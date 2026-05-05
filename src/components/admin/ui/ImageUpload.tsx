"use client";

import { useState, useRef } from "react";
import { FiUploadCloud, FiX, FiImage } from "react-icons/fi";
import { api } from "@/lib/api";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, folder = "general", className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const response = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(response.data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {value ? (
        <div className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-violet-500 transition-all cursor-pointer group"
        >
          <div className="p-4 rounded-full bg-white dark:bg-slate-950 shadow-sm group-hover:scale-110 transition-transform">
            <FiUploadCloud size={32} className="text-violet-600" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
            {uploading ? "Uploading..." : "Click to upload image"}
          </p>
          <p className="mt-1 text-xs text-slate-400">PNG, JPG or WebP up to 10MB</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
