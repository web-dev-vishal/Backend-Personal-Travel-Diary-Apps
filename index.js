import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import { fileURLToPath } from "url"

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

app.use(cookieParser())

// for allowing json object in req body
app.use(express.json())

// Server static files from the uploads and assets directory (MOVED BEFORE ROUTES)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/assets", express.static(path.join(__dirname, "assets")))

// Welcome route - should be at the top
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the backend server of the personal travel app</h1>");
});

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

// Error handling middleware (MUST BE LAST)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB ✅");
  })
  .catch((error) => {
    console.error("MongoDB connection error ❌", error);
  });

// Start server (MOVED TO END)
app.listen(3000, () => {
  console.log("Server is running on port 3000!")
})