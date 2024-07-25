import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import { logoutAll, getProfile } from "../api";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if (profile && typeof profile.data.verified !== "undefined") {
          setIsVerified(profile.data.verified);
        } else {
          console.log("Profile or verified status is undefined");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logoutAll();
      logout(); // Log out current session
      navigate("/"); // Redirect to Home page after logout
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav>
      {!isAuthenticated ? (
        <>
          <Link className={getNavLinkClass("/")} to="/">
            Home
          </Link>
          <Link className={getNavLinkClass("/register")} to="/register">
            Sign up
          </Link>
          <Link className={getNavLinkClass("/login")} to="/login">
            Log in
          </Link>
        </>
      ) : (
        <>
          <Link className={getNavLinkClass("/")} to="/">
            Home
          </Link>

          <div className="nav-right">
            {isVerified && (
              <Link className={getNavLinkClass("/chat")} to="/chat">
                Chat
              </Link>
            )}
            <Link className={getNavLinkClass("/profile")} to="/profile">
              Profile
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
