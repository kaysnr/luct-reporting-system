// src/components/Ratings.jsx
import React, { useState } from "react";

function Ratings({ studentId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rating submitted:", { rating, comment });
    alert("Thank you for your feedback!");
    setRating(0);
    setComment("");
  };

  return (
    <div className="dashboard-card">
      <h2>⭐ Rate Your Experience</h2>
      
      <form onSubmit={handleSubmit} className="rating-form">
        <div className="rating-section">
          <h3>Lecture Rating</h3>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="rating-section">
          <h3>Lecturer Performance</h3>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="rating-section">
          <h3>Course Experience</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows="3"
          />
        </div>

        <button type="submit" className="submit-rating-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Ratings;