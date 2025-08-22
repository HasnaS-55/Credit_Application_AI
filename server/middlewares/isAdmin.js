import { Admin } from "../models/admins.model.js";

export default async function isAdmin(req, res, next) {
  try {
    const { id: userId } = req.user;
    const admin  = await Admin.findById(userId);
    if (!admin ) {
      return res
        .status(403)
        .json({ message: "Access denied. User not found." });
    }
    
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error during authorization check." });
  }
}
