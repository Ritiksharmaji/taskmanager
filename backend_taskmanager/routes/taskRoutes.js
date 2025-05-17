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

module.exports = (io) => {
  const router = express.Router();

  // Wrap controller methods that need io with a factory function
  router.post("/", authenticateToken, createTask(io));
  router.get("/", authenticateToken, getAllTasks);
  router.get("/due-date/:dueDate", authenticateToken, getTasksByDueDate);
  router.get("/:taskId", authenticateToken, getTaskById);
  router.put("/:id", authenticateToken, updateTask(io));
  router.delete("/:id", authenticateToken, deleteTask(io));

  return router;
};
