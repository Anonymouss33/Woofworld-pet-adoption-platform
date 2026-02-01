import React, { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    email: "",
    phone: "",
    location: "",
    size: "",
    energy_level: "",
    care_cost: "",
    compatibility: [], // ⬅️ ARRAY for checkboxes
    images: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Normal input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // File handler
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  // ✅ Compatibility checkbox handler
  const handleCompatibilityChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      compatibility: checked
        ? [...prev.compatibility, value]
        : prev.compatibility.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images" && formData.images) {
        Array.from(formData.images).forEach((file) =>
          data.append("images", file)
        );
      } else if (key === "compatibility") {
        // ✅ Send as comma-separated string (backend already handles this)
        data.append("compatibility", formData.compatibility.join(","));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post("/owners/pets", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Pet added successfully!");
      navigate("/owner-dashboard");
    } catch (err) {
      console.error("Error adding pet:", err.response || err);
      setError(err.response?.data?.message || "Failed to add pet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add a Pet</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="age"
          placeholder="Age (years)"
          value={formData.age}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <input
          type="email"
          name="email"
          placeholder="Contact Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="phone"
          placeholder="Contact Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* ✅ SIZE DROPDOWN */}
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        {/* ✅ ENERGY LEVEL DROPDOWN */}
        <select
          name="energy_level"
          value={formData.energy_level}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Energy Level</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        <input
          type="number"
          name="care_cost"
          placeholder="Care Cost (₹/month)"
          value={formData.care_cost}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* ✅ COMPATIBILITY OPTIONS */}
        <div style={styles.checkboxGroup}>
          <label><strong>Compatibility</strong></label>

          <label>
            <input
              type="checkbox"
              value="Kids"
              onChange={handleCompatibilityChange}
            /> Kids
          </label>

          <label>
            <input
              type="checkbox"
              value="Other Pets"
              onChange={handleCompatibilityChange}
            /> Other Pets
          </label>

          <label>
            <input
              type="checkbox"
              value="Apartments"
              onChange={handleCompatibilityChange}
            /> Apartments
          </label>
        </div>

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          required
          style={styles.fileInput}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Adding..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('/images/omg.jpg')",
    backgroundSize: "cover",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#fff",
    marginBottom: "1rem",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "400px",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "30px",
    borderRadius: "10px",
  },
  input: {
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "1rem",
    height: "100px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  fileInput: {
    padding: "0.5rem",
  },
  button: {
    padding: "1rem",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default AddPet;
