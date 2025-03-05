const express = require("express");
const {
  createTask,
  getAllTasks,
  getTasksByDueDate,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, createTask);
router.get("/", authenticateToken, getAllTasks);
router.get("/due-date/:dueDate", authenticateToken, getTasksByDueDate);
router.get("/:taskId", authenticateToken, getTaskById);
router.put("/:id", authenticateToken, updateTask);
router.delete("/:id", authenticateToken, deleteTask);

module.exports = router;
