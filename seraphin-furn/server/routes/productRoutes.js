const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

// CREATE product
router.post("/add", addProduct);

// GET all products
router.get("/", getProducts);

// GET single product
router.get("/:id", getProductById);

// DELETE product
router.delete("/:id", deleteProduct);

// UPDATE product
router.put("/:id", updateProduct);

module.exports = router;