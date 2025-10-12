import React from "react";
import "../style/StudentDashboard.css"; // Import the CSS file

function StudentDashboard({ student, onLogout }) {
  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
        <div className="student-info">
          <span className="welcome-text">Welcome, {student.firstName}!</span>
          <span className="student-badge">
            {student.course} • {student.faculty}
          </span>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Attendance */}
        <section className="dashboard-section">
          <h2>Attendance Records</h2>
          <div className="attendance-list">
            {[
              { date: "2025-09-20", lecture: "React Hooks", status: "Present" },
              { date: "2025-09-22", lecture: "State Management", status: "Absent" },
              { date: "2025-09-25", lecture: "Routing", status: "Present" },
            ].map((record, index) => (
              <div key={index} className="attendance-item">
                <div>
                  <strong>{record.lecture}</strong>
                  <div>{record.date}</div>
                </div>
                <span
                  className={`status-badge ${
                    record.status === "Present" ? "present" : "absent"
                  }`}
                >
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Lecture Reports */}
        <section className="dashboard-section">
          <h2>Lecture Reports</h2>
          {[
            {
              id: 1,
              title: "Advanced React Patterns",
              date: "2025-09-25",
              outcomes: "Learned custom hooks and context API",
              recommendations: "Review useEffect cleanup patterns",
            },
          ].map((report) => (
            <div key={report.id} className="report-card">
              <h3>{report.title}</h3>
              <p><strong>Date:</strong> {report.date}</p>
              <p><strong>Outcomes:</strong> {report.outcomes}</p>
              <p><strong>Recommendations:</strong> {report.recommendations}</p>
            </div>
          ))}
        </section>

        {/* Class Progress */}
        <section className="dashboard-section">
          <h2>Class Progress</h2>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "75%" }}></div>
            </div>
            <span className="progress-label">75% Complete</span>
          </div>

          <div className="topics-list">
            <h4>Topics Covered:</h4>
            <ul>
              <li>React Fundamentals</li>
              <li>Component Lifecycle</li>
              <li>State Management</li>
              <li>Routing</li>
            </ul>
          </div>
        </section>

        {/* Ratings */}
        <section className="dashboard-section">
          <h2>Rate Your Experience</h2>
          <form className="feedback-form">
            <div>
              <h3>Lecture Rating</h3>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= 4 ? "filled" : ""}>
                    
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3>Lecturer Performance</h3>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= 5 ? "filled" : ""}>
                    
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3>Course Experience</h3>
              <textarea placeholder="Share your thoughts..." rows="3" />
            </div>

            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </form>
        </section>
      </main>

      <footer className="dashboard-footer">
        <button onClick={onLogout} className="logout-btn">
          ← Back to Home
        </button>
      </footer>
    </div>
  );
}

export default StudentDashboard;
