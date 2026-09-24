require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Product routes
const productRoutes = require("./routes/productRoutes");
const interiorServiceRoutes = require("./routes/interiorServiceRoutes");

app.use("/api/products", productRoutes);
app.use("/api/interior-services", interiorServiceRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
// server listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
