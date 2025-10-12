// src/components/ProgramLeaderClasses.jsx
import React from "react";

function ProgramLeaderClasses({ programLeaderId }) {
  const classes = [
    {
      id: "cls-001",
      course: "Advanced React Development",
      code: "CS401",
      lecturer: "Dr. Sarah Williams",
      schedule: "Mon & Wed, 10:00-12:00",
      venue: "Lab 301",
      students: 28
    },
    {
      id: "cls-002",
      course: "Database Systems",
      code: "CS305",
      lecturer: "Dr. James Chen",
      schedule: "Tue & Thu, 14:00-16:00",
      venue: "Room 205",
      students: 35
    }
  ];

  return (
    <div className="dashboard-card">
      <h2>🏫 Classes Overview</h2>
      {classes.map(cls => (
        <div key={cls.id} className="class-card">
          <h3>{cls.course} ({cls.code})</h3>
          <p><strong>Lecturer:</strong> {cls.lecturer}</p>
          
          <div className="class-details">
            <div className="class-detail">
              <strong>Schedule</strong>
              <span>{cls.schedule}</span>
            </div>
            <div className="class-detail">
              <strong>Venue</strong>
              <span>{cls.venue}</span>
            </div>
            <div className="class-detail">
              <strong>Students</strong>
              <span>{cls.students}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgramLeaderClasses;