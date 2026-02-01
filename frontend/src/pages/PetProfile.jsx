import React, { useState } from 'react';
import axios from '../utils/api'; // Ensure axios is properly configured
import { useNavigate } from 'react-router-dom';

const PetProfile = () => {
    const [formData, setFormData] = useState({
        ownerId: '', // Add this field to manually input ownerId
        name: '',
        breed: '',
        age: '',
        description: '',
        email: '',
        phone: '',
        location: '',
        size: '',
        energy_level: '',
        care_cost: '',
        compatibility: '',
        images: [], // Store selected images
    });
    const [imagePreview, setImagePreview] = useState([]); // For image preview
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
        setImagePreview(files.map((file) => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.ownerId) {
            setError('Owner ID is required.');
            setLoading(false);
            return;
        }

        try {
            const data = new FormData();
            data.append('ownerId', formData.ownerId);
            data.append('name', formData.name);
            data.append('breed', formData.breed);
            data.append('age', formData.age);
            data.append('description', formData.description);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('location', formData.location);
            data.append('size', formData.size);
            data.append('energy_level', formData.energy_level);
            data.append('care_cost', formData.care_cost);
            data.append('compatibility', formData.compatibility);

            formData.images.forEach((image) => data.append('images', image));

            const response = await axios.post('owners/pets', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert(response.data.message || 'Pet profile created successfully!');
            navigate('/owner-dashboard'); // Redirect to Owner Dashboard
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create Pet Profile</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="ownerId"
                    placeholder="Enter Owner ID"
                    value={formData.ownerId}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Pet Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="breed"
                    placeholder="Enter Pet Breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Enter Pet Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={formData.description}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Contact Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter Contact Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="size"
                    placeholder="Enter Size (Small, Medium, Large)"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="energy_level"
                    placeholder="Enter Energy Level (Low, Moderate, High)"
                    value={formData.energy_level}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    name="care_cost"
                    placeholder="Enter Monthly Care Cost"
                    value={formData.care_cost}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="compatibility"
                    placeholder="Enter Compatibility (comma-separated)"
                    value={formData.compatibility}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={styles.input}
                />
                <div style={styles.imagePreviewContainer}>
                    {imagePreview.map((src, index) => (
                        <img key={index} src={src} alt={`Preview ${index}`} style={styles.imagePreview} />
                    ))}
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Creating...' : 'Create Profile'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #FFA07A, #FF4500)',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        color: '#fff',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        width: '300px',
    },
    input: {
        padding: '1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: 'none',
        width: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: '1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#FF6347',
        color: 'white',
        cursor: 'pointer',
        width: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    imagePreviewContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '1rem',
    },
    imagePreview: {
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        objectFit: 'cover',
    },
};

export default PetProfile;
