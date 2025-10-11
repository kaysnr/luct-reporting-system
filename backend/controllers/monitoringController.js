// backend/controllers/monitoringController.js
const pool = require("../db");

// Get all monitoring entries
exports.getAllMonitoring = (req, res) => {
  const query = "SELECT * FROM monitoring";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching monitoring entries:", err);
      return res.status(500).json({ error: "Failed to fetch monitoring data" });
    }
    res.json(results);
  });
};

// Get monitoring by ID
exports.getMonitoringById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM monitoring WHERE monitoring_id = ?";
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching monitoring entry:", err);
      return res.status(500).json({ error: "Failed to fetch monitoring entry" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Monitoring entry not found" });
    }
    res.json(results[0]);
  });
};

// Get monitoring dashboard data for a specific lecturer
exports.getMonitoringByLecturer = (req, res) => {
  const { lecturerId } = req.params;

  const query = `
    SELECT 
      lr.report_id,
      lr.week_of_reporting,
      lr.date_of_lecture,
      lr.class_id,
      lr.topic_taught,
      lr.learning_outcome,
      lr.lecturer_recommenndations,
      lr.number_of_students_present,
      lr.total_number_of_students_registered,
      c.class_name,
      c.course_id,
      c.venue,
      c.class_time,
      m.comments AS feedback
    FROM lecturer_reports lr
    INNER JOIN classes c ON lr.class_id = c.class_id
    LEFT JOIN monitoring m ON lr.report_id = m.report_id
    WHERE c.lecturer_id = ?
    ORDER BY lr.date_of_lecture DESC
  `;

  pool.query(query, [lecturerId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching lecturer monitoring data:", err);
      return res.status(500).json({ error: "Failed to load monitoring dashboard" });
    }

    const totalReports = results.length;
    const totalPresent = results.reduce((sum, r) => sum + (r.number_of_students_present || 0), 0);
    const totalRegistered = results.reduce((sum, r) => sum + (r.total_number_of_students_registered || 0), 0);
    const avgAttendanceRate = totalRegistered > 0 
      ? Math.round((totalPresent / totalRegistered) * 100) 
      : 0;

    const uniqueCourses = [...new Set(results.map(r => r.course_id))].length;

    res.json({
      stats: {
        lecturesDelivered: totalReports,
        avgAttendance: `${avgAttendanceRate}%`,
        courses: uniqueCourses,
      },
      reports: results.map(row => ({
        reportId: row.report_id,
        week: row.week_of_reporting,
        date: row.date_of_lecture,
        topic: row.topic_taught,
        outcome: row.learning_outcome,
        recommendations: row.lecturer_recommenndations,
        attendance: {
          present: row.number_of_students_present,
          registered: row.total_number_of_students_registered,
          rate: row.total_number_of_students_registered > 0
            ? Math.round((row.number_of_students_present / row.total_number_of_students_registered) * 100)
            : 0
        },
        class: {
          name: row.class_name,
          courseId: row.course_id,
          venue: row.venue,
          schedule: row.class_time
        },
        feedback: row.feedback || "No feedback yet"
      }))
    });
  });
};

// Get all reports with monitoring feedback (for Principal)
exports.getAllReportsWithMonitoring = (req, res) => {
  const query = `
    SELECT 
      lr.report_id,
      lr.week_of_reporting,
      lr.date_of_lecture,
      lr.topic_taught,
      lr.learning_outcome,
      lr.lecturer_recommenndations,
      lr.number_of_students_present,
      lr.total_number_of_students_registered,
      c.class_name,
      c.course_id,
      c.venue,
      c.class_time,
      c.lecturer_id,
      m.comments AS feedback,
      m.monitoring_id
    FROM lecturer_reports lr
    INNER JOIN classes c ON lr.class_id = c.class_id
    LEFT JOIN monitoring m ON lr.report_id = m.report_id
    ORDER BY lr.date_of_lecture DESC
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching all reports with monitoring:", err);
      return res.status(500).json({ error: "Failed to load reports" });
    }

    const reports = results.map(row => ({
      id: row.report_id,
      lecturer: `Lecturer ID: ${row.lecturer_id}`,
      lecturerId: row.lecturer_id,
      course: row.class_name,
      courseCode: row.course_id,
      date: row.date_of_lecture,
      week: row.week_of_reporting,
      topic: row.topic_taught,
      outcomes: row.learning_outcome,
      recommendations: row.lecturer_recommenndations,
      actualPresent: row.number_of_students_present,
      totalRegistered: row.total_number_of_students_registered,
      venue: row.venue,
      scheduledTime: row.class_time,
      submittedAt: row.date_of_lecture,
      hasFeedback: !!row.feedback,
      feedback: row.feedback || "",
      monitoringId: row.monitoring_id
    }));

    res.json(reports);
  });
};

// Create new monitoring entry
exports.createMonitoring = (req, res) => {
  const { user_id, report_id, comments } = req.body;

  if (user_id == null || report_id == null) {
    return res.status(400).json({
      error: "user_id and report_id are required"
    });
  }

  const query = "INSERT INTO monitoring (user_id, report_id, comments) VALUES (?, ?, ?)";

  pool.query(query, [user_id, report_id, comments || ""], (err, result) => {
    if (err) {
      console.error("❌ Error creating monitoring entry:", err);
      return res.status(500).json({ error: "Failed to create monitoring entry" });
    }
    res.status(201).json({
      message: "Feedback submitted successfully",
      monitoringId: result.insertId,
    });
  });
};

// Update monitoring entry by ID
exports.updateMonitoring = (req, res) => {
  const { id } = req.params;
  const { user_id, report_id, comments } = req.body;

  const query = "UPDATE monitoring SET user_id = ?, report_id = ?, comments = ? WHERE monitoring_id = ?";

  pool.query(query, [user_id, report_id, comments, id], (err, result) => {
    if (err) {
      console.error("❌ Error updating monitoring entry:", err);
      return res.status(500).json({ error: "Failed to update monitoring entry" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Monitoring entry not found" });
    }
    res.json({ message: "Monitoring entry updated successfully" });
  });
};

// Delete monitoring entry by ID
exports.deleteMonitoring = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM monitoring WHERE monitoring_id = ?";
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting monitoring entry:", err);
      return res.status(500).json({ error: "Failed to delete monitoring entry" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Monitoring entry not found" });
    }
    res.json({ message: "Monitoring entry deleted successfully" });
  });
};