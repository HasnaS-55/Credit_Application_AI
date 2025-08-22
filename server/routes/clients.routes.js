import express from 'express'
import verifyToken from '..middlewares/verifyToken.js'
import isAdmin from '../middlewares/isAdmin.js'


const router = express.Router()


router.post("/register", registerClient)
router.post("/login", loginClient)
router.post("/logout", logoutClient)


router.get("/me", verifyToken, getClient)
router.get("/", verifyToken, isAdmin, getClients)

export default router