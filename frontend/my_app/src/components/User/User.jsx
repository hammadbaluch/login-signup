import React, { useEffect, useState } from "react";

const User = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setProfile(data);
        } else {
          alert(data.msg || "Unauthorized");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

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
              window.location.href = "/login";
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
