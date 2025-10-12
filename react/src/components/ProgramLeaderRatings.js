// src/components/ProgramLeaderRatings.jsx
import React, { useState } from "react";

function ProgramLeaderRatings({ programLeaderId }) {
  const [ratings, setRatings] = useState({});

  const lecturers = [
    { id: "lec-001", name: "Dr. Sarah Williams", course: "CS401" },
    { id: "lec-002", name: "Dr. James Chen", course: "CS305" }
  ];

  const handleRating = (lecturerId, rating) => {
    setRatings({ ...ratings, [lecturerId]: rating });
  };

  const handleSubmitRatings = () => {
    console.log("Program Leader Ratings:", ratings);
    alert("Ratings submitted successfully!");
  };

  return (
    <div className="dashboard-card">
      <h2>⭐ Lecturer Performance Ratings</h2>
      
      <div className="rating-section">
        <h3>Rate Lecturer Performance</h3>
        <div className="rating-cards">
          {lecturers.map(lecturer => (
            <div key={lecturer.id} className="rating-card">
              <h4>{lecturer.name}</h4>
              <p>{lecturer.course}</p>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map(rating => (
                  <div
                    key={rating}
                    className={`rating-option ${ratings[lecturer.id] === rating ? 'selected' : ''}`}
                    onClick={() => handleRating(lecturer.id, rating)}
                  >
                    {rating} ⭐
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="submit-btn"
        onClick={handleSubmitRatings}
        disabled={Object.keys(ratings).length === 0}
      >
        Submit All Ratings
      </button>
    </div>
  );
}

export default ProgramLeaderRatings;