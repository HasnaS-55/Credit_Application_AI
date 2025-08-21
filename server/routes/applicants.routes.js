import express from 'express'

const router = express.Router()

router.post("/", createApplicant)
router.get("/", verifytoken, isAdmin, getAllApplicants)
router.get("/:id", verifytoken, isAdmin, getApplicant)
router.put("/:id", verifytoken, isAdmin, updateApplicant)
router.delete("/id", verifytoken, isAdmin, deleteApplicant)

export default router