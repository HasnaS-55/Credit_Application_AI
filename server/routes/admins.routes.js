import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import isAdmin from '../middlewares/isAdmin.js'
import { registerAdmin, loginAdmin, logoutAdmin, getAdmin, updateAdmin } from '../controllers/admin.controller.js'
import { updateAdmin } from '../controllers/admin.controller.js'



const router = express.Router()



router.post("/register", registerAdmin)
router.post("/login", loginAdmin)
router.post("logout", logoutAdmin)




router.get("/me", verifyToken, isAdmin, getAdmin)
router.put("/:id", updateAdmin)


export default router
