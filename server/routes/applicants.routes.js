import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import isAdmin from '../middlewares/isAdmin'

const router = express.Router()

router.post("/", createApplicant)
router.get("/", verifytoken, isAdmin, getAllApplicants)
router.get("/:id", verifytoken, isAdmin, getApplicant)
router.put("/:id", verifytoken, isAdmin, updateApplicant)


export default router