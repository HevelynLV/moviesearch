import { useState } from 'react';
import MovieCard from '../components/MovieCard';

// Página responsável por pesquisar filmes usando a API do TMDB.
const Search = () => {

  // Estado que guarda o texto digitado na busca.
  const [query, setQuery] = useState('');

  // Estado que armazena os resultados encontrados.
  const [results, setResults] = useState([]);

  // Chave da API do TMDB.
  const apiKey = '478af884941f8697966773cbf0179b99';

  // Função executada ao enviar a busca.
  const handleSearch = async (e) => {
    e.preventDefault();

    // Impede buscas vazias.
    if (!query) return;

    // Faz requisição para buscar filmes.
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`
    );

    // Converte resposta para JSON.
    const data = await res.json();

    // Salva os resultados encontrados.
    setResults(data.results);
  };

  return (
    <div className="container">

      {/* Título da página */}
      <h1>Procurar Filmes</h1>

      {/* Formulário de busca */}
      <form
        onSubmit={handleSearch}
        className="review-form"
        style={{ flexDirection: 'row' }}
      >

        {/* Campo de texto da pesquisa */}
        <input
          type="text"
          placeholder="Digite o nome do filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1 }}
        />

        {/* Botão de busca */}
        <button type="submit">Buscar</button>
      </form>

      {/* Lista de filmes encontrados */}
      <div className="movie-grid">
        {results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;