import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtp, mail } from "../api";
import "./Form.css";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await mail();
      toast.success("OTP sent to your email!", {
        position: "top-right",
        autoClose: 3000,
      });
      setOtpSent(true);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Failed to send OTP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp({ otp });
      toast.success("OTP verified successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/chat"); // Redirect to chat page after successful verification
      window.location.reload();
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("Incorrect OTP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      setOtp("");
    }
  };

  return (
    <div className="verify-container">
      <form onSubmit={handleSubmit} className="verify-form">
        <h1>Verify Email</h1>
        <button
          type="button"
          onClick={handleSendOtp}
          className={`otp-button ${otpSent ? "otp-sent" : ""}`}
          disabled={otpSent}
        >
          {otpSent ? "OTP Sent" : "Send OTP"}
        </button>
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="form-input"
          disabled={!otpSent}
        />
        <button type="submit" disabled={!otpSent}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verify;
