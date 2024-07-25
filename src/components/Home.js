import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Optional: Add styling
import { getProfile } from "../api";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) {
        return;
      }
      try {
        const response = await getProfile();
        if (response.status === 200) {
          setProfile("ok");
          if (response.data.verified) {
            setIsVerified(true);
          } else {
            setIsVerified(false);
          }
        } else {
          setProfile(null);
        }
      } catch (err) {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleVerifyEmail = () => {
    navigate("/verify");
  };

  const handleChat = () => {
    navigate("/chat");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  if (profile === null) {
    return (
      <div className="home-container">
        <h1>Welcome to the Chatbot App</h1>
        <p>
          Please{" "}
          <button className="inline-button" onClick={handleSignup}>
            Sign up
          </button>{" "}
          or{" "}
          <button className="inline-button" onClick={handleLogin}>
            Log in
          </button>
          to access the chat functionality.
        </p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>Welcome to the Chatbot App</h1>
      {isVerified ? (
        <div>
          <p>
            <button className="inline-button" onClick={handleChat}>
              Chat with the Bot
            </button>
            <br />
            <br />
            <button className="inline-button" onClick={handleProfile}>
              Manager Profile
            </button>
          </p>
        </div>
      ) : (
        <div>
          <p>
            Please{" "}
            <button className="inline-button" onClick={handleVerifyEmail}>
              Verify Email
            </button>{" "}
            to access the chat functionality.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
