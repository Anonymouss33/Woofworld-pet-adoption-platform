import React, { useState } from 'react';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/customers/login', formData);
            alert('Login successful!');
            navigate('/pets'); // Redirect to pets page after successful login
        } catch (error) {
            alert('Login failed! Check your credentials.');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div className="register-redirect">
                <p>New Customer?</p>
                <button onClick={handleRegisterClick}>Register</button>
            </div>
        </div>
    );
};

export default Login;
