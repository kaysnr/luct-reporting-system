// src/components/Classes.jsx
import React, { useState, useEffect } from "react";
import "../style/LecturerPortal.css"; // Reuse your existing CSS

function Classes({ lecturerId }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lecturerId) {
      setError("Lecturer ID is missing");
      setLoading(false);
      return;
    }

    const fetchClasses = async () => {
      try {
        // Fetch all classes and filter by lecturer_id on frontend
        // OR: better — have backend support filtering (see note below)
        const response = await fetch(`http://localhost:5000/api/classes`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }

        const data = await response.json();
        
        // Filter classes assigned to this lecturer
        const assignedClasses = data.filter(cls => cls.lecturer_id === lecturerId);
        setClasses(assignedClasses);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("❌ Unable to load classes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [lecturerId]);

  if (loading) {
    return (
      <div className="dashboard-card">
        <h2>📚 Assigned Classes</h2>
        <p>Loading your classes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-card">
        <h2>📚 Assigned Classes</h2>
        <div className="status-message error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h2 className="report-title">📚 Assigned Classes</h2>

      {classes.length === 0 ? (
        <p className="no-classes">You have no assigned classes at the moment.</p>
      ) : (
        classes.map((cls) => (
          <div key={cls.class_id} className="class-item">
            <h3>
              {cls.class_name} ({cls.course_id})
            </h3>
            <div className="class-details">
              <div className="class-detail">
                <strong>Schedule</strong>
                <span>{cls.class_time || "Not set"}</span>
              </div>
              <div className="class-detail">
                <strong>Venue</strong>
                <span>{cls.venue || "—"} </span>
              </div>
              <div className="class-detail">
                <strong>Students</strong>
                <span>— / — registered</span>
                {/* ⚠️ Note: Your `classes` table doesn't store student counts.
                     You may need to join with reports or another table later. */}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Classes;