import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskContext from "../context/TaskContext";
import "./TaskForm.css";
import UserProfile from "./UserProfile";

const TaskForm = () => {
  const { tasks, createTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Task title cannot be empty.", { position: "top-right", autoClose: 3000 });
      return;
    }
    if (!description.trim()) {
      toast.error("Task description cannot be empty.", { position: "top-right", autoClose: 3000 });
      return;
    }
    if (!dueDate) {
      toast.error("Please select a due date.", { position: "top-right", autoClose: 3000 });
      return;
    }

    const taskExists = tasks.some(
      (task) => task.title.toLowerCase() === title.toLowerCase()
    );

    if (taskExists) {
      toast.error("A task with this title already exists.", { position: "top-right", autoClose: 3000 });
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      dueDate,
    };

    try {
      setLoading(true); // 🔥 SHOW LOADER
      await createTask(newTask);

      toast.success("Task added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate("");
    } catch (error) {
      toast.error("Failed to create task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // 🔥 HIDE LOADER (success OR error)
    }
  };


  return (
    <div className="task-dashboard-container">
      <div className="task-form-section">
        <h2 className="dashboard-heading">Create a New Task</h2>
        <form className="task-form-wrapper" onSubmit={handleSubmit}>
          <div className="task-input-group">
            <label className="task-label" htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              placeholder="Enter task title"
              className="task-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="task-input-group">
            <label className="task-label" htmlFor="taskDescription">Task Description</label>
            <textarea
              id="taskDescription"
              placeholder="Enter task description"
              className="task-input task-textarea"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="task-row">
            <div className="task-input-group">
              <label className="task-label" htmlFor="taskStatus">Status</label>
              <select
                id="taskStatus"
                className="task-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="task-input-group">
              <label className="task-label" htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                className="task-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <button className="task-submit-btn" type="submit" disabled={loading}>
            {loading ? (
              <span className="loader"></span>
            ) : (
              "Add Task"
            )}
          </button>

        </form>
      </div>

      <div className="user-section">
        {/* <UserProfile user={user} onLogout={logout} /> */}
         <UserProfile />
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskForm;
