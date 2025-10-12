// src/components/LectureReports.jsx
import React from 'react';
import './LectureReports.css';

function LectureReports() {
  return (
    <form className="report-form">
      <h2>Lecture Report Form</h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="class_id">Class ID</label>
          <input
            type="text"
            id="class_id"
            name="class_id"
            placeholder="e.g., CS301"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="week_of_reporting">Week of Reporting</label>
          <input
            type="text"
            id="week_of_reporting"
            name="week_of_reporting"
            placeholder="e.g., Week 5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_of_lecture">Date of Lecture</label>
          <input
            type="date"
            id="date_of_lecture"
            name="date_of_lecture"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="number_of_students_present">Students Present</label>
          <input
            type="number"
            id="number_of_students_present"
            name="number_of_students_present"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="total_number_of_students_registered">
            Total Registered Students
          </label>
          <input
            type="number"
            id="total_number_of_students_registered"
            name="total_number_of_students_registered"
            min="0"
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="topic_taught">Topic Taught</label>
          <textarea
            id="topic_taught"
            name="topic_taught"
            placeholder="Briefly describe the topic covered..."
            required
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="learning_outcome">Learning Outcome</label>
          <textarea
            id="learning_outcome"
            name="learning_outcome"
            placeholder="What should students have learned?"
            required
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="lecturer_recommendations">Lecturer Recommendations</label>
          <textarea
            id="lecturer_recommendations"
            name="lecturer_recommendations"
            placeholder="Any suggestions or follow-up actions?"
          ></textarea>
        </div>
      </div>

      <button type="submit" className="submit-report-btn">
        Submit Report
      </button>
    </form>
  );
}

export default LectureReports;