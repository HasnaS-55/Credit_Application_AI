import mongoose from "mongoose";

const adminShema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    cin: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", adminShema);
