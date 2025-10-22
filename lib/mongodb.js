import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  console.log("connecting to db");
  return mongoose.connect(process.env.MONGODB_URI);
}