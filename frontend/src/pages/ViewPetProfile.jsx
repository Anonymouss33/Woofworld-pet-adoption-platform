import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/api';
import CustomerNavbar from '../components/CustomerNavbar'; // Import CustomerNavbar

const ViewPetProfile = () => {
    const { petId } = useParams(); // Extract pet ID from URL
    const [pet, setPet] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [adoptionMessage, setAdoptionMessage] = useState('');
    const [adoptionStatus, setAdoptionStatus] = useState('');

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await axios.get(`/pets/${petId}`); // Fetch pet details from backend
                setPet(response.data); // Save pet details in state
            } catch (err) {
                setError('Error fetching pet details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchPetDetails();
    }, [petId]);

    const handleAdoptionRequest = async () => {
        try {
            const response = await axios.post(`/adoption/${petId}`, {
                message: adoptionMessage,
            });
            setAdoptionStatus('Adoption request submitted successfully!');
        } catch (err) {
            setAdoptionStatus(
                err.response?.data?.message || 'Failed to submit adoption request.'
            );
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading pet details...</p>;
    }

    if (error) {
        return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
    }

    if (!pet) {
        return <p style={{ textAlign: 'center' }}>Pet not found.</p>;
    }

    return (
        <div
            style={{
                backgroundImage: "url('/images/lala.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <CustomerNavbar /> {/* Add CustomerNavbar here */}
            <div style={styles.container}>
                <h1 style={styles.title}>{pet.name}</h1>
                <div style={styles.imageContainer}>
                    {pet.images && pet.images.length > 0 ? (
                        pet.images.map((image, index) => (
                            <img
                                key={index}
                                src={`${
                                    image.startsWith('http')
                                        ? image
                                        : `http://localhost:3000/${image}`
                                }`}
                                alt={`${pet.name} image ${index + 1}`}
                                style={styles.image}
                            />
                        ))
                    ) : (
                        <p style={styles.noImageText}>No images available</p>
                    )}
                </div>
                <div style={styles.details}>
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <p><strong>Age:</strong> {pet.age} years</p>
                    <p><strong>Description:</strong> {pet.description}</p>
                    <p><strong>Location:</strong> {pet.location}</p>
                    <p><strong>Size:</strong> {pet.size}</p>
                    <p><strong>Energy Level:</strong> {pet.energy_level}</p>
                    <p><strong>Care Cost:</strong> ₹{pet.care_cost} / month</p>
                    <p><strong>Compatibility:</strong> {pet.compatibility.join(', ')}</p>
                    <p><strong>Contact Email:</strong> {pet.email}</p>
                    <p><strong>Contact Phone:</strong> {pet.phone}</p>
                </div>
                <div style={styles.adoptionSection}>
                    <h3 style={styles.adoptionTitle}>Request Adoption</h3>
                    <textarea
                        style={styles.textarea}
                        value={adoptionMessage}
                        onChange={(e) => setAdoptionMessage(e.target.value)}
                        placeholder="Write a message to the pet's owner..."
                    ></textarea>
                    <button style={styles.adoptionButton} onClick={handleAdoptionRequest}>
                        Submit Adoption Request
                    </button>
                    {adoptionStatus && <p style={styles.adoptionStatus}>{adoptionStatus}</p>}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
        color: '#333',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        flexWrap: 'wrap',
        marginBottom: '20px',
    },
    image: {
        width: '250px',
        height: '250px',
        objectFit: 'cover',
        borderRadius: '50%', // Make images circular
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
    },
    noImageText: {
        color: 'gray',
        fontSize: '1rem',
        marginBottom: '10px',
    },
    details: {
        textAlign: 'left',
        lineHeight: '1.8',
        fontSize: '1.2rem',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    adoptionSection: {
        marginTop: '30px',
        textAlign: 'left',
    },
    adoptionTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    textarea: {
        width: '100%',
        minHeight: '100px',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '15px',
        fontSize: '1rem',
    },
    adoptionButton: {
        padding: '10px 20px',
        backgroundColor: '#FF6347',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    adoptionStatus: {
        marginTop: '10px',
        color: 'green',
        fontWeight: 'bold',
    },
};

export default ViewPetProfile;
