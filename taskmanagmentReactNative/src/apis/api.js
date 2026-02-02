import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://taskmanager-phi-six.vercel.app/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Automatically attach token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔐 Auth APIs
export const registerUser = (userData) =>
  api.post("/auth/register", userData);

export const loginUser = (userData) =>
  api.post("/auth/login", userData);

// 📋 Task APIs
export const fetchTasks = () => api.get("/tasks");

export const addTask = (taskData) =>
  api.post("/tasks", taskData);

export const editTask = (taskId, updatedTaskData) =>
  api.put(`/tasks/${taskId}`, updatedTaskData);

export const deleteTask = (taskId) =>
  api.delete(`/tasks/${taskId}`);
