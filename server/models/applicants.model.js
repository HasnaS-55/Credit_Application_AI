import mongoose from "mongoose"


const applicantSchema = new mongoose.Schema({
    nom: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    niveau: {type: String, required: true, trim: true, enum: []},
})