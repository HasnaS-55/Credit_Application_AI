import jwt from "jsonwebtoken"
import "dotenv/config"

export default function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized No token" })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.email) {
      return res.status(401).json({ message: "Not authorized, invalid token structure" })
    }

    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Not authorized, token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
    res.status(500).json({ message: "Internal server error during authentication" });
  }
  
}
