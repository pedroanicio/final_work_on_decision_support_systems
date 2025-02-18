import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import Diagnostico from '../src/pages/Diagnostico';
import EditarTabela from '../src/pages/EditarTabela';
import Navbar from '../src/components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
        <Route path="/editar-tabela" element={<EditarTabela />} />
      </Routes>
    </div>
  );
}

export default App;