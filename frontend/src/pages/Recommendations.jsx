import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import PetCard from '../components/PetCard';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get('/recommendations');
        setRecommendations(response.data.recommendations || response.data.pets);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recommendations.');
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Recommendations</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {recommendations.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
