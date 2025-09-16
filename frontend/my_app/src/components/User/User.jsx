import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon, Phone, Hash } from "lucide-react";
import "./User.css";

const User = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://login-signup-hammad.up.railway.app/api/user/profile",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setProfile(data);
        } else {
          alert(data.msg || "Unauthorized");
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (loading) {
    return (
      <div className="user-container">
        <div className="card glass-card">
          <div className="skeleton avatar-skeleton"></div>
          <div className="skeleton text-skeleton large"></div>
          <div className="skeleton text-skeleton small"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-container">
      <div className="profile-wrapper">
        <div className="header">
          <h1>Dashboard</h1>
          <p>Welcome back to your profile</p>
        </div>

        {profile ? (
          <div className="card glass-card">
            <div className="avatar-wrapper">
              <div className="avatar">{getInitials(profile.fullName)}</div>
              <div className="status-dot"></div>
            </div>
            <h2>{profile.fullName}</h2>
            <p className="subtitle">User Profile</p>

            <div className="info-section">
              <div className="info-box">
                <Hash className="icon" />
                <div>
                  <p className="label">User ID</p>
                  <p className="value">{profile._id}</p>
                </div>
              </div>

              <div className="info-box">
                <UserIcon className="icon" />
                <div>
                  <p className="label">Full Name</p>
                  <p className="value">{profile.fullName}</p>
                </div>
              </div>

              <div className="info-box">
                <Phone className="icon" />
                <div>
                  <p className="label">Contact</p>
                  <p className="value">{profile.contact}</p>
                </div>
              </div>
            </div>

            <button onClick={handleLogout} className="logout-btn">
              <LogOut className="icon" />
              Logout
            </button>
          </div>
        ) : (
          <div className="card glass-card">
            <p className="error">Failed to load profile</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
