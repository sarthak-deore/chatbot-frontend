import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "./Form.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;
    if (password.length < 7) {
      setPasswordError("Password must be at least 7 characters long.");
      return false;
    }
    if (password.includes("password")) {
      setPasswordError('Password cannot contain the word "password".');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      // Clear password fields if there is a validation error
      setFormData({ ...formData, password: "", confirmPassword: "" });
      return;
    }
    try {
      await register(formData);
      toast.success("Registered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Email already in use!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Clear the form fields
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <p className="password-description">
        * OTP will be sent to verify your email
      </p>
      {passwordError && <p className="error-message">{passwordError}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
