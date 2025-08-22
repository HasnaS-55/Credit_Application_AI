import mongoose from 'mongoose'


const applicationSchema = new mongoose.Schema({
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: ""}
})