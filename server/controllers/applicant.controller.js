import { Applicant } from "../models/applicants.model"
import 'dotenv/config'
import { Client } from "../models/clients.model"
import axios from 'axios'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'




export const createApplicant = async (req, res) => {
    try {
        const { monthly_income, employment_type, categoty, employment_duration, requested_amount, duration, credit_history, existing_debt, porpose, motivation } = req.body
        const {id: id} = req.user
        const applicant = await Applicant.create({
            clientId: id,
            monthly_income, employment_type, categoty, employment_duration, requested_amount, duration, credit_history, existing_debt, porpose, motivation
        })

        const aiResponse = await axios.post(`${process.env.AI_API_URL}/api/evaluate-credit`, 
        {
            monthly_income: applicant.monthly_income, 
            employment_type: applicant.employment_type, 
            categoty: applicant.categoty, 
            employment_duration: applicant.employment_duration, 
            requested_amount: applicant.requested_amount, 
            duration: applicant.duration, 
            credit_history: applicant.credit_history, 
            existing_debt: applicant.existing_debt, 
            porpose: applicant.porpose, 
            motivation: applicant.motivation
        })

        const data = aiResponse.data

        const fullApplicantData = await Applicant.findByIdAndUpdate(applicant._id, {
            $set:{
            monthly_income: data.monthly_income, 
            employment_type: data.employment_type, 
            categoty: data.categoty, 
            employment_duration: data.employment_duration, 
            requested_amount: data.requested_amount, 
            duration: data.duration, 
            credit_history: data.credit_history, 
            existing_debt: data.existing_debt, 
            porpose: data.porpose, 
            motivation: data.motivation
            }},
            {new: true, runValidators: true}
        ).loan()

        res.status(200).json({ message: "Application created successfully", application: fullApplicantData})


    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const getAllApplicants = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 9
        const page = Number(req.query.page) || 1
        const search = req.query.search || null
        const status = req.query.status || null;
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null


        let query = {}
        let applicantsIds = []


        if (search) {
            applicantsIds = await Client.find({
                $or: {
                    { firstName : }
                }
            })
        }
        const allApplicants = await Applicant.find().lean()
        if (!allApplicants) {
            res.status()
        }
    } catch (err) {
        
    }
}