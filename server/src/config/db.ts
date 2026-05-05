import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(env.mongoUri);
    isConnected = !!conn.connections[0].readyState;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // Don't exit process in serverless
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
    throw error;
  }
};
