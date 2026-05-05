import mongoose from "mongoose";

const uri = "mongodb+srv://abdelrahmanatef:Az192.168.1.1.@portfolio.umqrku3.mongodb.net/";

async function test() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connection successful!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err);
    process.exit(1);
  }
}

test();
