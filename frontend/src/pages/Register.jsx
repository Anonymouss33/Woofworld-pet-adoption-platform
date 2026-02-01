import React, { useState } from 'react';
import axios from '../utils/api'; // Import API helper
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        income_bracket: 0, // Default to number
        housing_type: '',
        work_hours: '',
        household_composition: '',
        activity_level: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert income_bracket to number for consistency with backend
        setFormData({
            ...formData,
            [name]: name === 'income_bracket' ? parseInt(value, 10) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('customers/register', formData); // Post request to register endpoint
            alert('Registration successful!');
            navigate('/pets'); // Redirect to available pets page
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>

                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
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

                {/* Updated income_bracket dropdown */}
                <select
                    name="income_bracket"
                    value={formData.income_bracket}
                    onChange={handleChange}
                    required
                >
                    <option value={0}>Select Income Bracket</option>
                    <option value={30000}>Below 30K</option>
                    <option value={60000}>30K-60K</option>
                    <option value={100000}>60K-100K</option>
                    <option value={150000}>100K+</option>
                </select>

                <select
                    name="housing_type"
                    value={formData.housing_type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Housing Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Rented">Rented</option>
                    <option value="Owned">Owned</option>
                </select>

                <select
                    name="work_hours"
                    value={formData.work_hours}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Work Hours</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                </select>

                <input
                    name="household_composition"
                    value={formData.household_composition}
                    onChange={handleChange}
                    placeholder="Household Composition (e.g., family, single)"
                    required
                />

                <select
                    name="activity_level"
                    value={formData.activity_level}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Activity Level</option>
                    <option value="Active">Active</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
