const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., 'CREATE_POST', 'DELETE_USER'
  description: { type: String }, // Optional, for clarity
});

module.exports = mongoose.model("Permission", permissionSchema);
