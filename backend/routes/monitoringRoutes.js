// backend/routes/monitoringRoutes.js
const express = require("express");
const router = express.Router();
const monitoringController = require("../controllers/monitoringController");

// ✅ NEW: Get all reports with monitoring feedback (for Principal)
router.get("/reports/all", monitoringController.getAllReportsWithMonitoring);

// Get monitoring dashboard data for a specific lecturer
router.get("/lecturer/:lecturerId", monitoringController.getMonitoringByLecturer);

// GET all monitoring entries
router.get("/", monitoringController.getAllMonitoring);

// GET single monitoring entry by ID
router.get("/:id", monitoringController.getMonitoringById);

// POST create new monitoring entry
router.post("/", monitoringController.createMonitoring);

// PUT update monitoring entry
router.put("/:id", monitoringController.updateMonitoring);

// DELETE monitoring entry
router.delete("/:id", monitoringController.deleteMonitoring);

module.exports = router;