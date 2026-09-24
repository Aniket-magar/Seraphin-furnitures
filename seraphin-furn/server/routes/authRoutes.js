const express = require("express");

const {
  registerAdmin,
  loginAdmin,
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

// Admin
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

// Customer
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;