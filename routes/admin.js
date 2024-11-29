const express = require("express");
const User = require("../models/User");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all users (Admin only)
router.get("/users", verifyToken, authorizeRole("Admin"), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update user role (Admin only)
router.put(
  "/update-role/:id",
  verifyToken,
  authorizeRole("Admin"),
  async (req, res) => {
    const { role } = req.body;

    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.role = role;
      await user.save();
      res.status(200).json({ message: "Role updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

router.delete(
  "/delete/:id",
  verifyToken,
  authorizeRole("Admin"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.remove();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

module.exports = router;
