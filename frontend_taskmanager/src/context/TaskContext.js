import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchTasks, addTask, deleteTask, editTask } from "../services/api";
import AuthContext from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async () => {
    try {
      const { data } = await fetchTasks(token);
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) loadTasks();
  }, [token, loadTasks]);

  const createTask = async (taskData) => {
    try {
      const { data } = await addTask(taskData, token);
      setTasks([...tasks, data.task]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId, updatedTaskData) => {
    try {
      const { data } = await editTask(taskId, updatedTaskData, token);
      setTasks(tasks.map(task => task.id === taskId ? data.task : task));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter(task => task.id !== taskId));
      
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
