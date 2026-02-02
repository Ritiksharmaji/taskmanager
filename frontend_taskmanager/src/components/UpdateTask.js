import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import TaskContext from "../context/TaskContext";
import "./UpdateTask.css";
import UserProfile from "./UserProfile";

const UpdateTask = () => {
  const { tasks, updateTask } = useContext(TaskContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const taskId = id;
  const existingTask = tasks.find((task) => task._id === taskId);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  useEffect(() => {
    if (existingTask) {
      setTaskData({
        title: existingTask.title || "",
        description: existingTask.description || "",
        dueDate: existingTask.dueDate ? existingTask.dueDate.split("T")[0] : "",
        status: existingTask.status || "pending",
      });
    }
  }, [existingTask]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!existingTask) return;

    try {
      await updateTask(taskId, taskData);
      toast.success("Task updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/tasks");

    } catch (error) {
      toast.error("Failed to update task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (!existingTask) {
    return (
      <div className="update-task-container">
        <h2>Task Not Found</h2>
      </div>
    );
  }

  return (
    <div className="task-dashboard-container">
      <div className="task-form-section">
        <h2 className="dashboard-heading">Update Task</h2>
        <form className="task-form-wrapper" onSubmit={handleSubmit}>
          <div className="task-input-group">
            <label className="task-label">Title:</label>
            <input
              type="text"
              name="title"
              className="task-input"
              value={taskData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="task-input-group">
            <label className="task-label">Description:</label>
            <textarea
              name="description"
              value={taskData.description}
              className="task-input task-textarea"
              rows="3"
              onChange={handleChange}
              required
            />
          </div>

          <div className="task-row">
            <div className="task-input-group">
              <label className="task-label">Status:</label>
              <select
                name="status"
                value={taskData.status}
                className="task-input"
                onChange={handleChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="task-input-group">
              <label className="task-label">Due Date:</label>
              <input
                type="date"
                name="dueDate"
                className="task-input"
                value={taskData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="task-submit-btn">
            Update Task
          </button>
        </form>
      </div>

      <div className="user-section">
       <UserProfile/>

        <button className="task-manager-btn" onClick={() => navigate("/tasks")}>
          Go to Task Manager
        </button>
      </div>
        <ToastContainer />
    </div>
    
  );
};

export default UpdateTask;
