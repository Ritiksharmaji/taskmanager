import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import TaskContext from "../../context/TaskContext";
import "./index.css";
import UserProfile from "../../components/Profile";

const Dashboard = () => {
  const { tasks, removeTask } = useContext(TaskContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <div className="dashboard-container">
     
      <div className="task-section">
        <h2 className="dashboard-heading">Task Dashboard</h2>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.title} - {task.status}</span>
              <button className="delete-button" onClick={() => removeTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="user-section">
       
          <UserProfile/>
      
        <div className="task-navigation">
          <button className="task-button" onClick={() => navigate("/tasks")}>Task Manager</button>
          <button className="task-button" onClick={() => navigate("/task-create")}>Task Create</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
