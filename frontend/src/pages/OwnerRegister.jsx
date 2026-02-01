import React, { useState } from "react";
import axios from "../utils/api"; // Ensure axios is properly configured
import { useNavigate } from "react-router-dom";

const OwnerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/owners/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const ownerId = response.data.ownerId || response.data.id;
      if (ownerId) {
        alert(`Registration successful! Your Owner ID is: ${ownerId}`);
        navigate("/add-pet");
      } else {
        throw new Error("Owner ID not found in the response.");
      }
    } catch (err) {
      console.error("Registration error:", err.response || err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#333",
            animation: "fadeIn 1.5s ease-in-out",
          }}
          className="animated-title"
        >
          Owner Registration
        </h2>
        {error && (
          <p style={{ color: "red", fontSize: "1rem", marginBottom: "1rem" }}>
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "1.2rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "1.2rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
              padding: "1.2rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              padding: "1.2rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "1.2rem",
              fontSize: "1.2rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#FF5733",
              color: "white",
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e04c2c")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF5733")}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
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

export default OwnerRegister;
