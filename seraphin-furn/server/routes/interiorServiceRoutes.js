const express = require("express");
const router = express.Router();

const {
  addInteriorService,
  getInteriorServices,
  getInteriorServiceById,
  updateInteriorService,
  deleteInteriorService,
} = require("../controllers/interiorServiceController");

const protect = require("../middleware/authMiddleware");

router.post("/add", protect, addInteriorService);

router.get("/", getInteriorServices);

router.get("/:id", getInteriorServiceById);

router.put("/:id", protect, updateInteriorService);

router.delete("/:id", protect, deleteInteriorService);

module.exports = router;
