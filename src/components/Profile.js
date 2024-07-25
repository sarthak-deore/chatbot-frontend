import React, { useEffect, useState } from "react";
import { getProfile } from "../api";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isVerified, setVerified] = useState(false);

  const handleVerifyEmail = () => {
    navigate("/verify");
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
        if (response.data.verified) {
          setVerified(true);
        }
      } catch (error) {
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <div>
          <strong>Verified:</strong> {user.verified ? "Yes" : "No"}
          <br />
          <br />
          {!isVerified ? (
            <div>
              <button className="verify-button" onClick={handleVerifyEmail}>
                Verify Email
              </button>
              <br />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
