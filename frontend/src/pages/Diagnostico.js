import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDiagnostico, getSintomas } from '../services/api';

const Diagnostico = () => {
  const [sintomas, setSintomas] = useState({});
  const [diagnostico, setDiagnostico] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSintomas = async () => {
      try {
        const response = await getSintomas(); 
        const sintomasIniciais = response.reduce((acc, sintoma) => {
          acc[sintoma.nome] = 'Irrelevante'; 
          return acc;
        }, {});
        setSintomas(sintomasIniciais);
      } catch (error) {
        console.error('Erro ao obter sintomas:', error);
        alert('Erro ao carregar sintomas. Tente novamente.');
      }
    };

    fetchSintomas();
  }, []);

  const handleChange = (sintoma, valor) => {
    setSintomas({ ...sintomas, [sintoma]: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getDiagnostico(sintomas);
      setDiagnostico(response.diagnostico);
    } catch (error) {
      console.error('Erro ao obter diagnóstico:', error);
      alert('Erro ao obter diagnóstico. Tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Diagnóstico</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(sintomas).map((sintoma) => (
          <div key={sintoma} className="mb-3">
            <label className="form-label">{sintoma}</label>
            <select
              className="form-select"
              value={sintomas[sintoma]}
              onChange={(e) => handleChange(sintoma, e.target.value)}
            >
              <option value="Irrelevante">Irrelevante</option>
              <option value="Médio">Médio</option>
              <option value="Forte">Forte</option>
            </select>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Diagnosticar</button>
      </form>
      {diagnostico && (
        <div className="mt-4">
          <h3>Resultado:</h3>
          <p>{diagnostico}</p>
        </div>
      )}
    </div>
  );
};

export default Diagnostico;
