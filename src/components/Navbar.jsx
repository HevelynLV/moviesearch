import { Link } from 'react-router-dom';

// Componente da barra de navegação do site.
const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Nome/logo do projeto */}
      <h2>MovieSearch</h2>

      {/* Links de navegação entre as páginas */}
      <div className="links">
        <Link to="/">Início</Link>
        <Link to="/search">Procurar</Link>
        <Link to="/watchlist">Meus Reviews</Link>
      </div>
    </nav>
  );
};

export default Navbar;