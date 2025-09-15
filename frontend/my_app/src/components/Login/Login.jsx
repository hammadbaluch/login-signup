import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: formData.emailOrPhone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); // ✅ Save token
        window.location.href = "/user"; // ✅ Redirect to User page
      } else {
        alert(`Login failed: ${data.msg}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Main login card */}
        <div className="login-card">
          {/* Instagram logo */}
          <div className="login-logo">
            <h1>Instagram</h1>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Phone number, username or email address"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              className="login-input"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="login-input"
            />

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>

          {/* OR divider */}
          <div className="or-divider">
            <div className="or-line"></div>
            <span className="or-text">OR</span>
            <div className="or-line"></div>
          </div>

          {/* Facebook login */}
          <button className="facebook-login">
            <svg
              className="facebook-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Log in with Facebook
          </button>

          {/* Forgot password */}
          <div className="forgot-password">
            <a href="#">Forgotten your password?</a>
          </div>
        </div>

        {/* Sign up card */}
        <div className="signup-card">
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"} className="signup-link">
              Sign up
            </Link>
          </p>
        </div>

        {/* Get the app */}
        <div className="get-app">
          <p>Get the app.</p>
          <div className="app-buttons">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              alt="Get it on Google Play"
            />
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              alt="Get it from Microsoft"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
