import { User } from "../models/auth.models.js";

export default async function isAdmin(req, res, next) {
  try {
    const email = req.user;
    const { role } = await User.findOne(email, { role: 1 });
    if (!{ role }) {
      return res
        .status(403)
        .json({ message: "Access denied. User not found." });
    }
    if (role !== "admin") {
      return res.status(403).json({ message: "You are not Admin" });
    }
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error during authorization check." });
  }
}
