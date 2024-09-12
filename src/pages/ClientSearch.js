// src/pages/ClientSearch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientSearch() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Função para buscar os clientes do back-end
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  // Filtra os clientes com base no termo de pesquisa
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Pesquisa de Clientes</h2>
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Sintoma</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.age}</td>
              <td>{client.symptom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientSearch;
