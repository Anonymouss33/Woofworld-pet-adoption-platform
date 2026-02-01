import React from 'react';

const PetCard = ({ pet }) => {
    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
            <h3>{pet.name}</h3>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Size:</strong> {pet.size}</p>
            <p><strong>Energy Level:</strong> {pet.energy_level}</p>
            <p><strong>Care Cost:</strong> ${pet.care_cost}</p>
            <p><strong>Compatibility:</strong> {pet.compatibility.join(', ')}</p>
            <p><strong>Location:</strong> {pet.location}</p>
        </div>
    );
};

export default PetCard;
