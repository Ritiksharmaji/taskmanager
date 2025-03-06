import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import TaskContext from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import "./taskmanager.css";

const TaskManagerDashboard = () => {
  const { tasks, addTask, editTask, removeTask, toggleTaskStatus } = useContext(TaskContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask({ title: newTask, status: "Pending" });
      setNewTask("");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditText(task.title);
  };

  const handleUpdateTask = () => {
    if (editText.trim() !== "") {
      editTask(editingTask.id, editText);
      setEditingTask(null);
      setEditText("");
    }
  };

  return (
    <div className="jobby-app-container">
      <div className="card-container">
        <h2 className="dashboard-heading">Task Dashboard</h2>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>

      
        <div className="task-input-container">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="task-input"
          />
          <button className="add-button" onClick={handleAddTask}>
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.status === "Completed" ? "completed" : ""}`}>
              {editingTask && editingTask.id === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{task.title} - {task.status}</span>
              )}

              <div className="task-actions">
                {editingTask && editingTask.id === task.id ? (
                  <button className="save-button" onClick={handleUpdateTask}>Save</button>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => handleEditTask(task)}>Edit</button>
                    <button className="delete-button" onClick={() => removeTask(task.id)}>Delete</button>
                    <button className="complete-button" onClick={() => toggleTaskStatus(task.id)}>
                      {task.status === "Completed" ? "Undo" : "Complete"}
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManagerDashboard;
