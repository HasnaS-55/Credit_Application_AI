import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectDB } from "./db/db-connection.js";
import applicationsRoutes from "./routes/applicants.routes.js";
import adminsRoutes from "./routes/admins.routes.js";
import statsRoutes from "./routes/stats.routes.js";

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Content-Type-Options"],
};

app.use(cors(corsOptions));

//security Middlewares
app.use((req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next()
})

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("api/admins", adminsRoutes)
app.use("api/clients", clientsRoutes)
app.use("api/applicants", applicationsRoutes)
app.use("api/stats", statsRoutes)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})