// src/components/ClassProgress.jsx
import React from "react";

function ClassProgress({ studentId }) {
  const progress = 75; // Mock percentage

  return (
    <div className="dashboard-card">
      <h2>📈 Class Progress</h2>
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{progress}% Complete</span>
      </div>
      
      <div className="topics-covered">
        <h4>Topics Covered:</h4>
        <ul>
          <li>React Fundamentals</li>
          <li>Component Lifecycle</li>
          <li>State Management</li>
          <li>Routing</li>
        </ul>
      </div>
    </div>
  );
}

export default ClassProgress;