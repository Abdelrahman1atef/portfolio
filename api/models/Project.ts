import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  techStack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  category: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    techStack: [{ type: String }],
    image: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    architecture: { type: String, default: "" },
    challenges: { type: String, default: "" },
    category: { type: String, default: "Mobile App" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
