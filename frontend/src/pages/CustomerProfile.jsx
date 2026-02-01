import React, { useState } from "react";
import axios from "../utils/api"; // Ensure axios instance is configured
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar"; // Import CustomerNavbar

const CustomerProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    income_bracket: "",
    housing_type: "",
    work_hours: "",
    household_composition: "",
    activity_level: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/customers/register", formData);
      alert("Profile created successfully!");
      navigate("/pets"); // Navigate to the PetPage
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: `url('/images/lala.jpg')`, // Add your background image here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <CustomerNavbar /> {/* Navbar fixed at the top */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "70px", // Adjust to account for the navbar height
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            color: "#333",
            marginBottom: "2rem",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          Create Your Profile
        </h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="income_bracket"
            placeholder="Income Bracket (₹)"
            value={formData.income_bracket}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select
            name="housing_type"
            value={formData.housing_type}
            onChange={handleChange}
            required
            style={styles.input}
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
            style={styles.input}
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
            required
            style={styles.input}
          />
          <select
            name="activity_level"
            value={formData.activity_level}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Activity Level</option>
            <option value="Active">Active</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    width: "400px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent form background
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
  },
  input: {
    padding: "15px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
  },
  button: {
    padding: "15px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#FF4500", // Button color
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
};

export default CustomerProfile;
