import React from "react";

function ProgramLeaderMonitoring({ programLeaderId }) {
  const monitoringData = {
    stats: {
      totalLecturers: 2,
      totalCourses: 2,
      avgTeachingRating: 4.4,
      coursesOnTrack: 2
    },
    lecturers: [
      {
        id: "lec-001",
        name: "Dr. Sarah Williams",
        courses: ["CS401"],
        teachingRating: 4.6,
        attendanceRate: 92,
        status: "On Track"
      },
      {
        id: "lec-002",
        name: "Dr. James Chen",
        courses: ["CS305"],
        teachingRating: 4.2,
        attendanceRate: 89,
        status: "On Track"
      }
    ]
  };

  return (
    <div className="dashboard-card">
      <h2>📊 Teaching Program Monitoring</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Lecturers</div>
          <div className="stat-value">{monitoringData.stats.totalLecturers}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Courses</div>
          <div className="stat-value">{monitoringData.stats.totalCourses}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Teaching Rating</div>
          <div className="stat-value">{monitoringData.stats.avgTeachingRating}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Courses On Track</div>
          <div className="stat-value">{monitoringData.stats.coursesOnTrack}</div>
        </div>
      </div>

      <h3>Lecturer Performance</h3>
      {monitoringData.lecturers.map(lecturer => (
        <div key={lecturer.id} className="course-item">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h3>{lecturer.name}</h3>
              <p><strong>Courses:</strong> {lecturer.courses.join(", ")}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#ffd700', fontWeight: '600' }}>
                ⭐ {lecturer.teachingRating}
              </div>
              <div style={{ color: '#4caf50', fontWeight: '600', marginTop: '4px' }}>
                {lecturer.status}
              </div>
            </div>
          </div>
          
          <div className="class-details">
            <div className="class-detail">
              <strong>Attendance Rate</strong>
              <span>{lecturer.attendanceRate}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgramLeaderMonitoring;