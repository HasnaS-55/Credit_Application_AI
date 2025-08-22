import express from 'express'
import verifyToken from '..middlewares/verifyToken.js'
import isAdmin from '../middlewares/isAdmin.js'
import { registerClient, loginClient, logoutClient, getClient, updateClient } from '../controllers/clients.controller.js'


const router = express.Router()


router.post("/register", registerClient)
router.post("/login", loginClient)
router.post("/logout", logoutClient)
router.put("/id", updateClient)

router.get("/me", verifyToken, getClient)


export default router