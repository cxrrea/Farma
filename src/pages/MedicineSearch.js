import React, { useState } from 'react';
import axios from 'axios';

const MedicineSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/medicines/search', {
                params: { query }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for medicines"
            />
            <button onClick={handleSearch} disabled={loading}>
                Search
            </button>
            {loading && <p>Loading...</p>}
            <div className="medicine-results">
                {results.map((medicine, index) => (
                    <div key={index} className="medicine-card">
                        <h3>{medicine.nomeProduto || medicine.commercial_name}</h3>
                        <p><strong>Expediente:</strong> {medicine.expediente}</p>
                        <p><strong>Razão Social:</strong> {medicine.razaoSocial}</p>
                        <p><strong>CNPJ:</strong> {medicine.cnpj}</p>
                        <p><strong>Symptoms:</strong> {medicine.symptoms || 'Not available'}</p>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .medicine-results {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .medicine-card {
                    border: 1px solid #ddd;
                    padding: 1rem;
                    border-radius: 8px;
                    width: 300px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                .medicine-card h3 {
                    margin-top: 0;
                }
            `}</style>
        </div>
    );
};

export default MedicineSearch;
