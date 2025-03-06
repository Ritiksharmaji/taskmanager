import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();  

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = async (credentials) => {
    try {
      const { data } = await loginUser(credentials);
      console.log("Login Response:", data);

      setToken(data.token);
      setUser({
        username: data.user.username,
        email: data.user.email,
        profileImage: data.user.profileImage || "https://th.bing.com/th/id/OIP.KnbpXB9cvYR3epwfrzu_wAHaI3?rs=1&pid=ImgDetMain", 
      });

      return data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
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
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');  
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
