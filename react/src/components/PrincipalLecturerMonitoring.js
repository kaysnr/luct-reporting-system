// src/components/PrincipalLecturerReports.jsx
import React, { useState, useEffect } from "react";
import "../style/LecturerPortal.css";

function PrincipalLecturerReports({ principalLecturerId }) {
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [expandedReports, setExpandedReports] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch real reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/monitoring/reports/all");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setReports(data);

        // Initialize feedback state
        const initialFeedback = {};
        data.forEach(report => {
          initialFeedback[report.id] = "";
        });
        setFeedback(initialFeedback);
      } catch (err) {
        console.error("Failed to load reports:", err);
        setMessage("❌ Unable to load lecture reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const toggleExpand = (reportId) => {
    setExpandedReports(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reportId)) {
        newSet.delete(reportId);
      } else {
        newSet.add(reportId);
      }
      return newSet;
    });
  };

  const handleFeedbackChange = (reportId, value) => {
    setFeedback(prev => ({ ...prev, [reportId]: value }));
  };

  const handleSubmitFeedback = async (reportId) => {
    const comment = feedback[reportId]?.trim();
    if (!comment) return;

    setSubmitting(true);
    setMessage("");

    try {
      const payload = {
        user_id: principalLecturerId,
        report_id: reportId,
        comments: comment
      };

      const response = await fetch("http://localhost:5000/api/monitoring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      // Optimistically update UI
      setReports(prev =>
        prev.map(report =>
          report.id === reportId
            ? { ...report, hasFeedback: true, feedback: comment }
            : report
        )
      );
      setFeedback(prev => ({ ...prev, [reportId]: "" }));
      setMessage("✅ Feedback submitted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Feedback submission error:", err);
      setMessage("❌ Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getAttendanceStatus = (present, total) => {
    if (!total) return { text: "N/A", color: "#64748b" };
    const percentage = (present / total) * 100;
    if (percentage >= 85) return { text: "Excellent", color: "#4caf50" };
    if (percentage >= 70) return { text: "Good", color: "#8bc34a" };
    if (percentage >= 50) return { text: "Fair", color: "#ff9800" };
    return { text: "Poor", color: "#f44336" };
  };

  if (loading) {
    return (
      <div className="dashboard-card">
        <h2 className="report-title">📝 Lecture Reports</h2>
        <p>Loading reports...</p>
      </div>
    );
  }

  const pendingFeedbackCount = reports.filter(r => !r.hasFeedback).length;
  const thisWeekCount = reports.filter(r => {
    const reportDate = new Date(r.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return reportDate >= weekAgo;
  }).length;

  return (
    <div className="dashboard-card">
      <h2 className="report-title">📝 Lecture Reports</h2>
      <p className="subtitle">
        Review reports submitted by lecturers and provide constructive feedback
      </p>
      
      {message && (
        <div className={`status-message ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="reports-summary">
        <div className="summary-item">
          <span className="summary-label">Total Reports</span>
          <span className="summary-value">{reports.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Pending Feedback</span>
          <span className="summary-value">{pendingFeedbackCount}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">This Week</span>
          <span className="summary-value">{thisWeekCount}</span>
        </div>
      </div>

      {reports.length === 0 ? (
        <p className="no-classes">No lecture reports found.</p>
      ) : (
        reports.map(report => {
          const attendanceStatus = getAttendanceStatus(report.actualPresent, report.totalRegistered);
          const isExpanded = expandedReports.has(report.id);
          
          return (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <div className="report-info">
                  <h3 className="report-course">
                    {report.course} ({report.courseCode})
                  </h3>
                  <div className="report-meta">
                    <span className="lecturer-name">by {report.lecturer}</span>
                    <span className="report-date">• {report.date} ({report.week})</span>
                  </div>
                </div>
                
                <div className="report-actions">
                  <div className="attendance-badge" style={{ backgroundColor: attendanceStatus.color }}>
                    {report.actualPresent}/{report.totalRegistered} present
                    <span className="attendance-status">({attendanceStatus.text})</span>
                  </div>
                  <button 
                    className="expand-btn"
                    onClick={() => toggleExpand(report.id)}
                    aria-label={isExpanded ? "Collapse report" : "Expand report"}
                    disabled={submitting}
                  >
                    {isExpanded ? '▲' : '▼'}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="report-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Topic Taught</span>
                      <span className="detail-value">{report.topic}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Venue & Time</span>
                      <span className="detail-value">{report.venue}, {report.scheduledTime}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Submitted</span>
                      <span className="detail-value">
                        {new Date(report.submittedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Learning Outcomes</h4>
                    <p className="outcomes-text">{report.outcomes}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Recommendations</h4>
                    <p className="recommendations-text">{report.recommendations}</p>
                  </div>
                </div>
              )}

              <div className="feedback-section">
                {report.hasFeedback && (
                  <div className="existing-feedback">
                    <h4>Your Previous Feedback</h4>
                    <div className="feedback-content">
                      <p>"{report.feedback}"</p>
                      <div className="feedback-meta">
                        <span className="feedback-date">
                          Submitted on {new Date(report.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="new-feedback">
                  <h4>{report.hasFeedback ? "Add Additional Feedback" : "Provide Feedback to Lecturer"}</h4>
                  <textarea
                    className="feedback-textarea"
                    value={feedback[report.id] || ""}
                    onChange={(e) => handleFeedbackChange(report.id, e.target.value)}
                    placeholder="Share your constructive feedback..."
                    rows="3"
                    disabled={submitting}
                  />
                  <button 
                    className="submit-feedback-btn"
                    onClick={() => handleSubmitFeedback(report.id)}
                    disabled={!feedback[report.id]?.trim() || submitting}
                  >
                    {submitting ? "Submitting..." : 
                      report.hasFeedback ? "Submit Additional Feedback" : "Submit Feedback"}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PrincipalLecturerReports;