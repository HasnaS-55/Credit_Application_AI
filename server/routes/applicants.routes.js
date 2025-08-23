import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import isAdmin from '../middlewares/isAdmin'

const router = express.Router()

router.post("/", verifyToken, createApplicant)
router.get("/", verifyToken, isAdmin, getAllApplicants)
router.get("/:id", verifyToken, isAdmin, getApplicant)



export default router