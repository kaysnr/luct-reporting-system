// backend/routes/ratingsRoutes.js
const express = require("express");
const router = express.Router();
const ratingsController = require("../controllers/ratingsController");

// GET all ratings
router.get("/", ratingsController.getAllRatings);

// GET single rating by ID
router.get("/:id", ratingsController.getRatingById);

// POST create new rating
router.post("/", ratingsController.createRating);

// PUT update rating
router.put("/:id", ratingsController.updateRating);

// DELETE rating
router.delete("/:id", ratingsController.deleteRating);

module.exports = router;