import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db";
import { env } from "../config/env";

// Models
import { User } from "../models/User";
import { Project } from "../models/Project";
import { Skill } from "../models/Skill";
import { Blog } from "../models/Blog";
import { Testimonial } from "../models/Testimonial";
import { About } from "../models/About";
import { Setting } from "../models/Setting";

const seed = async () => {
  try {
    await connectDB();

    console.log("🧹 Clearing existing data...");
    await User.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Blog.deleteMany({});
    await Testimonial.deleteMany({});
    await About.deleteMany({});
    await Setting.deleteMany({});

    console.log("👤 Seeding admin user...");
    const hashedPassword = await bcrypt.hash(env.admin.password, 12);
    await User.create({
      name: "Admin",
      email: env.admin.email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("🖼️ Seeding singleton docs (About & Settings)...");
    await About.create({
      bio: "I didn't choose Flutter randomly—it came after exploring different technologies and realizing I enjoy building complete products, not just writing code.",
      profileImage: "/images/me.jpg",
      title: "Flutter Developer building scalable, high-quality mobile apps",
      subtitle: "Focused on clean architecture, performance, and user experience.",
      stats: [
        { value: "1+", label: "Years Experience" },
        { value: "5+", label: "Projects Completed" },
        { value: "100%", label: "Commitment" },
        { value: "∞", label: "Lines of Code" },
      ],
    });

    await Setting.create({});

    // Import existing data (hardcoded here for simplicity in the seed script)
    console.log("🚀 Seeding projects...");
    const projectsData = [
      {
        slug: "abher",
        title: "Abher",
        shortDescription: "Boat booking platform for trips and marine events.",
        description: "A comprehensive platform for booking boats, marine trips, and sea events.",
        features: ["Dual application support", "Real-time booking", "Multi-environment setup"],
        techStack: ["Flutter", "Dart", "Cubit", "Dio", "Google Maps", "Firebase"],
        image: "/images/abher.png",
        liveUrl: "https://play.google.com/store/apps/details?id=com.masader.Abhr",
        category: "Mobile App",
        order: 1,
      },
      // ... adding other projects briefly for seeding
    ];
    await Project.insertMany(projectsData);

    console.log("✅ Seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
