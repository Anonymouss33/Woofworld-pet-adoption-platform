import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api'; // Ensure axios is set up correctly for API calls

const CustomerLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/customers/login', formData);
            alert(response.data.message || 'Login successful!');
            navigate('/customer-dashboard'); // Redirect to dashboard or appropriate route
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: `url('/images/omg.jpg')`, // Replace with your background image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <h2
                style={{
                    fontSize: '4rem', // Larger title
                    fontWeight: 'bold',
                    marginBottom: '3rem',
                    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
                    color: '#333',
                }}
            >
                Customer Login
            </h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem', // Increased gap for spacing
                    width: '400px', // Wider form
                    background: 'rgba(255, 255, 255, 0.95)', // Semi-transparent background for form
                    padding: '3rem', // Increased padding
                    borderRadius: '20px', // Larger border-radius for a smoother look
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                }}
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '1.5rem', // Increased padding
                        fontSize: '1.8rem', // Larger font size
                        fontWeight: 'bold', // Bold text for emphasis
                        borderRadius: '10px',
                        border: '1px solid #ddd',
                        width: '100%',
                        outline: 'none',
                        color: '#333',
                        backgroundColor: '#f9f9f9', // Light background for contrast
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
                        padding: '1.5rem', // Increased padding
                        fontSize: '1.8rem', // Larger font size
                        borderRadius: '10px',
                        border: '1px solid #ddd',
                        width: '100%',
                        outline: 'none',
                        color: '#333',
                        backgroundColor: '#f9f9f9',
                    }}
                />
                {error && (
                    <p style={{ color: 'red', fontSize: '1.2rem' }}>{error}</p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '1.5rem', // Larger button
                        fontSize: '1.8rem', // Larger font size
                        color: '#fff',
                        backgroundColor: '#FF4500',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        width: '200px', // Wider button
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = '#FF6347')
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = '#FF4500')
                    }
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p
                style={{
                    marginTop: '2rem',
                    fontSize: '1.5rem', // Larger font size for visibility
                    color: '#333',
                }}
            >
                New Customer?{' '}
                <span
                    style={{
                        color: '#FF6347',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1.5rem', // Match size with the rest of the text
                    }}
                    onClick={() => navigate('/customer-profile')}
                >
                    Register here
                </span>
            </p>
        </div>
    );
};

export default CustomerLogin;
