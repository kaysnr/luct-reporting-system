// src/components/LecturerRatings.jsx
import React, { useState, useEffect } from "react";
import "../style/LecturerPortal.css";

function LecturerRatings({ lecturerId }) {
  const [classes, setClasses] = useState([]);
  const [ratings, setRatings] = useState({}); // { classId: ratingValue }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch lecturer's classes
  useEffect(() => {
    if (!lecturerId) return;

    const fetchClasses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/classes`);
        if (!res.ok) throw new Error("Failed to load classes");
        const data = await res.json();
        const assigned = data.filter(cls => cls.lecturer_id === lecturerId);
        setClasses(assigned);

        // Initialize ratings state
        const initialRatings = {};
        assigned.forEach(cls => {
          initialRatings[cls.class_id] = "";
        });
        setRatings(initialRatings);
      } catch (err) {
        console.error("Error:", err);
        setMessage("❌ Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [lecturerId]);

  const handleRatingChange = (classId, value) => {
    setRatings(prev => ({ ...prev, [classId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      // Submit rating for each class that has a rating
      const promises = classes
        .filter(cls => ratings[cls.class_id])
        .map(cls => {
          const payload = {
            user_id: lecturerId,
            class_id: cls.class_id,
            rating_value: parseFloat(ratings[cls.class_id]),
            // comments not included — table doesn't support it
          };

          return fetch("http://localhost:5000/api/ratings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        });

      if (promises.length === 0) {
        setMessage("⚠️ Please rate at least one class.");
        setSubmitting(false);
        return;
      }

      await Promise.all(promises);
      setMessage("✅ Ratings submitted successfully!");
      
      // Reset ratings
      const resetRatings = {};
      classes.forEach(cls => {
        resetRatings[cls.class_id] = "";
      });
      setRatings(resetRatings);
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("❌ Failed to submit ratings");
    } finally {
      setSubmitting(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/export?lecturerId=${lecturerId}`);
      if (!response.ok) throw new Error("Export failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lecture_reports_lecturer_${lecturerId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Export error:", err);
      alert("❌ Failed to export reports");
    }
  };

  if (loading) {
    return <div className="dashboard-card"><p>Loading your classes...</p></div>;
  }

  return (
    <div className="dashboard-card">
      <h2 className="report-title">⭐ Rate Class Performance</h2>

      {message && (
        <div className={`status-message ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {classes.map(cls => (
          <div key={cls.class_id} className="rating-class-card">
            <h3>{cls.class_name} ({cls.course_id})</h3>
            <div className="rating-options">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  className={`star-btn ${ratings[cls.class_id] >= star ? 'active' : ''}`}
                  onClick={() => handleRatingChange(cls.class_id, star)}
                  disabled={submitting}
                >
                  ★
                </button>
              ))}
              <span className="rating-label">
                {ratings[cls.class_id] === 1 && "Poor"}
                {ratings[cls.class_id] === 2 && "Fair"}
                {ratings[cls.class_id] === 3 && "Good"}
                {ratings[cls.class_id] === 4 && "Very Good"}
                {ratings[cls.class_id] === 5 && "Excellent"}
              </span>
            </div>
          </div>
        ))}

        {classes.length === 0 ? (
          <p className="no-classes">You have no assigned classes to rate.</p>
        ) : (
          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Ratings"}
          </button>
        )}
      </form>

      <div className="export-section">
        <h3 className="export-title">📥 Export Reports</h3>
        <button className="export-btn" onClick={handleExport}>
          📊 Export to Excel
        </button>
        <p className="export-desc">
          Download all your lecture reports in Excel format
        </p>
      </div>
    </div>
  );
}

export default LecturerRatings;