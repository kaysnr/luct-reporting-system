// backend/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Route imports
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const classesRoutes = require("./routes/classesRoutes");
const monitoringRoutes = require("./routes/monitoringRoutes");
const ratingsRoutes = require("./routes/ratingsRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const facultiesRoutes = require("./routes/facultiesRoutes");

const app = express();

// =======================
// ✅ Middleware
// =======================
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Only if you need form data

// =======================
// ✅ Routes
// =======================
app.use("/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/faculties", facultiesRoutes);

// =======================
// ✅ Root Route
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 LUCT Reporting API is running successfully!",
  });
});

// =======================
// ✅ 404 Fallback
// =======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// =======================
// ✅ Global Error Handler
// =======================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// =======================
// ✅ Server Start
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;