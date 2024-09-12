// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Welcome from './pages/Welcome';
import ClientSearch from './pages/ClientSearch';
import ClientAdd from './pages/ClientAdd';
import MedicineSearch from './pages/MedicineSearch';
import MedicineAdd from './pages/MedicineAdd';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/clients/search" element={<ClientSearch />} />
          <Route path="/clients/add" element={<ClientAdd />} />
          <Route path="/medicines/search" element={<MedicineSearch />} />
          <Route path="/medicines/add" element={<MedicineAdd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
