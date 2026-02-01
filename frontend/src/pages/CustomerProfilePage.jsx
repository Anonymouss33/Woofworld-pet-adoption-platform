import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import CustomerNavbar from "../components/CustomerNavbar"; // Import the CustomerNavbar component

const CustomerProfilePage = () => {
  const [customer, setCustomer] = useState(null);
  const [adoptionRequests, setAdoptionRequests] = useState([]); // Add state for adoption requests
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get("/customers/me");
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setCustomer(null);
      }
    };

    const fetchAdoptionRequests = async () => {
      try {
        const response = await axios.get("/adoption/customers/adoption-requests"); // Fetch adoption requests
        setAdoptionRequests(response.data); // Store adoption requests in state
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
      }
    };

    Promise.all([fetchCustomerData(), fetchAdoptionRequests()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadError("");
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const response = await axios.post("/customers/upload-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the profileImage in the local state
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        profileImage: response.data.profileImage,
      }));
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setUploadError("Failed to upload profile image. Please try again.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "1.8rem" }}>Loading...</p>;
  }

  if (!customer) {
    return (
      <p style={{ textAlign: "center", color: "red", fontSize: "1.8rem" }}>
        Failed to load customer data. Please try again later.
      </p>
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url('/images/lala.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Navigation Bar */}
      <CustomerNavbar />

      {/* Profile Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Blend with the background
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "3000px",
          margin: "200px auto",
        }}
      >
        {/* Profile Image */}
        <div
          style={{
            flex: "0 0 auto",
            marginRight: "30px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={
              customer.profileImage
                ? `http://localhost:3000${customer.profileImage}`
                : "https://via.placeholder.com/300"
            }
            alt="Profile"
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #007bff",
            }}
          />
        </div>
        {/* Profile Details */}
        <div style={{ flex: "1", marginLeft: "400px" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "40px" }}>My Profile</h1>
          <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>
            <strong>Name:</strong> {customer.name}
          </p>
          <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>
            <strong>Income Bracket:</strong> ₹{customer.income_bracket}
          </p>
          <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>
            <strong>Work Hours:</strong> {customer.work_hours}
          </p>
          <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>
            <strong>Email:</strong> {customer.email}
          </p>
          <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>
            <strong>Housing Type:</strong> {customer.housing_type}
          </p>
          <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>
            <strong>Household Composition:</strong>{" "}
            {customer.household_composition}
          </p>
          <button
            onClick={() => navigate("/edit-customer-profile")}
            style={{
              backgroundColor: "#FF5733",
              color: "white",
              padding: "15px 25px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
              fontSize: "1.5rem",
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Upload Section */}
      {!customer.profileImage && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleImageUpload} style={{ marginLeft: "10px" }}>
            Upload Image
          </button>
          {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
        </div>
      )}

      {/* Adoption Requests Section */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Blend with the background
          borderRadius: "10px",
          padding: "30px",
          maxWidth: "1000px",
          marginLeft: "1590px",
          marginTop: "-750px",
        }}
      >
        <h2 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Adoption Requests
        </h2>
        {adoptionRequests.length > 0 ? (
          <ul>
            {adoptionRequests.map((request) => (
              <li key={request._id}>
                <p>
                  <strong>Pet Name:</strong> {request.pet.name}
                </p>
                <p>
                  <strong>Status:</strong> {request.status}
                </p>
                <p>
                  <strong>Message:</strong> {request.message}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
            No adoption requests found.
          </p>
        )}
        <button
          onClick={() => navigate("/pets")}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "15px 25px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          Browse More Pets
        </button>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
