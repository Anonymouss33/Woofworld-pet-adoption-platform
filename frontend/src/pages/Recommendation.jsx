import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import CustomerNavbar from '../components/CustomerNavbar'; // Import the Navbar component

const RecommendationPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('/recommendations');
                setRecommendations(response.data.recommendations);
            } catch (err) {
                setError('Error fetching recommendations.');
            }
        };
        fetchRecommendations();
    }, []);

    if (error) {
        return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
    }

    if (!recommendations.length) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>No recommendations available at the moment.</p>
                <button
                    onClick={() => navigate('/pets')}
                    style={styles.backButton}
                >
                    Go Back
                </button>
            </div>
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
                color: "#333",
                paddingBottom: "50px",
            }}
        >
            {/* Navbar */}
            <CustomerNavbar />

            <div style={styles.container}>
                <h1 style={styles.title} className="animated-title">
                    Recommended Pets for You
                </h1>
                <div style={styles.list}>
                    {recommendations.map((pet) => (
                        <div key={pet._id} style={styles.card}>
                            <Link to={`/view-pet/${pet._id}`} style={styles.link}>
                                {pet.images && pet.images.length > 0 ? (
                                    <img
                                        src={`http://localhost:3000/${pet.images[0]}`}
                                        alt={pet.name}
                                        style={styles.image}
                                    />
                                ) : (
                                    <p style={styles.noImageText}>No image available</p>
                                )}
                                <h3 style={styles.name}>{pet.name}</h3>
                                <p style={styles.detail}><strong>Breed:</strong> {pet.breed}</p>
                                <p style={styles.detail}><strong>Age:</strong> {pet.age} years</p>
                                <p style={styles.detail}><strong>Location:</strong> {pet.location}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => navigate('/pets')}
                    style={styles.backButton}
                >
                    Not Interested? Go Back
                </button>
            </div>

            {/* Animation Styles */}
            <style>
                {`
                    .animated-title {
                        animation: fadeIn 2s ease-in-out;
                        background: linear-gradient(to right, #FF5733, #FFC300);
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

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    noImageText: {
        color: 'gray',
        fontSize: '0.9rem',
        marginBottom: '10px',
    },
    name: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    detail: {
        fontSize: '1rem',
        marginBottom: '5px',
    },
    backButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#FF5733',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.2rem',
    },
};

export default RecommendationPage;
