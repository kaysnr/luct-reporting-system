// backend/controllers/ratingsController.js
const pool = require("../db");

// Get all ratings
exports.getAllRatings = (req, res) => {
  const query = "SELECT * FROM ratings";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching ratings:", err);
      return res.status(500).json({ error: "Failed to fetch ratings" });
    }
    res.json(results);
  });
};

// Get rating by ID
exports.getRatingById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM ratings WHERE rating_id = ?";
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching rating:", err);
      return res.status(500).json({ error: "Failed to fetch rating" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.json(results[0]);
  });
};

// Create new rating
exports.createRating = (req, res) => {
  const {
    user_id,
    class_id,
    rating_value,
  } = req.body;

  // Validate required fields
  if (user_id == null || class_id == null || rating_value == null) {
    return res.status(400).json({
      error: "user_id, class_id, and rating_value are required"
    });
  }

  // Optional: Validate rating_value range (e.g., 1.0 to 5.0)
  if (rating_value < 1 || rating_value > 5) {
    return res.status(400).json({
      error: "rating_value must be between 1.0 and 5.0"
    });
  }

  const query =
    "INSERT INTO ratings (user_id, class_id, rating_value) VALUES (?, ?, ?)";

  pool.query(
    query,
    [user_id, class_id, rating_value],
    (err, result) => {
      if (err) {
        console.error("❌ Error creating rating:", err);
        return res.status(500).json({ error: "Failed to create rating" });
      }
      res.status(201).json({
        message: "Rating created successfully",
        ratingId: result.insertId,
      });
    }
  );
};

// Update rating by ID
exports.updateRating = (req, res) => {
  const { id } = req.params;
  const {
    user_id,
    class_id,
    rating_value,
  } = req.body;

  // Validate at least one field is provided
  if (!user_id && !class_id && !rating_value) {
    return res.status(400).json({
      error: "At least one field (user_id, class_id, rating_value) must be provided"
    });
  }

  // Build dynamic query
  const fields = [];
  const values = [];

  if (user_id != null) {
    fields.push("user_id = ?");
    values.push(user_id);
  }
  if (class_id != null) {
    fields.push("class_id = ?");
    values.push(class_id);
  }
  if (rating_value != null) {
    fields.push("rating_value = ?");
    values.push(rating_value);
  }

  values.push(id); // for WHERE clause

  const query = `UPDATE ratings SET ${fields.join(", ")} WHERE rating_id = ?`;

  pool.query(
    query,
    values,
    (err, result) => {
      if (err) {
        console.error("❌ Error updating rating:", err);
        return res.status(500).json({ error: "Failed to update rating" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Rating not found" });
      }
      res.json({ message: "Rating updated successfully" });
    }
  );
};

// Delete rating by ID
exports.deleteRating = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM ratings WHERE rating_id = ?";
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting rating:", err);
      return res.status(500).json({ error: "Failed to delete rating" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.json({ message: "Rating deleted successfully" });
  });
};