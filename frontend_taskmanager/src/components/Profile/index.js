import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function UserProfile() {
   const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();


     const handleLogout = () => {
        logout(); 
        navigate('/login'); 
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="user-profile-container">
       <div className="user-profile">
          <img src={user?.profileImage} alt="User Profile" className="profile-image" />
          <h3>{user?.username}</h3>
          <p>{user?.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}
