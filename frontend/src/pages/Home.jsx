import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundImage: `url('/images/doggyd.jpg')`, // Update the image path as needed
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start', // Position text at the top
                alignItems: 'center',
                fontFamily: "'Poppins', sans-serif",
                paddingTop: '3rem',
            }}
        >
            {/* Title Section */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                }}
            >
                <h1
                    style={{
                        fontSize: '7rem', // Enlarged title
                        fontWeight: '900',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(45deg, #FF4500, #FFD700, #32CD32, #1E90FF, #FF69B4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'bounceIn 1.5s ease-in-out', // Added animation
                    }}
                >
                    WoofWorld!
                </h1>
                <p
                    style={{
                        fontSize: '2.8rem', // Enlarged subtitle
                        fontWeight: '500',
                        color: '#2c3e50',
                        marginBottom: '1.5rem',
                        animation: 'fadeIn 2s ease',
                    }}
                >
                    Your go-to place for furry friends and happy homes!
                </p>
                <p
                    style={{
                        fontSize: '2.2rem', // Enlarged additional text
                        color: '#34495e',
                        marginBottom: '3rem',
                        animation: 'fadeIn 2.5s ease',
                    }}
                >
                    Find loving homes for adorable pets!
                </p>
            </div>

            {/* Buttons Section */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    animation: 'fadeIn 3s ease',
                }}
            >
                <button
                    onClick={() => navigate('/customer-login')}
                    style={{
                        padding: '1.4rem 3.5rem',
                        fontSize: '2rem',
                        fontWeight: '600',
                        color: '#fff',
                        background: 'linear-gradient(45deg, #FF4500, #FF6347)',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        boxShadow: '0 4px 15px rgba(255, 99, 71, 0.5)',
                        animation: 'pulse 2s infinite', // Added button animation
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 6px 20px rgba(255, 69, 0, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 15px rgba(255, 99, 71, 0.5)';
                    }}
                >
                    🐶 I Want to Adopt
                </button>
                <button
                    onClick={() => navigate('/owner-login')}
                    style={{
                        padding: '1.4rem 3.5rem',
                        fontSize: '2rem',
                        fontWeight: '600',
                        color: '#fff',
                        background: 'linear-gradient(45deg, #008000, #32CD32)',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        boxShadow: '0 4px 15px rgba(50, 205, 50, 0.5)',
                        animation: 'pulse 2s infinite', // Added button animation
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 6px 20px rgba(0, 128, 0, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 15px rgba(50, 205, 50, 0.5)';
                    }}
                >
                    🐾 I Have for Adoption
                </button>
            </div>

            {/* Animation Styles */}
            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes bounceIn {
                        0%, 20%, 50%, 80%, 100% {
                            transform: translateY(0);
                        }
                        40% {
                            transform: translateY(-30px);
                        }
                        60% {
                            transform: translateY(-15px);
                        }
                    }

                    @keyframes pulse {
                        0% {
                            transform: scale(1);
                            box-shadow: 0 0 15px rgba(255, 99, 71, 0.5);
                        }
                        50% {
                            transform: scale(1.05);
                            box-shadow: 0 0 25px rgba(255, 69, 0, 0.7);
                        }
                        100% {
                            transform: scale(1);
                            box-shadow: 0 0 15px rgba(255, 99, 71, 0.5);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Home;
