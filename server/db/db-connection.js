import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB", error);
  }
};
