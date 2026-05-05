import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;
let connectionPromise: Promise<void> | null = null;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      console.log("=> Connecting to MongoDB...");
      const conn = await mongoose.connect(env.mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      isConnected = !!conn.connections[0].readyState;
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      connectionPromise = null; // Allow retry on next request
      throw error;
    }
  })();

  return connectionPromise;
};
