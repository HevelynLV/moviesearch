import { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const Home = () => {
  // 1. Estados do componente
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // NOVO ESTADO PARA ORDENAÇÃO
  const [sortOrder, setSortOrder] = useState('');

  // 2. Busca os filmes ao carregar a página
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // NOVA LÓGICA DE ORDENAÇÃO
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOrder === 'highest') {
      return b.vote_average - a.vote_average;
    }

    if (sortOrder === 'lowest') {
      return a.vote_average - b.vote_average;
    }

    return 0;
  });

  // 3. JSX
  return (
    <div className="container">
      <h1>Filmes em Tendência</h1>

      {/* NOVO FILTRO DE ORDENAÇÃO */}
      <div style={{ marginBottom: '20px' }}>
        <label>Ordenar por nota: </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Padrão</option>
          <option value="highest">Maior nota</option>
          <option value="lowest">Menor nota</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Carregando catálogo...</div>
      ) : (
        <div className="movie-grid">
          {sortedMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              style={{ cursor: 'pointer' }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Home;