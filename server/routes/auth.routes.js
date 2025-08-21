import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import isAdmin from '../middlewares/isAdmin.js'
import { registerUser, loginUser, logoutUser, getMe, getUsers, updateUser } from '../controllers/auth.controller.js'



const router = express.Router()



router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("logout", logoutUser)



router.get("/me", verifyToken, isAdmin, getMe)
router.get("/users", getUsers)
router.put("/users/:id", updateUser)

export default router
