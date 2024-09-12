import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Cria o root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
