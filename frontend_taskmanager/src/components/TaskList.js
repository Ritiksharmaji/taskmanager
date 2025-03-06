import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";
import AuthContext from "../context/AuthContext";

const TaskList = () => {
  const { tasks, removeTask, updateTask } = useContext(TaskContext); 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const markComplete = (task) => {
    updateTask(task.id, { ...task, status: "Completed" });
  };

  return (
    <div className="container">
      
      <div className="task-container">
        <h2 className="task-heading">All Tasks</h2>
        <ul className="task-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-content">
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">{task.description}</p>
                  <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {task.status}</p>
                </div>
                <div className="task-actions">
                  <button className="task-btn update" onClick={() => navigate(`/update-task/${task.id}`)}>Update</button>
                  <button className="task-btn delete" onClick={() => removeTask(task.id)}>Delete</button>
                  {task.status !== "Completed" && (
                    <button className="task-btn complete" onClick={() => markComplete(task)}>Complete</button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="no-tasks">No tasks available.</p>
          )}
        </ul>
      </div>

      
      <div className="user-section">
      <div className="user-profile">
          <img src={user?.profileImage} alt="User Profile" className="profile-image" />
          <h3>{user?.username || "N/A"}</h3>
          <p>{user?.email || "N/A"}</p>
        </div>
        <button className="task-manager-btn" onClick={() => navigate("/task-create")}>
          Create Task
        </button>
      </div>
      
    </div>
  );
};

export default TaskList;
