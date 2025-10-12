// src/components/Attendance.jsx
import React from "react";

function Attendance({ studentId }) {
  // Mock data - replace with API call
  const attendanceData = [
    { date: "2025-09-20", lecture: "React Hooks", status: "Present" },
    { date: "2025-09-22", lecture: "State Management", status: "Absent" },
    { date: "2025-09-25", lecture: "Routing", status: "Present" },
  ];

  return (
    <div className="dashboard-card">
      <h2>📊 Attendance Records</h2>
      <div className="attendance-list">
        {attendanceData.map((record, index) => (
          <div key={index} className={`attendance-item ${record.status.toLowerCase()}`}>
            <div>
              <strong>{record.lecture}</strong>
              <div>{record.date}</div>
            </div>
            <span className={`status ${record.status.toLowerCase()}`}>
              {record.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;