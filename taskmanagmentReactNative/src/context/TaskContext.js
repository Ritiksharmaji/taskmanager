import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchTasks, addTask, deleteTask, editTask } from "../apis/api";
import AuthContext from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    type: null,
    taskId: null,
  });

  /* -------------------- LOAD TASKS -------------------- */
  const loadTasks = useCallback(async () => {
    if (!token) {
      setTasks([]); // reset tasks if no token
      return;
    }

    try {
      setLoading(true);
      const response = await fetchTasks(token); // should return { tasks: [...] } or array
      setTasks(response.data || []); // fallback to empty array
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks([]); // clear tasks on error
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /* -------------------- ACTIONS -------------------- */
  const createTask = async (taskData) => {
    if (!token) return;
    try {
      setActionLoading({ type: "create", taskId: null });
      await addTask(taskData, token);
      await loadTasks(); // refresh list
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setActionLoading({ type: null, taskId: null });
    }
  };

  const updateTask = async (taskId, updatedTaskData) => {
    if (!token) return;
    try {
      setActionLoading({ type: "update", taskId });
      await editTask(taskId, updatedTaskData, token);
      await loadTasks(); // refresh list
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setActionLoading({ type: null, taskId: null });
    }
  };

  const removeTask = async (taskId) => {
    if (!token) return;
    try {
      setActionLoading({ type: "delete", taskId });
      await deleteTask(taskId, token);
      await loadTasks(); // refresh list
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setActionLoading({ type: null, taskId: null });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        actionLoading,
        createTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
