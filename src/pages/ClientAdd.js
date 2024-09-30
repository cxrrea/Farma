// src/pages/ClientAdd.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ClientAdd() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/clients', {
        name,
        age,
        symptom,
      });
      toast.success('Cliente adicionado com sucesso!');
      // Limpar o formulário
      setName('');
      setAge('');
      setSymptom('');
    } catch (error) {
      toast.error('Erro ao adicionar cliente.');
      console.error('Error adding client:', error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Idade</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sintoma</label>
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
      <ToastContainer />
    </div>
  );
}

export default ClientAdd;
