const Role = require("../models/Role");

const authorizePermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userRole = await Role.findById(req.user.role).populate(
        "permissions"
      );
      const hasPermission = userRole.permissions.some(
        (permission) => permission.name === requiredPermission
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Permission Denied" });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
};

module.exports = authorizePermission;
