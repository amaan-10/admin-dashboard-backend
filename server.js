const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const rolesRoutes = require("./routes/role");
const permissionsRoutes = require("./routes/permission");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
//app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/admin", adminRoutes); // Admin routes for managing roles and permissions
app.use("/api/roles", rolesRoutes); // Role management
app.use("/api/permissions", permissionsRoutes); // Permissions management

// Root endpoint
app.get("/", (req, res) => {
  res.send("Role-Based Access Control (RBAC) API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
