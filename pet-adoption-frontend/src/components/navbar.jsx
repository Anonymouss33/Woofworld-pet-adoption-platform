import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
            <Link to="/">Home</Link>
            <Link to="/login" style={{ marginLeft: '10px' }}>Login</Link>
            <Link to="/register" style={{ marginLeft: '10px' }}>Register</Link>
            <Link to="/recommendations" style={{ marginLeft: '10px' }}>Recommendations</Link>
        </nav>
    );
};

export default navbar;
