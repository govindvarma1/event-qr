import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scan from './pages/Scan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
