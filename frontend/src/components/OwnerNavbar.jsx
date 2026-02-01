// src/components/OwnerNavbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OwnerNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/" style={styles.navLink}>
                    Pet Adoption - Owner
                </Link>
            </div>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/" style={styles.navLink}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/owner-dashboard" style={styles.navLink}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/add-pet" style={styles.navLink}>
                        Add Pet
                    </Link>
                </li>
                <li>
                    <button style={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#28a745', // Changed to green
        color: 'white',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    navLinks: {
        listStyleType: 'none',
        display: 'flex',
        gap: '15px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
    },
    logoutButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default OwnerNavbar;
