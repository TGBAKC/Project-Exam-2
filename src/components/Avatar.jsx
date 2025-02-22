import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!avatarUrl.trim()) {
      alert("❌ Please enter a valid image URL!");
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");
  
    if (!user || !user.name) {
      alert("❌ User not found! Please log in again.");
      navigate("/login");
      return;
    }
  
    if (!token) {
      alert("❌ Authentication token missing! Please log in again.");
      navigate("/login");
      return;
    }
  
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatar: {
              url: avatarUrl,
              alt: "User avatar",
            },
          }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "❌ Failed to update avatar.");
      }
  
      // Kullanıcıyı güncelle
      const updatedUser = { ...user, avatar: { url: avatarUrl, alt: "User avatar" } };
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      alert("✅ Avatar updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error updating avatar:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };
  
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Update Avatar</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Avatar
        </button>
      </form>
    </div>
  );
};

// ✅ `export default` en altta olmalı!
export default Avatar;
