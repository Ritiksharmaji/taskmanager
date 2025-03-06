import React, { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import "./TaskForm.css";

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("Task title cannot be empty.");
      return;
    }
    if (!dueDate) {
      setErrorMsg("Please select a due date.");
      return;
    }

    addTask({ id: Date.now(), title, status, dueDate });
    setTitle("");
    setStatus("pending");
    setDueDate("");
    setErrorMsg("");
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-heading">Create a New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label" htmlFor="taskTitle">Task Title</label>
          <input
            type="text"
            id="taskTitle"
            placeholder="Enter task title"
            className="user-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label className="label" htmlFor="taskStatus">Status</label>
          <select
            id="taskStatus"
            className="user-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="input-container">
          <label className="label" htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            className="user-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button className="task-submit-button" type="submit">Add Task</button>

        {errorMsg && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default TaskForm;
