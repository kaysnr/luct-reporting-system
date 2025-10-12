// src/components/StudentPortal.jsx
import React, { useState } from "react";
import StudentAuth from "./StudentAuth";
import Attendance from "./Attendance";
import LectureReports from "./LectureReports";
import ClassProgress from "./ClassProgress";
import Ratings from "./Ratings";
import "../style/StudentPortal.css";

function StudentPortal() {
  const [student, setStudent] = useState(null);

  const handleLogin = (studentData) => {
    setStudent(studentData);
  };

  if (!student) {
    return <StudentAuth onLogin={handleLogin} />;
  }

  return (
    <div className="student-portal">
      {/* Header */}
      <header className="portal-header">
        <h1>🎓 Student Dashboard</h1>
        <div className="student-info">
          <span>Welcome, {student.firstName}!</span>
          <span className="course-tag">{student.course} • {student.faculty}</span>
        </div>
      </header>

      {/* Monitoring Sections */}
      <main className="dashboard-content">
        <Attendance studentId={student.id} />
        <LectureReports studentId={student.id} />
        <ClassProgress studentId={student.id} />
        <Ratings studentId={student.id} />
      </main>

      {/* Logout */}
      <footer className="portal-footer">
        <button 
          onClick={() => setStudent(null)} 
          className="logout-btn"
        >
          Logout
        </button>
      </footer>
    </div>
  );
}

export default StudentPortal;