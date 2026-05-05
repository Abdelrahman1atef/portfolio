import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  bio: string;
  profileImage: string;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
}

const aboutSchema = new Schema<IAbout>(
  {
    bio: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    stats: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

export const About = mongoose.model<IAbout>("About", aboutSchema);
