import mongoose, { Schema, Document } from "mongoose";

export interface ISetting extends Document {
  name: string;
  email: string;
  phone: string;
  socialLinks: {
    github: string;
    linkedin: string;
    whatsapp: string;
  };
  cvFile: string;
  themePreference: string;
}

const settingSchema = new Schema<ISetting>(
  {
    name: { type: String, default: "Abdelrahman Atef" },
    email: { type: String, default: "Abdelrahmanatef3221@gmail.com" },
    phone: { type: String, default: "+20 102 232 2742" },
    socialLinks: {
      github: { type: String, default: "https://github.com/Abdelrahman1atef" },
      linkedin: { type: String, default: "https://linkedin.com/in/abdelrahman-atef-b1a59b24a" },
      whatsapp: { type: String, default: "https://wa.me/201022322742" },
    },
    cvFile: { type: String, default: "" },
    themePreference: { type: String, default: "dark" },
  },
  { timestamps: true }
);

export const Setting = mongoose.model<ISetting>("Setting", settingSchema);
