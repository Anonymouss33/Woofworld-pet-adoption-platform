import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        income_bracket: '',
        housing_type: '',
        work_hours: '',
        household_composition: '',
        activity_level: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Registration successful!');
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <select name="income_bracket" value={formData.income_bracket} onChange={handleChange} required>
                <option value="">Income Bracket</option>
                <option value="30000">30000</option>
                <option value="60000">60000</option>
                <option value="100000">100000</option>
                <option value="100000+">100000+</option>
            </select>
            <select name="housing_type" value={formData.housing_type} onChange={handleChange} required>
                <option value="">Housing Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Rented">Rented</option>
                <option value="Owned">Owned</option>
            </select>
            <select name="work_hours" value={formData.work_hours} onChange={handleChange} required>
                <option value="">Work Hours</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
            </select>
            <input
                name="household_composition"
                value={formData.household_composition}
                onChange={handleChange}
                placeholder="Household Composition"
                required
            />
            <select name="activity_level" value={formData.activity_level} onChange={handleChange} required>
                <option value="">Activity Level</option>
                <option value="Active">Active</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
