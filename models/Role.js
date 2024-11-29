const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., 'Admin', 'User', 'Manager'
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Array of permission IDs
});

module.exports = mongoose.model("Role", roleSchema);
