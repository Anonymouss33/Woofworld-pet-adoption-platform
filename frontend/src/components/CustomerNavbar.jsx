// src/components/CustomerNavbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/" style={styles.navLink}>
                    Pet Adoption - Customer
                </Link>
            </div>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/" style={styles.navLink}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/pets" style={styles.navLink}>
                        Pets
                    </Link>
                </li>

                <li>
                    <Link to="/customer-dashboard" style={styles.navLink}>
                        Profile Page
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
        backgroundColor: '#4ee44e',
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

export default CustomerNavbar;
