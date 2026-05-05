import mongoose, { Schema, Document } from "mongoose";

export interface ISkillItem {
  name: string;
  level: number;
  icon?: string;
}

export interface ISkill extends Document {
  category: string;
  skills: ISkillItem[];
  order: number;
}

const skillItemSchema = new Schema<ISkillItem>(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String, default: "" },
  },
  { _id: false }
);

const skillSchema = new Schema<ISkill>(
  {
    category: { type: String, required: true },
    skills: [skillItemSchema],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = mongoose.model<ISkill>("Skill", skillSchema);
