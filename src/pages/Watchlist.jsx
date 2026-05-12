import { useState, useEffect } from 'react';

// Página da watchlist onde os filmes salvos e reviews gerais são exibidos.
const Watchlist = () => {

  // Estado que guarda os filmes da lista.
  const [watchlist, setWatchlist] = useState([]);

  // Estados do formulário de review.
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState('10');
  const [review, setReview] = useState('');
  
  // Estado que armazena as reviews salvas.
  const [reviews, setReviews] = useState([]);

  // Carrega dados salvos no localStorage ao abrir a página.
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('watchlist')) || [];
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    setWatchlist(savedList);
    setReviews(savedReviews);
  }, []);

  // Função para adicionar uma nova review.
  const handleReview = (e) => {
    e.preventDefault();

    const newReview = {
      userName,
      rating,
      review,
      id: Date.now()
    };

    const updatedReviews = [...reviews, newReview];

    // Atualiza estado e salva no localStorage.
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    // Limpa os campos do formulário.
    setUserName('');
    setReview('');
  };

  // Remove uma review pelo id.
  const handleDelete = (id) => {
    const updatedReviews = reviews.filter(r => r.id !== id);

    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  return (
    <div className="container">

      {/* Título da página */}
      <h1>Minha Lista de Filmes</h1>

      {/* Lista de filmes salvos */}
      <div className="movie-grid">
        {watchlist.map(movie => (
          <div key={movie.id} className="movie-item-list">
            <p><strong>{movie.title}</strong></p>
          </div>
        ))}
      </div>

      <hr />

      {/* Formulário para enviar review */}
      <h2>Deixe uma Review Geral</h2>

      <form onSubmit={handleReview} className="review-form">

        {/* Campo do nome */}
        <input
          type="text"
          placeholder="Teu Nome"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        {/* Nota da review */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[...Array(11).keys()].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        {/* Texto da review */}
        <textarea
          placeholder="O que achaste dos filmes?"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />

        <button type="submit">Guardar Review</button>
      </form>

      {/* Lista de reviews salvas */}
      <h3>Reviews Guardadas</h3>

      <div className="reviews-list">
        {reviews.length === 0 ? (

          // Mensagem caso não existam reviews.
          <p className="no-reviews">Nenhuma review ainda.</p>

        ) : (

          // Exibe todas as reviews.
          reviews.map(r => (
            <div key={r.id} className="review-item">

              <div className="review-header">

                <span className="review-author">
                  {r.userName}
                </span>

                <span className="review-badge">
                  ⭐ {r.rating}
                </span>

                {/* Botão para remover review */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(r.id)}
                >
                  X
                </button>
              </div>

              <p className="review-text">
                {r.review}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;