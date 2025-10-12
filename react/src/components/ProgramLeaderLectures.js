// src/components/ProgramLeaderLectures.jsx
import React from "react";

function ProgramLeaderLectures({ programLeaderId }) {
  const lectures = [
    {
      id: "lec-001",
      course: "Advanced React Development",
      topic: "State Management with Context API",
      lecturer: "Dr. Sarah Williams",
      date: "2025-09-25",
      week: "Week 3",
      venue: "Lab 301",
      studentsPresent: 24,
      totalStudents: 28
    },
    {
      id: "lec-002",
      course: "Database Systems",
      topic: "Database Normalization",
      lecturer: "Dr. James Chen",
      date: "2025-09-24",
      week: "Week 4",
      venue: "Room 205",
      studentsPresent: 32,
      totalStudents: 35
    }
  ];

  return (
    <div className="dashboard-card">
      <h2>🎓 Lecture Schedule</h2>
      {lectures.map(lecture => (
        <div key={lecture.id} className="lecture-card">
          <h3>{lecture.course} - {lecture.topic}</h3>
          <p><strong>Lecturer:</strong> {lecture.lecturer}</p>
          
          <div className="lecture-details">
            <div className="lecture-detail">
              <strong>Date</strong>
              <span>{lecture.date} ({lecture.week})</span>
            </div>
            <div className="lecture-detail">
              <strong>Venue</strong>
              <span>{lecture.venue}</span>
            </div>
            <div className="lecture-detail">
              <strong>Attendance</strong>
              <span>{lecture.studentsPresent}/{lecture.totalStudents}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgramLeaderLectures;