import React, { useState } from 'react';
import axios from '../utils/api';

const AddPet = () => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        size: '',
        energy_level: '',
        care_cost: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/pets/add', formData);
            alert('Pet added successfully!');
        } catch (error) {
            alert('Failed to add pet. Try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="breed" placeholder="Breed" onChange={handleChange} required />
            <select name="size" onChange={handleChange} required>
                <option value="">Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
            </select>
            <select name="energy_level" onChange={handleChange} required>
                <option value="">Energy Level</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
            </select>
            <input name="care_cost" placeholder="Care Cost" onChange={handleChange} required />
            <button type="submit">Add Pet</button>
        </form>
    );
};

export default AddPet;
