import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import OwnerNavbar from "../components/OwnerNavbar"; // Import the OwnerNavbar component

const OwnerDashboard = () => {
  const [owner, setOwner] = useState({});
  const [pets, setPets] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ownerResponse = await axios.get("/owners/me");
        setOwner(ownerResponse.data);

        const petsResponse = await axios.get("/owners/pets");
        setPets(petsResponse.data);

        const adoptionRequestsResponse = await axios.get("/adoption/owner");
        setAdoptionRequests(adoptionRequestsResponse.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEditPet = (petId) => {
    navigate(`/edit-pet/${petId}`);
  };

  const handleDeletePet = async (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await axios.delete(`/owners/pets/${petId}`);
        setPets(pets.filter((pet) => pet._id !== petId));
        alert("Pet deleted successfully!");
      } catch (err) {
        console.error("Error deleting pet:", err);
        alert("Failed to delete the pet. Please try again.");
      }
    }
  };

  const handleUpdateRequestStatus = async (requestId, status) => {
    try {
      const response = await axios.put(`/adoption/${requestId}`, { status });
      setAdoptionRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status: response.data.request.status } : req
        )
      );
      alert(`Request status updated to: ${status}`);
    } catch (err) {
      console.error("Error updating request status:", err);
      alert("Failed to update request status. Please try again.");
    }
  };

  if (loading) {
    return <p style={styles.loading}>Loading dashboard...</p>;
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
      <OwnerNavbar />
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Welcome, {owner.name}</h1>
          {owner.profileImage ? (
            <img
              src={`http://localhost:3000${owner.profileImage}`}
              alt="Owner Profile"
              style={styles.profileImage}
            />
          ) : (
            <p>.</p>
          )}
        </header>

        <main style={styles.main}>
          {/* My Pets Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>My Pets</h2>
            <button
              onClick={() => navigate("/add-pet")}
              style={styles.addPetButton}
            >
              Add New Pet
            </button>
            {pets.length > 0 ? (
              <div style={styles.petGrid}>
                {pets.map((pet) => (
                  <div key={pet._id} style={styles.petCard}>
                    <img
                      src={`http://localhost:3000/${pet.images[0]}`}
                      alt={pet.name}
                      style={styles.petImage}
                    />
                    <h3 style={styles.petName}>{pet.name}</h3>
                    <p style={styles.petDetail}>
                      <strong>Breed:</strong> {pet.breed}
                    </p>
                    <p style={styles.petDetail}>
                      <strong>Age:</strong> {pet.age} years
                    </p>
                    <p style={styles.petDetail}>
                      <strong>Location:</strong> {pet.location}
                    </p>
                    <p style={styles.petDetail}>
                      <strong>Energy Level:</strong> {pet.energy_level}
                    </p>
                    <button
                      onClick={() => handleEditPet(pet._id)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePet(pet._id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No pets found. Add some to get started!</p>
            )}
          </section>

          {/* Adoption Requests Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Adoption Requests</h2>
            {adoptionRequests.length > 0 ? (
              <ul style={styles.requestList}>
                {adoptionRequests.map((request) => (
                  <li key={request._id} style={styles.requestCard}>
                    <h3 style={styles.requestTitle}>Pet: {request.pet.name}</h3>
                    <p style={styles.requestDetail}>
                      <strong>Adopter:</strong> {request.customer.name}
                    </p>
                    <p style={styles.requestDetail}>
                      <strong>Email:</strong> {request.customer.email}
                    </p>
                    <p style={styles.requestDetail}>
                      <strong>Message:</strong> {request.message}
                    </p>
                    <p style={styles.requestDetail}>
                      <strong>Status:</strong> {request.status}
                    </p>
                    <div style={styles.requestActions}>
                      <button
                        style={styles.approveButton}
                        onClick={() => handleUpdateRequestStatus(request._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        style={styles.rejectButton}
                        onClick={() => handleUpdateRequestStatus(request._id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No adoption requests at the moment.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
        backgroundImage: "url('/images/lala.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    header: {
        marginBottom: "20px",
        textAlign: "center",
        color: "#d92773", // Change header text color to a red shade
    },
    profileImage: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        objectFit: "cover",
        margin: "10px auto",
    },
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    section: {
        width: "100%",
        maxWidth: "1200px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "white", // Changed pink to white
        marginBottom: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Added subtle shadow for elegance
    },
    addPetButton: {
        marginBottom: "20px",
        padding: "20px 30px",
        backgroundColor: "#8b0008", // Change add button to red
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    petGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Enlarge pet cards
        gap: "20px",
    },
    petCard: {
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    petImage: {
        width: "300px", // Enlarged pet images
        height: "300px",
        objectFit: "cover",
        borderRadius: "50%",
    },
    requestList: {
        listStyleType: "none",
        padding: 0,
    },
    requestCard: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "white",
    },
    requestActions: {
        display: "flex",
        gap: "10px",
    },
    approveButton: {
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    rejectButton: {
        padding: "10px 20px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    navbar: {
        backgroundColor: "#d92773", // Changed navbar color to red
        padding: "10px",
        textAlign: "center",
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "bold",
    },
};
export default OwnerDashboard;
