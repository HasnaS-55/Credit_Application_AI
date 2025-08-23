import { Applicant } from "../models/applicants.model.js";
import "dotenv/config";
import { Client } from "../models/clients.model.js";
import axios from "axios";


export const createApplicant = async (req, res) => {
  try {
    const {
      monthly_income,
      employment_type,
      category,
      employment_duration,
      requested_amount,
      duration,
      credit_history,
      existing_debts,
      purpose,
      motivation,
    } = req.body;
    const { id: id } = req.user;
    const applicant = await Applicant.create({
      clientId: id,
      monthly_income,
      employment_type,
      category,
      employment_duration,
      requested_amount,
      duration,
      credit_history,
      existing_debts,
      purpose,
      motivation,
    });

    const aiResponse = await axios.post(
      `${process.env.AI_API_URL}/api/evaluate-credit`,
      {
        monthly_income: applicant.monthly_income,
        employment_type: applicant.employment_type,
        category: applicant.category,
        employment_duration: applicant.employment_duration,
        requested_amount: applicant.requested_amount,
        duration: applicant.duration,
        credit_history: applicant.credit_history,
        existing_debts: applicant.existing_debts,
        purpose: applicant.purpose,
        motivation: applicant.motivation,
      }
    );

    const data = aiResponse.data;

    const fullApplicantData = await Applicant.findByIdAndUpdate(
      applicant._id,
      {
        $set: {
          confidence: data.confidence,
          decision: data.decision,
          positive_factors: data.positive_factors,
          reason: data.reason,
          risk_factors: data.risk_factors,
          is_scammer: data.is_scammer,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    res.status(201).json({
      message: "Application created successfully",
      application: fullApplicantData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllApplicants = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 9;
    const page = Number(req.query.page) || 1;
    const search = req.query.search || null;
    const status = req.query.status || null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;

    let query = {};
    let clientsIds = [];

    if (search) {
      clientsIds = await Client.find({
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      })
        .select("_id")
        .lean();

      if (clientsIds.length === 0) {
        return res.status(200).json({ message: "No applicant found" });
      }

      query.clientId = { $in: clientsIds.map((client) => client._id) };
    }

    if (status) {
      query.decision = status;
    }

    if (startDate && !endDate) {
      query.createdAt = { $gte: new Date(startDate) };
    }

    if (!startDate && endDate) {
      query.createdAt = { $lte: new Date(endDate) };
    }

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const totalApplicants = await Applicant.countDocuments(query);

    const allApplicants = await Applicant.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 })
      .populate("clientId")
      .lean();

    const totalPages = Math.ceil(totalApplicants / limit);
    const pagination = {
      page,
      limit,
      total: totalApplicants,
      totalPages: totalPages,
      prevPage: page > 1,
      nextPage: page < totalPages,
    };

    res.status(200).json({
      message: "Applicants fetched successefully",
      applicants: allApplicants,
      pagination,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findById(id).populate("clientId").lean();

    res.status(200).json({
      message: "Applicant fetched successfully",
      applicant: applicant,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
