import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchTasks, addTask, deleteTask } from "../services/api";
import AuthContext from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async () => {
    try {
      const { data } = await fetchTasks(token);
      console.log("data from fetchTasks",data);
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks", error);
    }
  }, [token]); // ✅ Dependencies are now stable

  useEffect(() => {
    if (token) loadTasks();
  }, [token, loadTasks]); // ✅ No more warning

  const createTask = async (taskData) => {
    try {
      const { data } = await addTask(taskData, token);
      setTasks([...tasks, data.task]);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, removeTask }}>
      {children}
    </TaskContext.Provider>
    
  );
};

export default TaskContext;
