import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { tasks, removeTask } = useContext(TaskContext);
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Task Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
