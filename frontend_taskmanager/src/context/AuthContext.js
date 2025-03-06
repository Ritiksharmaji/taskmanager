import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const { data } = await loginUser(credentials);
      console.log("Full API Response:", data);

      setToken(data.token);
      setUsername(data.user.username); 

      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return false;
    }
  };

  const register = async (newUser) => {
    try {
      const { data } = await registerUser(newUser);
      console.log("Registration Response:", data);
      return data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      return false;
    }
  };

  const logout = () => {
    setUsername(null);
    setToken("");
    localStorage.removeItem("token");
    navigate('/login');

  };

  return (
    <AuthContext.Provider value={{ username, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
