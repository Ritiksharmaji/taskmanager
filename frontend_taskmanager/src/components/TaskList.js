import React, { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import "./TaskList.css";

const TaskList = () => {
  const { tasks, removeTask, updateTask, actionLoading } =
    useContext(TaskContext);

  const navigate = useNavigate();
  const [expandedTask, setExpandedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // delete | complete
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (type, task) => {
    setModalType(type);
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedTask(null);
  };

  const handleConfirm = async () => {
    if (!selectedTask) return;

    if (modalType === "delete") await removeTask(selectedTask._id);
    if (modalType === "complete")
      await updateTask(selectedTask._id, { ...selectedTask, status: "completed" });

    closeModal();
  };

  return (
    <div className="task-container">
      <h2 className="task-heading">All Tasks</h2>

      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            const isUpdating =
              actionLoading.type === "update" &&
              actionLoading.taskId === task._id;
            const isDeleting =
              actionLoading.type === "delete" &&
              actionLoading.taskId === task._id;

            return (
              <li key={task._id} className={`task-item ${task.status}`}>
                <div className="task-content">
                  <h3>
                    <strong>Title:</strong> {task.title}
                  </h3>

                  <p>
                    <strong>Description:</strong>{" "}
                    {expandedTask === task._id
                      ? task.description
                      : task.description.slice(0, 100) + "..."}
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
                    <strong>Status:</strong> {task.status}
                  </p>
                </div>

                <div className="task-actions">
                  <button
                    className="task-btn update"
                    onClick={() => navigate(`/update-task/${task._id}`)}
                    disabled={isUpdating || isDeleting}
                  >
                    {isUpdating ? "Updating..." : "Update"}
                  </button>

                  <button
                    className="task-btn delete"
                    onClick={() => openModal("delete", task)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>

                  {task.status !== "completed" && (
                    <button
                      className="task-btn complete"
                      onClick={() => openModal("complete", task)}
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Completing..." : "Complete"}
                    </button>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <p className="no-tasks">No tasks available</p>
        )}
      </ul>

      {/* Confirm Modal */}
      <ConfirmModal
        open={modalOpen}
        title={modalType === "delete" ? "Delete Task" : "Complete Task"}
        message={
          modalType === "delete"
            ? "Are you sure you want to delete this task?"
            : "Are you sure you want to mark this task as completed?"
        }
        confirmText={modalType === "delete" ? "Delete" : "Complete"}
        loading={actionLoading.type === modalType}
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default TaskList;
