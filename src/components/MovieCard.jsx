// Componente responsável por exibir um cartão de filme.
// Ele mostra a imagem, título, nota e um botão para adicionar o filme à lista.
const MovieCard = ({ movie, addToList }) => {

  // Monta a URL completa da imagem do filme usando a API do TMDB.
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">

      {/* Exibe o pôster do filme.
          Caso não exista imagem, mostra uma imagem padrão. */}
      <img
        src={movie.poster_path
          ? imageUrl
          : 'https://via.placeholder.com/500x750?text=Sem+Foto'}
        alt={movie.title}
      />

      {/* Título do filme */}
      <h3>{movie.title}</h3>

      {/* Nota média do filme */}
      <p>⭐ {movie.vote_average}</p>

      {/* Mostra o botão apenas se a função addToList existir */}
      {addToList && (
        <button onClick={() => addToList(movie)}>
          Adicionar à Lista
        </button>
      )}
    </div>
  );
};

export default MovieCard;