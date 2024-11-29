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

// Assign permissions to a role (Admin only)
router.put(
  "/assign-permission",
  verifyToken,
  authorizeRole("Admin"),
  async (req, res) => {
    const { roleId, permissionId } = req.body;

    try {
      const role = await Role.findById(roleId);
      const permission = await Permission.findById(permissionId);

      if (!role || !permission) {
        return res
          .status(404)
          .json({ message: "Role or Permission not found" });
      }

      if (!role.permissions.includes(permissionId)) {
        role.permissions.push(permissionId);
        await role.save();
      }

      res
        .status(200)
        .json({ message: "Permission assigned successfully", role });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

module.exports = router;
