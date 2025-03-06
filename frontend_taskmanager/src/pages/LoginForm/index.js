import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import AuthContext from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useContext(AuthContext);
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

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      onSubmitFailure("Email and password cannot be empty.");
      return;
    }

    const userDetails = { email, password };

    try {
      const response = await login(userDetails);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } else {
        onSubmitFailure(response.error || "Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        onSubmitFailure(error.response.data.error);
      } else {
        onSubmitFailure("Network error. Please try again.");
      }
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left Side - Image */}
        <div className="auth-image">
          <img
            src="https://img.freepik.com/free-vector/project-manager-concept-illustration_114360-21568.jpg"
            alt="Login illustration"
          />
        </div>
        
        {/* Right Side - Form */}
        <div className="auth-form">
          <div className="heading">
            <h2>Login</h2>
          </div>
          <form className="form-container" onSubmit={onSubmitForm}>
            <div className="input-container">
              <label className="label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="user-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <label className="label" htmlFor="password">Password</label>
              <input
                className="user-input"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" type="submit">
              Login
            </button>

            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
          <p className="switch-auth">Don't have an account? <a href="/register">
           Register
          </a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
