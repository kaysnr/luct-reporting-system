// src/components/Reports.jsx
import React, { useState } from "react";
import "../style/LecturerPortal.css";

function Reports({ lecturerId }) {
  const [reportData, setReportData] = useState({
    week_of_reporting: "",
    date_of_lecture: "",
    class_id: "",
    topic_taught: "",
    learning_outcome: "",
    lecturer_recommendations: "", // 👈 This will be sent as-is to backend
    number_of_students_present: "",
    total_number_of_students_registered: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation
    if (
      !reportData.week_of_reporting ||
      !reportData.date_of_lecture ||
      !reportData.class_id ||
      !reportData.topic_taught
    ) {
      setMessage("❌ Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Payload matches what your backend expects
    const payload = {
      week_of_reporting: reportData.week_of_reporting,
      date_of_lecture: reportData.date_of_lecture,
      class_id: reportData.class_id,
      topic_taught: reportData.topic_taught,
      learning_outcome: reportData.learning_outcome,
      lecturer_recommendations: reportData.lecturer_recommendations, // ✅ Sent as "lecturer_recommendations"
      number_of_students_present: Number(reportData.number_of_students_present),
      total_number_of_students_registered: Number(reportData.total_number_of_students_registered),
    };

    try {
      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setMessage("✅ Report submitted successfully!");
      setReportData({
        week_of_reporting: "",
        date_of_lecture: "",
        class_id: "",
        topic_taught: "",
        learning_outcome: "",
        lecturer_recommendations: "",
        number_of_students_present: "",
        total_number_of_students_registered: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="report-title">📝 Lecture Report Form</h2>

      {message && (
        <div className={`status-message ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-group">
          <label>Week of Reporting *</label>
          <input
            type="week"
            name="week_of_reporting"
            value={reportData.week_of_reporting}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Lecture *</label>
          <input
            type="date"
            name="date_of_lecture"
            value={reportData.date_of_lecture}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Class ID *</label>
          <input
            type="text"
            name="class_id"
            value={reportData.class_id}
            onChange={handleChange}
            required
            placeholder="e.g., CS301, ENG205"
          />
        </div>

        <div className="form-group">
          <label>Topic Taught *</label>
          <textarea
            name="topic_taught"
            value={reportData.topic_taught}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Describe the main topic covered"
          />
        </div>

        <div className="form-group">
          <label>Learning Outcome</label>
          <textarea
            name="learning_outcome"
            value={reportData.learning_outcome}
            onChange={handleChange}
            rows="3"
            placeholder="What should students have learned?"
          />
        </div>

        <div className="form-group">
          <label>Lecturer Recommendations</label>
          <textarea
            name="lecturer_recommendations"
            value={reportData.lecturer_recommendations}
            onChange={handleChange}
            rows="3"
            placeholder="Suggestions, concerns, or follow-up actions"
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Students Present *</label>
            <input
              type="number"
              name="number_of_students_present"
              value={reportData.number_of_students_present}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="form-group half">
            <label>Total Registered *</label>
            <input
              type="number"
              name="total_number_of_students_registered"
              value={reportData.total_number_of_students_registered}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}

export default Reports;