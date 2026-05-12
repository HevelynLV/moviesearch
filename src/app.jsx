import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

import './App.css';

// Componente principal da aplicação.
function App() {
  return (
    // Router responsável pela navegação entre páginas.
    <Router>
      <div className="App">

        {/* Barra de navegação */}
        <Navbar />

        {/* Definição das rotas da aplicação */}
        <Routes>

          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Página de pesquisa */}
          <Route path="/search" element={<Search />} />

          {/* Página da lista de filmes */}
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;