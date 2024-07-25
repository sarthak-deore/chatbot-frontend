import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AuthProvider from "./context/AuthContext";
import Chat from "./components/Chat";
import Verify from "./components/OTP";
import Home from "./components/Home"; // Import the Home component
import "./App.css";
import { ChatProvider } from "./context/ChatContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <AuthProvider>
        <ChatProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Router>
        </ChatProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
