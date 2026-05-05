import express from "express";
import cors from "cors";
import serverless from "serverless-http";
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

// Middleware
app.use(cors());
app.use(express.json());

// Add a middleware to connect to DB
app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

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

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = env.port;
  app.listen(PORT, () => {
    console.log(`🚀 Server running in port ${PORT}`);
  });
}

// Export for Netlify Functions
export const handler = serverless(app);

// Export for Vercel
export default app;
