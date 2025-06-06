import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchTasks, addTask, deleteTask, editTask } from "../services/api";
import AuthContext from "./AuthContext";
import { useWebSocket } from "./WebSocketContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const socket = useWebSocket();

  const loadTasks = useCallback(async () => {
    try {
      const { data } = await fetchTasks(token);
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) loadTasks();
  }, [token, loadTasks]);

  useEffect(() => {
    if (!socket) return;

    socket.on('taskCreated', (newTask) => {
      setTasks(prev => [...prev, newTask]);
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks(prev => prev.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      ));
    });

    socket.on('taskDeleted', (taskId) => {
      setTasks(prev => prev.filter(task => task._id !== taskId));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, [socket]);

  const createTask = async (taskData) => {
    try {
      await addTask(taskData, token);
      // The actual addition will be handled via WebSocket event
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId, updatedTaskData) => {
    try {
      await editTask(taskId, updatedTaskData, token);
      // The actual update will be handled via WebSocket event
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      // The actual deletion will be handled via WebSocket event
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