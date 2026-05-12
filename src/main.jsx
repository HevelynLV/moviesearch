import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app'; // Importa o componente principal da aplicação.
import './App.css';

// Renderiza a aplicação React dentro da div "root" do HTML.
ReactDOM.createRoot(document.getElementById('root')).render(

  // StrictMode ajuda a identificar possíveis problemas no React.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);