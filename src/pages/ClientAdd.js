// src/pages/ClientAdd.js
import React, { useState } from 'react';
import axios from 'axios';

function ClientAdd() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/clients', { name, age, symptom })
      .then(response => {
        alert('Cliente adicionado com sucesso!');
        setName('');
        setAge('');
        setSymptom('');
      })
      .catch(error => console.error('Error adding client:', error));
  };

  return (
    <div>
      <h2>Cadastro de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Idade</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Sintoma</label>
          <input
            type="text"
            className="form-control"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}

export default ClientAdd;
