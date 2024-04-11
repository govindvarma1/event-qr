import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scan from './pages/Scan';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/scan" element={<Scan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
