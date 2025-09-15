import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    mobileOrEmail: "",
    password: "",
    fullName: "",
    username: "",
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
      const response = await fetch("https://login-signup-hammad.up.railway.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: formData.mobileOrEmail,
          fullName: formData.fullName,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        localStorage.setItem("token", data.token); // ✅ Save token
        window.location.href = "/user"; // ✅ Redirect to User page
      } else {
        alert(`Signup failed: ${data.msg}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Main signup card */}
        <div className="signup-main-card">
          {/* Instagram logo */}
          <div className="signup-logo">
            <h1>Hamv5d</h1>
          </div>

          {/* Subtitle */}
          <div className="signup-subtitle">
            <p>Sign up to see photos and videos from your friends.</p>
          </div>

          {/* Facebook signup */}
          <button className="facebook-signup">
            <svg
              className="facebook-signup-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Log in with Facebook
          </button>

          {/* OR divider */}
          <div className="signup-or-divider">
            <div className="signup-or-line"></div>
            <span className="signup-or-text">OR</span>
            <div className="signup-or-line"></div>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="mobileOrEmail"
              placeholder="Mobile number or email address"
              value={formData.mobileOrEmail}
              onChange={handleInputChange}
              className="signup-input"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="signup-input"
            />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="signup-input"
            />

            {/* <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="signup-input"
            /> */}

            {/* Privacy notice */}
            <div className="privacy-notice">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram. <a href="#">Learn more</a>
              </p>
            </div>

            {/* Terms notice */}
            <div className="terms-notice">
              <p>
                By signing up, you agree to our <a href="#">Terms</a>,{" "}
                <a href="#">Privacy Policy</a> and{" "}
                <a href="#">Cookies Policy</a>.
              </p>
            </div>

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>

        {/* Login card */}
        <div className="login-card-bottom">
          <p>
            Have an account?{" "}
            <Link to={"/"} className="login-link">
              Log In
            </Link>
          </p>
        </div>

        {/* Get the app */}
        <div className="get-app-signup">
          <p>Get the app.</p>
          <div className="app-buttons-signup">
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

export default SignUp;
