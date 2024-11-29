const express = require("express");
const Permission = require("../models/Permission");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const router = express.Router();

// Create a new permission (Admin only)
router.post(
  "/create",
  verifyToken,
  authorizeRole("Admin"),
  async (req, res) => {
    const { name, description } = req.body;

    try {
      const permission = new Permission({ name, description });
      await permission.save();
      res
        .status(201)
        .json({ message: "Permission created successfully", permission });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error creating permission", error: err.message });
    }
  }
);

// Get all permissions (Admin only)
router.get("/get", verifyToken, authorizeRole("Admin"), async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
