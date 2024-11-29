const express = require("express");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const router = express.Router();

// Create a new role (Admin only)
router.post(
  "/create",
  verifyToken,
  authorizeRole("Admin"),
  async (req, res) => {
    const { name, permissions } = req.body;

    try {
      // Ensure role doesn't already exist
      const existingRole = await Role.findOne({ name });
      if (existingRole) {
        return res.status(400).json({ message: "Role already exists" });
      }

      // Validate permissions
      const validPermissions = await Permission.find({
        _id: { $in: permissions },
      });
      if (validPermissions.length !== permissions.length) {
        return res
          .status(400)
          .json({ message: "Invalid permissions provided" });
      }

      // Create the role
      const role = new Role({ name, permissions });
      await role.save();

      res.status(201).json({ message: "Role created successfully", role });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// Get all roles (Admin only)
router.get("/get", verifyToken, authorizeRole("Admin"), async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a specific role by ID (Admin only)
router.get(
  "/get/:id",
  verifyToken,
  authorizeRole("Admin"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const role = await Role.findById(id).populate("permissions");
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.status(200).json(role);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// Update a role (Admin only)
router.put(
  "/update/:id",
  verifyToken,
  authorizeRole("Admin"),
  async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;

    try {
      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      // Update name if provided
      if (name) role.name = name;

      // Update permissions if provided
      if (permissions) {
        const validPermissions = await Permission.find({
          _id: { $in: permissions },
        });
        if (validPermissions.length !== permissions.length) {
          return res
            .status(400)
            .json({ message: "Invalid permissions provided" });
        }
        role.permissions = permissions;
      }

      await role.save();
      res.status(200).json({ message: "Role updated successfully", role });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// Delete a role (Admin only)
router.delete(
  "/delete/:id",
  verifyToken,
  authorizeRole("Admin"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      await role.remove();
      res.status(200).json({ message: "Role deleted successfully" });
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
