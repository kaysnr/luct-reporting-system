// backend/routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// GET all reports
router.get("/", reportController.getAllReports);

// GET single report by ID
router.get("/:id", reportController.getReportById);

// POST create new report
router.post("/", reportController.createReport);

// PUT update report
router.put("/:id", reportController.updateReport);

// DELETE report
router.delete("/:id", reportController.deleteReport);

module.exports = router;