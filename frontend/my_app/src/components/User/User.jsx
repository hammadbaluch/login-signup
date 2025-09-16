import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("https://login-signup-hammad.up.railway.app/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

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
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>User Dashboard</h1>
      {profile ? (
        <div>
          <p><strong>ID:</strong> {profile._id}</p>
          <p><strong>Full Name:</strong> {profile.fullName}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default User;
