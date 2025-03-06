import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskContext from "../context/TaskContext";
import AuthContext from "../context/AuthContext";
import "./TaskForm.css";

const TaskForm = () => {
  const { tasks, createTask } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Task title cannot be empty.");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Task description cannot be empty.");
      return;
    }
    if (!dueDate) {
      setErrorMsg("Please select a due date.");
      return;
    }

    const taskExists = tasks.some(
      (task) => task.title.toLowerCase() === title.toLowerCase()
    );
    if (taskExists) {
      setErrorMsg("A task with this title already exists.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      dueDate,
    };

    createTask(newTask);
    toast.success("Task added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
  };

  return (
    <div className="task-dashboard-container">
      {/* Left Side - Task Form */}
      <div className="task-form-section">
        <h2 className="dashboard-heading">Create a New Task</h2>
        <form className="task-form-wrapper" onSubmit={handleSubmit}>
          <div className="task-input-group">
            <label className="task-label" htmlFor="taskTitle">
              Task Title
            </label>
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
            <label className="task-label" htmlFor="taskDescription">
              Task Description
            </label>
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
              <label className="task-label" htmlFor="taskStatus">
                Status
              </label>
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
              <label className="task-label" htmlFor="dueDate">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="task-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <button className="task-submit-btn" type="submit">
            Add Task
          </button>

          {errorMsg && <p className="task-error-msg">* {errorMsg}</p>}
        </form>
      </div>

      {/* Right Side - User Details */}
      <div className="user-section">
        <div className="user-profile">
          <img src={user?.profileImage} alt="User Profile" className="profile-image" />
          <h3>{user?.username || "N/A"}</h3>
          <p>{user?.email || "N/A"}</p>
        </div>
        <button className="task-manager-btn" onClick={() => navigate("/tasks")}>
          Go to Task Manager
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TaskForm;
