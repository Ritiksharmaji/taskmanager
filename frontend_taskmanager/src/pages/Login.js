import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ useNavigate inside a component

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    const success = await login({ email, password });

    if (success) {
      navigate("/dashboard"); // ✅ Redirect only on successful login
    } else {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
