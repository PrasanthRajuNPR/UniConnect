require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./config/dbconnect");

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://uniconnect-frontend.vercel.app" 
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Student Portal API - Deployed on Vercel");
});

// Connect to MongoDB
dbConnect();

module.exports = app;
