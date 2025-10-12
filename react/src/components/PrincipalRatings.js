// src/components/PrincipalLecturerRatings.jsx
import React, { useState, useEffect } from "react";
import "../style/LecturerPortal.css";

function PrincipalRatings({ principalLecturerId }) {
  const [classes, setClasses] = useState([]);
  const [classRatings, setClassRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all classes (with lecturer info)
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Get classes + join with users/lecturers if needed
        const res = await fetch("http://localhost:5000/api/classes");
        if (!res.ok) throw new Error("Failed to load classes");
        const data = await res.json();
        setClasses(data);

        // Initialize ratings state
        const initialRatings = {};
        data.forEach(cls => {
          initialRatings[cls.class_id] = "";
        });
        setClassRatings(initialRatings);
      } catch (err) {
        console.error("Error:", err);
        setMessage("❌ Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleClassRating = (classId, rating) => {
    setClassRatings(prev => ({ ...prev, [classId]: rating }));
  };

  const handleSubmitAllRatings = async () => {
    setSubmitting(true);
    setMessage("");

    try {
      // Submit only rated classes
      const promises = Object.entries(classRatings)
        .filter(([classId, rating]) => rating)
        .map(([classId, rating]) => {
          const payload = {
            user_id: principalLecturerId, // the rater
            class_id: parseInt(classId),
            rating_value: parseFloat(rating),
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
      setClassRatings(resetRatings);
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("❌ Failed to submit ratings");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="dashboard-card"><p>Loading classes...</p></div>;
  }

  return (
    <div className="dashboard-card">
      <h2 className="report-title">⭐ Performance Ratings</h2>
      <p className="subtitle">Rate lecturer performance and class engagement</p>

      {/* Rate Classes (which represent lecturers) */}
      <div className="rating-section">
        <h3>📚 Rate Class & Lecturer Performance</h3>
        <div className="rating-cards">
          {classes.map(cls => (
            <div key={cls.class_id} className="rating-card">
              <div className="rating-header">
                <h4>{cls.class_name} ({cls.course_id})</h4>
                <div className="class-stats">
                  <span className="students-count">
                    Lecturer ID: {cls.lecturer_id}
                  </span>
                </div>
              </div>
              <p className="rating-code">Venue: {cls.venue}</p>
              <p className="lectures-delivered">Schedule: {cls.class_time}</p>

              <div className="rating-scale">
                <span className="scale-label">Poor</span>
                <div className="rating-options">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      className={`rating-option ${classRatings[cls.class_id] === rating ? 'selected' : ''}`}
                      onClick={() => handleClassRating(cls.class_id, rating)}
                      disabled={submitting}
                      aria-label={`Rate ${cls.class_name} ${rating} stars`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                <span className="scale-label">Outstanding</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-ratings-section">
        {message && (
          <div className={`status-message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </div>
        )}
        <button
          className="submit-ratings-btn"
          onClick={handleSubmitAllRatings}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit All Ratings"}
        </button>
        <p className="submit-note">
          Your ratings will help improve teaching quality and student outcomes
        </p>
      </div>
    </div>
  );
}

export default PrincipalRatings;