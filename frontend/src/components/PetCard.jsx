import React from 'react';

const PetCard = ({ pet }) => {
  // Safety guard: if pet is undefined/null
  if (!pet) {
    return null;
  }

  // Normalize compatibility (string OR array)
  const compatibilityText = Array.isArray(pet.compatibility)
    ? pet.compatibility.join(', ')
    : pet.compatibility || 'Not specified';

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '16px',
        borderRadius: '8px',
        background: '#fff',
        marginBottom: '16px'
      }}
    >
      <h3>{pet.name || 'Unnamed Pet'}</h3>

      <p><strong>Breed:</strong> {pet.breed || 'N/A'}</p>
      <p><strong>Size:</strong> {pet.size || 'N/A'}</p>
      <p><strong>Energy Level:</strong> {pet.energy_level || 'N/A'}</p>
      <p><strong>Care Cost:</strong> ₹{pet.care_cost || 'N/A'}</p>
      <p><strong>Compatibility:</strong> {compatibilityText}</p>
      <p><strong>Location:</strong> {pet.location || 'N/A'}</p>
    </div>
  );
};

export default PetCard;
