import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';

const EditCustomerProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        income_bracket: '',
        housing_type: '',
        work_hours: '',
        household_composition: '',
        activity_level: '',
    });
    const [selectedFile, setSelectedFile] = useState(null); // For profile image
    const [profileImagePreview, setProfileImagePreview] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get('/customers/me');
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    income_bracket: response.data.income_bracket,
                    housing_type: response.data.housing_type,
                    work_hours: response.data.work_hours,
                    household_composition: response.data.household_composition,
                    activity_level: response.data.activity_level,
                });
                setProfileImagePreview(`http://localhost:3000${response.data.profileImage}`);
            } catch (error) {
                console.error('Error fetching customer data:', error);
                setError('Failed to load profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setProfileImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // First, update profile image if a file is selected
            if (selectedFile) {
                const formData = new FormData();
                formData.append('profileImage', selectedFile);

                await axios.post('/customers/upload-profile-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            // Update other profile fields
            await axios.put('/customers/me', formData);
            alert('Profile updated successfully!');
            navigate('/customer-dashboard'); // Redirect to Profile Page
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading profile...</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Edit Profile</h1>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSave} style={styles.form}>
                {/* Profile Image Upload */}
                <div style={styles.imageUpload}>
                    <label>Profile Image</label>
                    <div style={styles.imagePreviewContainer}>
                        {profileImagePreview ? (
                            <img src={profileImagePreview} alt="Profile Preview" style={styles.imagePreview} />
                        ) : (
                            <p>No image selected</p>
                        )}
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>

                {/* Other Profile Fields */}
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <label>Income Bracket (₹)</label>
                <input
                    type="number"
                    name="income_bracket"
                    value={formData.income_bracket}
                    onChange={handleInputChange}
                    required
                />

                <label>Housing Type</label>
                <select
                    name="housing_type"
                    value={formData.housing_type}
                    onChange={handleInputChange}
                    required
                >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Rented">Rented</option>
                    <option value="Owned">Owned</option>
                </select>

                <label>Work Hours</label>
                <select
                    name="work_hours"
                    value={formData.work_hours}
                    onChange={handleInputChange}
                    required
                >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                </select>

                <label>Household Composition</label>
                <input
                    type="text"
                    name="household_composition"
                    value={formData.household_composition}
                    onChange={handleInputChange}
                    required
                />

                <label>Activity Level</label>
                <select
                    name="activity_level"
                    value={formData.activity_level}
                    onChange={handleInputChange}
                    required
                >
                    <option value="Active">Active</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                </select>

                <button type="submit" style={styles.saveButton}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    imageUpload: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    imagePreviewContainer: {
        marginBottom: '10px',
    },
    imagePreview: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '10px',
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default EditCustomerProfile;
