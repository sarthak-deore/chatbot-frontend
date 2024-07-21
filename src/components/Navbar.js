import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import { logoutAll } from "../api";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAll(); // Ensure session logged out
      logout(); // Log out current session
      navigate("/"); // Redirect to Home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <nav>
      {!isAuthenticated ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/register">Sign up</Link>
          <Link to="/login">Log in</Link>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>

          <div className="nav-right">
            <Link to="/chat">Chat</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
