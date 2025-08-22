import mongoose from 'mongoose'


const applicationSchema = new mongoose.Schema({
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true},
    monthly_income: {type: Number, required: true, trim: true},
    monthly_income: {type: Number, required: true, trim: true},
    employment_type: {type: String, required: true, trim: true},
    categoty: {type: Number, required: true, trim: true},
})