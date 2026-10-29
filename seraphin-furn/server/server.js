
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect database
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Import routes
const productRoutes = require("./routes/productRoutes");
const interiorServiceRoutes = require("./routes/interiorServiceRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

// Register routes
app.use("/api/products", productRoutes);
app.use("/api/interior-services", interiorServiceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
