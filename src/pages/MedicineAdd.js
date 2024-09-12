// src/pages/MedicineAdd.js
import React, { useState } from 'react';
import axios from 'axios';

function MedicineAdd() {
  const [commercialName, setCommercialName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/medicines', {
        commercial_name: commercialName,
        generic_name: genericName,
        ingredients: ingredients,
        symptoms: symptoms,
      });
      setMessage(`Medicamento adicionado com sucesso! ID: ${response.data.id}`);
      // Limpar o formulário
      setCommercialName('');
      setGenericName('');
      setIngredients('');
      setSymptoms('');
    } catch (error) {
      setMessage('Erro ao adicionar medicamento.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Remédios</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome Comercial</label>
          <input
            type="text"
            className="form-control"
            value={commercialName}
            onChange={(e) => setCommercialName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome Genérico</label>
          <input
            type="text"
            className="form-control"
            value={genericName}
            onChange={(e) => setGenericName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredientes</label>
          <input
            type="text"
            className="form-control"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sintomas Tratáveis</label>
          <input
            type="text"
            className="form-control"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Medicamento</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default MedicineAdd;
