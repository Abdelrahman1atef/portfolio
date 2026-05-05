import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  preview: string;
  tags: string[];
  coverImage: string;
  publishDate: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
    preview: { type: String, default: "" },
    tags: [{ type: String }],
    coverImage: { type: String, default: "" },
    publishDate: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
