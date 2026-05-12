import { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const Home = () => {
  // 1. Estados do componente
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []); // Array vazio significa que executa apenas uma vez no "mount"

  // 3. O Retorno do JSX (Onde estava o erro de sintaxe)
  return (
    <div className="container">
      <h1>Filmes em Tendência</h1>

      {loading ? (
        <div className="loading">Carregando catálogo...</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
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

      {/* Só renderiza o Modal se houver um filme selecionado */}
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