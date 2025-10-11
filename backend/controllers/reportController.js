// backend/controllers/reportController.js
const pool = require("../db");

// Get all reports
exports.getAllReports = (req, res) => {
  const query = "SELECT * FROM lecturer_reports";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching reports:", err);
      return res.status(500).json({ error: "Failed to fetch reports" });
    }
    res.json(results);
  });
};

// Get single report by ID
exports.getReportById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM lecturer_reports WHERE report_id = ?";
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching report:", err);
      return res.status(500).json({ error: "Failed to fetch report" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(results[0]);
  });
};

// Create a new report
exports.createReport = (req, res) => {
  const {
    week_of_reporting,
    date_of_lecture,
    class_id,
    topic_taught,
    learning_outcome,
    lecturer_recommendations, // ← This is the JS variable name (from frontend)
    number_of_students_present,
    total_number_of_students_registered,
  } = req.body;

  // ✅ Use EXACT column name: `lecturer_recommenndations` (with double "n")
  const query =
    "INSERT INTO lecturer_reports (week_of_reporting, date_of_lecture, class_id, topic_taught, learning_outcome, lecturer_recommenndations, number_of_students_present, total_number_of_students_registered) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  pool.query(
    query,
    [
      week_of_reporting,
      date_of_lecture,
      class_id,
      topic_taught,
      learning_outcome,
      lecturer_recommendations, // ← Value from request body
      number_of_students_present,
      total_number_of_students_registered,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error creating report:", err);
        return res.status(500).json({ error: "Failed to create report" });
      }
      res.status(201).json({
        message: "Report created successfully",
        reportId: result.insertId,
      });
    }
  );
};

// Update report by ID
exports.updateReport = (req, res) => {
  const { id } = req.params;
  const {
    week_of_reporting,
    date_of_lecture,
    class_id,
    topic_taught,
    learning_outcome,
    lecturer_recommendations,
    number_of_students_present,
    total_number_of_students_registered,
  } = req.body;

  // ✅ Column name must match DB: `lecturer_recommenndations`
  const query =
    "UPDATE lecturer_reports SET week_of_reporting = ?, date_of_lecture = ?, class_id = ?, topic_taught = ?, learning_outcome = ?, lecturer_recommenndations = ?, number_of_students_present = ?, total_number_of_students_registered = ? WHERE report_id = ?";

  pool.query(
    query,
    [
      week_of_reporting,
      date_of_lecture,
      class_id,
      topic_taught,
      learning_outcome,
      lecturer_recommendations,
      number_of_students_present,
      total_number_of_students_registered,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error updating report:", err);
        return res.status(500).json({ error: "Failed to update report" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Report not found" });
      }
      res.json({ message: "Report updated successfully" });
    }
  );
};

// Delete report by ID
exports.deleteReport = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM lecturer_reports WHERE report_id = ?";
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting report:", err);
      return res.status(500).json({ error: "Failed to delete report" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({ message: "Report deleted successfully" });
  });
};