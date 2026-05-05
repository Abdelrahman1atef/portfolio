import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { env } from "./config/env";

// Routes
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects";
import skillRoutes from "./routes/skills";
import aboutRoutes from "./routes/about";
import blogRoutes from "./routes/blog";
import testimonialRoutes from "./routes/testimonials";
import messageRoutes from "./routes/messages";
import settingsRoutes from "./routes/settings";
import uploadRoutes from "./routes/upload";

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);

// Health Check
app.get("/", (_req, res) => {
  res.send("🚀 Portfolio API is running...");
});

// Start Server
const PORT = env.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running in port ${PORT}`);
});
