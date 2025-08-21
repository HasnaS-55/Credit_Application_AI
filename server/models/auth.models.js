import mongoose from "mongoose"


const userShema = new mongoose.Schema({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true}, unique: true,
    password: {type: String, required: true, trim: true},
    role: {type: String, enum: ["admin", "user"], default: "user"},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
})

export const User = mongoose.model("User", userShema)