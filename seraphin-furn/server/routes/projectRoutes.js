
const express = require("express");
const router = express.Router();

const {
  addProject,
  getProjects,
  getPublishedProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

// Admin: list all projects, including drafts
router.get("/", protect, getProjects);

// Public: list published projects
router.get("/published", getPublishedProjects);

// Public: get a published project by ID
router.get("/:id", getProjectById);

// Admin: create, update, and delete projects
router.post("/", protect, addProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
