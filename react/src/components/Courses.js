// src/components/Courses.jsx
import React from "react";

function Courses({ principalLecturerId }) {
  const courses = [
    {
      id: 1,
      name: "Advanced React Development",
      code: "CS401",
      lectures: [
        "Week 1: React Fundamentals",
        "Week 2: Component Lifecycle",
        "Week 3: State Management",
        "Week 4: Routing & Navigation"
      ]
    },
    {
      id: 2,
      name: "Database Systems",
      code: "CS305",
      lectures: [
        "Week 1: SQL Basics",
        "Week 2: Database Design",
        "Week 3: Normalization",
        "Week 4: Advanced Queries"
      ]
    },
    {
      id: 3,
      name: "Software Engineering",
      code: "CS310",
      lectures: [
        "Week 1: SDLC Overview",
        "Week 2: Requirements Analysis",
        "Week 3: Design Patterns",
        "Week 4: Testing Strategies"
      ]
    }
  ];

  return (
    <div className="dashboard-card">
      <h2>📚 Courses Under Your Stream</h2>
      {courses.map(course => (
        <div key={course.id} className="course-item">
          <h3>{course.name} ({course.code})</h3>
          <ul className="lectures-list">
            {course.lectures.map((lecture, index) => (
              <li key={index}>{lecture}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Courses;