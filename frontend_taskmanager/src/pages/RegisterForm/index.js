import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import AuthContext from "../../context/AuthContext";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg || "Something went wrong. Please try again.");
  };

  const validateForm = () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return "All fields are required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      onSubmitFailure(validationError);
      return;
    }

    const userDetails = { username, email, password };

    try {
      const response = await register(userDetails);

      if (response && response.userId !== undefined) {
        navigate("/login");
      } else {
        onSubmitFailure("Registration failed. Please try again.");
      }
    } catch (error) {
      onSubmitFailure("Network error. Please try again.");
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <h2 className="form-title">Register</h2>
        <form className="form-container" onSubmit={onSubmitForm}>
          <div className="input-container">
            <label className="label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="user-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="user-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="user-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              className="user-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="login-button" type="submit">
            Register
          </button>

          {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
        </form>
        <p className="switch-auth">Already have an account? <a href="/login">Login</a></p>
      </div>
      <div className="image-section">
        <img
          src="https://img.freepik.com/free-vector/project-manager-concept-illustration_114360-21568.jpg"
          alt="registration visual"
          className="auth-image"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
