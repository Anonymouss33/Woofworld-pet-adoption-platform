import React, { useState } from "react";
import axios from "../utils/api"; // Ensure this axios instance is properly configured
import { useNavigate } from "react-router-dom";

const OwnerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("owners/login", formData);

      // Store the token in localStorage or cookies if needed
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      alert(response.data.message || "Login successful!");

      // Navigate to the owner dashboard
      navigate("/owner-dashboard", { state: { owner: response.data.owner } });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed! Check your credentials.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/owner-register");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/omg.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px", // Match Customer Login
          padding: "60px", // Match Customer Login
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          maxWidth: "400px", // Match Customer Login
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "4rem", // Match Customer Login
            fontWeight: "bold",
            marginBottom: "3rem", // Match Customer Login
            color: "#333",
            animation: "fadeIn 1.5s ease-in-out",
          }}
          className="animated-title"
        >
          Owner Login
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem", // Match Customer Login
            width: "400px", // Match Customer Login
            background: "transparent",
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "1.5rem", // Match Customer Login
              fontSize: "1.8rem", // Match Customer Login
              borderRadius: "10px", // Match Customer Login
              border: "1px solid #ddd",
              width: "100%", // Match Customer Login
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              color: "#333",
              backgroundColor: "#f9f9f9", // Match Customer Login
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: "1.5rem", // Match Customer Login
              fontSize: "1.8rem", // Match Customer Login
              borderRadius: "10px", // Match Customer Login
              border: "1px solid #ddd",
              width: "100%", // Match Customer Login
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              color: "#333",
              backgroundColor: "#f9f9f9", // Match Customer Login
            }}
          />
          {error && (
            <p style={{ color: "red", fontSize: "1.2rem", marginBottom: "-10px" }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: "1.5rem", // Match Customer Login
              fontSize: "1.8rem", // Match Customer Login
              color: "#fff",
              backgroundColor: "#FF6347",
              border: "none",
              borderRadius: "10px", // Match Customer Login
              cursor: "pointer",
              width: "200px", // Match Customer Login
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF4500")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF6347")}
          >
            Login
          </button>
        </form>
        <p
          style={{
            marginTop: "2rem",
            fontSize: "1.5rem", // Match Customer Login
            color: "#333",
          }}
        >
          New Owner?{" "}
          <span
            style={{
              color: "#FF6347",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.5rem", // Match Customer Login
            }}
            onClick={handleRegisterClick}
          >
            Register here
          </span>
        </p>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          .animated-title {
            animation: fadeIn 1.5s ease-in-out;
            background: linear-gradient(to right, #FF4500, #FFD700);
            -webkit-background-clip: text;
            color: transparent;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default OwnerLogin;
