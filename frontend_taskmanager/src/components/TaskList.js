import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";
import AuthContext from "../context/AuthContext";

const TaskList = () => {
  const { tasks, removeTask, updateTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [expandedTask, setExpandedTask] = useState(null);

  const markComplete = (task) => {
    updateTask(task._id, { ...task, status: "completed" });
  };

  // Function to truncate long descriptions
  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="task-dashboard-container">
      {/* Task Section */}
      <div className="task-container">
        <h2 className="task-heading">All Tasks</h2>
        <ul className="task-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task._id} className="task-item">
                <div className="task-content">
                  <h3 className="task-title"> <strong>Title: </strong> {task.title}</h3>
                  <p className="task-description">
                    <strong>Description:</strong>
                    {expandedTask === task._id
                      ? task.description
                      : truncateText(task.description, 100)}
                  </p>
                  {task.description.length > 100 && (
                    <button
                      className="read-more-btn"
                      onClick={() =>
                        setExpandedTask(expandedTask === task._id ? null : task._id)
                      }
                    >
                      {expandedTask === task._id ? "Read Less" : "Read More"}
                    </button>
                  )}
                  <p>
                    <strong>Due Date:</strong>{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {task.status}
                  </p>
                </div>
                <div className="task-actions">
                  <button
                    className="task-btn update"
                    onClick={() => navigate(`/update-task/${task._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="task-btn delete"
                    onClick={() => removeTask(task._id)}
                  >
                    Delete
                  </button>
                  {task.status !== "completed" && (
                    <button
                      className="task-btn complete"
                      onClick={() => markComplete(task)}
                    >
                      Complete
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="no-tasks">No tasks available.</p>
          )}
        </ul>
      </div>

      {/* User Section */}
      <div className="user-section">
        <div className="user-profile">
          <img
            src={user?.profileImage}
            alt="User Profile"
            className="profile-image"
          />
          <h3>{user?.username || "N/A"}</h3>
          <p>{user?.email || "N/A"}</p>
        </div>
        <div className="user-buttons">
          <button className="task-manager-btn" onClick={() => navigate("/task-create")}>
            Create Task
          </button>
          <button className="task-manager-btn" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button className="logout-button" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
