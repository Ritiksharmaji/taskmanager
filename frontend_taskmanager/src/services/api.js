import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your backend URL

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const fetchTasks = async (token) => {
  console.log("token during fetchTasks the task from clinet side",token);
  return axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addTask = async (taskData, token) => {
  return axios.post(`${API_URL}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (taskId, token) => {
  return axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
