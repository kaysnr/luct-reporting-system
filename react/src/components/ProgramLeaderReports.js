// src/components/ProgramLeaderReports.jsx
import React from "react";

function ProgramLeaderReports({ programLeaderId }) {
  const prlReports = [
    {
      id: "prl-001",
      prl: "Prof. Michael Thompson",
      faculty: "Engineering",
      department: "Computer Science",
      date: "2025-09-26",
      title: "CS401 Teaching Quality Assessment",
      content: "Dr. Sarah Williams demonstrates excellent teaching methodology in CS401. Student engagement is high and learning outcomes are being met effectively."
    },
    {
      id: "prl-002",
      prl: "Prof. Michael Thompson",
      faculty: "Engineering",
      department: "Computer Science",
      date: "2025-09-25",
      title: "CS305 Curriculum Review",
      content: "Database Systems course (CS305) shows strong student performance. Dr. James Chen's practical examples are particularly effective."
    }
  ];

  return (
    <div className="dashboard-card">
      <h2>📝 Principal Lecturer Reports</h2>
      {prlReports.map(report => (
        <div key={report.id} className="report-card">
          <div className="report-header">
            <h3 className="report-title">{report.title}</h3>
            <span className="report-source">by {report.prl}</span>
          </div>
          <p><strong>Faculty:</strong> {report.faculty} • {report.department}</p>
          <p><strong>Date:</strong> {report.date}</p>
          <div className="report-content">
            {report.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgramLeaderReports;