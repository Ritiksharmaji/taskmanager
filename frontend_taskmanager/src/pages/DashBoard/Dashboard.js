import React, { useContext, useState } from "react";
import TaskContext from "../../context/TaskContext";
import "./index.css";
import UserProfile from "../../components/UserProfile";

const Dashboard = () => {
  const { tasks, removeTask } = useContext(TaskContext);
  console.log("Tasks in Dashboard:", tasks);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);


  const openDeleteModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    removeTask(selectedTaskId); // updates UI instantly
    setShowModal(false);
    setSelectedTaskId(null);
  };

  return (
    <div className="dashboard-container">

      {/* Task Section */}
      <div className="task-section">
        <h2 className="dashboard-heading">Task Dashboard</h2>

        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                <span>
                  <strong>{task.title}</strong> - {task.status}
                </span>
                <button
                  className="delete-button"
                  onClick={() => openDeleteModal(task._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User Section */}
      <div className="user-section">
        <UserProfile />
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete Task</h3>
            <p>Are you sure you want to delete this task?</p>

            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
