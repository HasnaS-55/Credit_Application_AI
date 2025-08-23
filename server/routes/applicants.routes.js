import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import isAdmin from '../middlewares/isAdmin.js'
import { createApplicant, getAllApplicants, getApplicant } from '../controllers/applicant.controller.js'

const router = express.Router()

router.post("/", verifyToken, createApplicant)
router.get("/", verifyToken, isAdmin, getAllApplicants)
router.get("/:id", verifyToken, isAdmin, getApplicant)



export default router