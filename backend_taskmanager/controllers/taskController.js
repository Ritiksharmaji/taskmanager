const Task = require("../models/Task");

exports.createTask = (io) => async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      dueDate: dueDate || null,
      userId: req.user._id,
    });

    // Emit event to all connected clients (except sender if you want)
    io.emit("taskCreated", task);

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.getTasksByDueDate = async (req, res) => {
  try {
    const { dueDate } = req.params;
    const tasks = await Task.find({ dueDate, userId: req.user._id });

    if (!tasks.length) {
      return res.status(404).json({ error: "No tasks found for this due date" });
    }

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

exports.updateTask = (io) => async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    io.emit("taskUpdated", task);

    res.json({ message: "Task updated", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = (io) => async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!task) return res.status(404).json({ error: "Task not found" });

    io.emit("taskDeleted", req.params.id);

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
