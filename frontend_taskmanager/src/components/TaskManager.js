import React from "react";
import TaskList from "../components/TaskList";
import UserProfile from "../components/UserProfile";
import "./taskmanager.css";

const TaskManagerDashboard = () => {
  return (
    <div className="task-dashboard-container">
      <TaskList />
      <UserProfile />
    </div>
  );
};

export default TaskManagerDashboard;
