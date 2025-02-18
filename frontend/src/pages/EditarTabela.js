import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarTabela = () => {
  const [sintomas, setSintomas] = useState([]);
  const [novoSintoma, setNovoSintoma] = useState('');

  useEffect(() => {
    fetchSintomas();
  }, []);

  const fetchSintomas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sintomas');
      setSintomas(response.data);
    } catch (error) {
      console.error('Erro ao buscar sintomas:', error);
    }
  };

  const adicionarSintoma = async () => {
    if (!novoSintoma.trim()) return alert('Digite um nome para o sintoma.');
    try {
      const response = await axios.post('http://localhost:5000/sintomas', { nome: novoSintoma });
      setSintomas([...sintomas, response.data]);
      setNovoSintoma('');
    } catch (error) {
      console.error('Erro ao adicionar sintoma:', error);
    }
  };

  const atualizarSintoma = async (id, novoNome) => {
    try {
      await axios.put(`http://localhost:5000/sintomas/${id}`, { nome: novoNome });
      setSintomas(sintomas.map((s) => (s.id === id ? { ...s, nome: novoNome } : s)));
    } catch (error) {
      console.error('Erro ao atualizar sintoma:', error);
    }
  };

  const excluirSintoma = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/sintomas/${id}`);
      setSintomas(sintomas.filter((s) => s.id !== id));
    } catch (error) {
      console.error('Erro ao excluir sintoma:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Tabela de Sintomas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sintoma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sintomas.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>
                <input
                  type="text"
                  value={s.nome}
                  onChange={(e) => atualizarSintoma(s.id, e.target.value)}
                />
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => excluirSintoma(s.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3">
        <input
          type="text"
          placeholder="Novo sintoma"
          value={novoSintoma}
          onChange={(e) => setNovoSintoma(e.target.value)}
        />
        <button className="btn btn-success ml-2" onClick={adicionarSintoma}>
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default EditarTabela;
