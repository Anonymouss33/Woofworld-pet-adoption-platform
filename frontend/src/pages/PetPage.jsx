import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/api";
import CustomerNavbar from "../components/CustomerNavbar";

const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/pets/list");
        setPets(response.data);
      } catch (err) {
        setError("Error fetching pets.");
      }
    };
    fetchPets();
  }, []);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!pets.length) {
    return (
      <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#555" }}>
        No pets available for adoption at the moment.
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
        fontFamily: "'Poppins', sans-serif",
        paddingBottom: "50px",
        color: "#333",
      }}
    >
      <CustomerNavbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Available Pets for Adoption</h1>
        <button style={styles.recommendButton}>
          <Link to="/recommendations" style={styles.recommendLink}>
            View Recommended Pets
          </Link>
        </button>
        <div style={styles.grid}>
          {pets.map((pet) => (
            <div key={pet._id} style={styles.card}>
              <Link to={`/view-pet/${pet._id}`} style={styles.link}>
                {pet.images && pet.images.length > 0 ? (
                  <img
                    src={`http://localhost:3000/${pet.images[0]}`}
                    alt={pet.name}
                    style={styles.roundImage}
                  />
                ) : (
                  <p style={styles.noImageText}>No image available</p>
                )}
                <h3 style={styles.name}>{pet.name}</h3>
                <p style={styles.detail}>
                  <strong>Breed:</strong> {pet.breed}
                </p>
                <p style={styles.detail}>
                  <strong>Age:</strong> {pet.age} years
                </p>
                <p style={styles.detail}>
                  <strong>Location:</strong> {pet.location}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#FF5733",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
  },
  recommendButton: {
    marginBottom: "20px",
    padding: "15px 30px",
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "1.5rem",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  recommendLink: {
    textDecoration: "none",
    color: "#fff",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
  },
  card: {
    borderRadius: "15px",
    padding: "15px",
    width: "250px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(5px)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  roundImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "10px",
    border: "3px solid #FF5733",
  },
  noImageText: {
    color: "gray",
    fontSize: "1rem",
    marginBottom: "10px",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#FF5733",
  },
  detail: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
};

export default PetPage;
