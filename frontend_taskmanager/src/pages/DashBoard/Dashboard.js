import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TaskContext from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Dashboard = () => {
  const { tasks, removeTask } = useContext(TaskContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="jobby-app-container">
      <div className="card-container">
        <h2 className="dashboard-heading">Task Dashboard</h2>
        <button className="logout-button" onClick={logout}>Logout</button>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.title} - {task.status}</span>
              <button className="delete-button" onClick={() => removeTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;