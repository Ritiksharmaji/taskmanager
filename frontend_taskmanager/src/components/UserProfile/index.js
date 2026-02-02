import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./index.css";

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  console.log("User token:", user?.token);
  const navigate = useNavigate();

  return (
    <div className="user-section">
      <div className="user-profile">
        <img
          src={user?.profileImage || "/default-avatar.png"}
          alt="User"
          className="profile-image"
        />
        <h3>{user?.username || "N/A"}</h3>
        <p>{user?.email || "N/A"}</p>
      </div>

      <div className="user-buttons">
        <button
          className="task-manager-btn"
          onClick={() => navigate("/task-create")}
        >
          Create Task
        </button>

        <button
          className="task-manager-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
