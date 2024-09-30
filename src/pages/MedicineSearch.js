import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Importando o arquivo de estilos

const MedicineSearch = () => {
  const [query, setQuery] = useState('');
  const [medicines, setMedicines] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/medicines/search?query=${query}`);
      setMedicines(response.data.slice(0, 3)); // Mostrar apenas 3 resultados
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for a medicine..."
      />
      <button onClick={handleSearch}>Search</button>

      <div className="medicine-card-container">
        {medicines.map((medicine) => (
          <div key={medicine.rxcui || medicine.id} className="medicine-card">
            <div className="medicine-name">{medicine.name}</div>
            <div className="medicine-details">
              <p><strong>Fórmula:</strong> {medicine.formula || 'N/A'}</p>
              <p><strong>Ingredientes:</strong> {medicine.ingredients || 'N/A'}</p>
              <p><strong>Sintomas Tratáveis:</strong> {medicine.symptoms || 'N/A'}</p>
              <p><strong>Synonym:</strong> {medicine.synonym || 'N/A'}</p>
              <p><strong>TTY:</strong> {medicine.tty || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineSearch;
