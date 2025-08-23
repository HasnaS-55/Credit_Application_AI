import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    monthly_income: { type: Number, required: true, trim: true },
    employment_type: { type: String, required: true, trim: true },
    categoty: { type: Number, required: true, enum: ["Smartphones", "TVs & Audio", "Laptops", "Home Appliances", "Gaming", "Other"]},
    employment_duration: { type: String, required: true },
    requested_amount: { type: Number, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    credit_history: { type: String, required: true },
    existing_debt: { type: String, required: true },
    porpose: { type: String, required: true },
    motivation: { type: String, required: true },
    confidence: { type: Number, default: 0 },
    decision: {type: String, enum: ["Approved", "Needs Manual Review", "Rejected", "Pending"], default: "Pending"},
    positive_factors: { type: [String], default: [] },
    reason: { type: String, default: "" },
    risk_factors: { type: [String], default: []},
    is_scammer: { type: Boolean, default: false },
  },
  { timestamps: true }
)


export const Applicant = mongoose.models("Applicant", applicationSchema)
 