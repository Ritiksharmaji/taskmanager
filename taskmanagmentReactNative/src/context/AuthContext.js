import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../apis/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load token & user on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load auth data", error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // 🔹 Save token & user when changed
  useEffect(() => {
    const saveAuthData = async () => {
      try {
        if (token && user) {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Failed to save auth data", error);
      }
    };

    saveAuthData();
  }, [token, user]);

  // 🔹 Login
  const login = async (credentials) => {
    try {
      const { data } = await loginUser(credentials);

      setToken(data.token);
      setUser({
        username: data.user.username,
        email: data.user.email,
        profileImage:
          data.user.profileImage ||
          "https://th.bing.com/th/id/OIP.KnbpXB9cvYR3epwfrzu_wAHaI3",
      });

      return data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // 🔹 Register
  const register = async (newUser) => {
    try {
      const { data } = await registerUser(newUser);
      return data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
