import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#007bff', color: 'white' }}>
      <Link to="/" style={{ color: 'white', marginRight: '10px' }}>Home</Link>
      <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
      <Link to="/register" style={{ color: 'white' }}>Register</Link>
    </nav>
  );
};

export default Navbar;
