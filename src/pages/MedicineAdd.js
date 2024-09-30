import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MedicineAdd() {
  const [name, setName] = useState('');
  const [formula, setFormula] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/medicines', {
        name,
        formula,
        ingredients,
        symptoms,
      });
      toast.success('Medicamento adicionado com sucesso!');
      // Limpar o formulário
      setName('');
      setFormula('');
      setIngredients('');
      setSymptoms('');
    } catch (error) {
      toast.error('Erro ao adicionar medicamento.');
      console.error('Error adding medicine:', error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Fórmula</h2>
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
          <label className="form-label">Fórmula</label>
          <input
            type="text"
            className="form-control"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredientes</label>
          <input
            type="text"
            className="form-control"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sintomas Tratáveis</label>
          <input
            type="text"
            className="form-control"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default MedicineAdd;
