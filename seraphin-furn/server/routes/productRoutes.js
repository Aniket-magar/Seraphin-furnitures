const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

router.post("/add", protect, addProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.delete("/:id", protect, deleteProduct);

router.put("/:id", protect, updateProduct);

module.exports = router;