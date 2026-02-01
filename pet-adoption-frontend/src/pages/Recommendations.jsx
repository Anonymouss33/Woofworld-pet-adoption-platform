import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import PetCard from '../components/PetCard';
import Loader from '../components/Loader';

const Recommendations = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from storage
                const response = await axios.get('/api/recommendations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPets(response.data.recommendations || []);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, []);

    if (loading) return <Loader />;

    return (
        <div>
            <h1>Recommended Pets</h1>
            {pets.length ? (
                pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
            ) : (
                <p>No pets available at the moment.</p>
            )}
        </div>
    );
};

export default Recommendations;
