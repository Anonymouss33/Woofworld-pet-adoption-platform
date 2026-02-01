import React, { useState } from "react";
import axios from "../utils/api"; // Ensure axios is configured properly
import { useNavigate } from "react-router-dom";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    income_bracket: "",
    housing_type: "",
    work_hours: "",
    household_composition: "",
    activity_level: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("customers/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        income_bracket: parseInt(formData.income_bracket, 10),
        housing_type: formData.housing_type,
        work_hours: formData.work_hours,
        household_composition: formData.household_composition,
        activity_level: formData.activity_level,
      });

      alert(response.data.message || "Registration successful!");
      navigate("/login"); // Redirect to Customer Login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Paw prints scattered in the background */}
      {[...Array(20)].map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: "translate(-50%, -50%)",
            fontSize: `${Math.random() * 3 + 1}rem`,
            color: `hsl(${Math.random() * 360}, 70%, 80%)`,
            opacity: 0.7,
          }}
        >
          🐾
        </div>
      ))}

      <h2
        style={{
          fontSize: "2.5rem",
          color: "#333",
          marginBottom: "2rem",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
        }}
      >
        Customer Registration
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          width: "400px",
          zIndex: 1,
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
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
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
          }}
        />
        <input
          type="number"
          name="income_bracket"
          placeholder="Income Bracket"
          value={formData.income_bracket}
          onChange={handleChange}
          required
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
          }}
        />
        <select
          name="housing_type"
          value={formData.housing_type}
          onChange={handleChange}
          required
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
            background: "#fff",
          }}
        >
          <option value="">Select Housing Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Rented">Rented</option>
          <option value="Owned">Owned</option>
        </select>
        <select
          name="work_hours"
          value={formData.work_hours}
          onChange={handleChange}
          required
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
            background: "#fff",
          }}
        >
          <option value="">Select Work Hours</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
        </select>
        <input
          type="text"
          name="household_composition"
          placeholder="Household Composition"
          value={formData.household_composition}
          onChange={handleChange}
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
          }}
        />
        <select
          name="activity_level"
          value={formData.activity_level}
          onChange={handleChange}
          required
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
            background: "#fff",
          }}
        >
          <option value="">Select Activity Level</option>
          <option value="Active">Active</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
        {error && <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            color: "#fff",
            backgroundColor: "#4CAF50",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#45A049")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default CustomerRegister;
