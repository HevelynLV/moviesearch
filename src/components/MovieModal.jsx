import { useState, useEffect } from 'react';

const MovieModal = ({ movie, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem('movieReviews')) || {};
    
    // Suporte para o formato antigo (array direto) e o formato novo (objeto com título e pôster)
    const movieData = allReviews[movie.id];
    let loadedReviews = [];
    
    if (Array.isArray(movieData)) {
      loadedReviews = movieData; 
    } else if (movieData && movieData.comentarios) {
      loadedReviews = movieData.comentarios;
    }
    
    setReviews(loadedReviews);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [movie.id]);

  const handleAddReview = (e) => {
    e.preventDefault();

    const allReviews = JSON.parse(localStorage.getItem('movieReviews')) || {};
    
    const newReview = {
      text,
      date: new Date().toLocaleDateString('pt-BR')
    };

    // AQUI ESTÁ A MÁGICA: Agora salvamos o TÍTULO e o PÔSTER junto com a review!
    const updatedReviews = {
      ...allReviews,
      [movie.id]: {
        title: movie.title,
        poster_path: movie.poster_path,
        comentarios: [...reviews, newReview]
      }
    };

    localStorage.setItem('movieReviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews[movie.id].comentarios);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-body">
          <div className="modal-poster">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=Sem+Foto'}
              alt={movie.title}
            />
          </div>

          <div className="modal-info">
            <h2>{movie.title}</h2>
            {movie.release_date && <span className="modal-year">{movie.release_date.slice(0, 4)}</span>}
            <p className="modal-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
            <p className="modal-overview">{movie.overview || 'Sinopse não disponível.'}</p>

            <form onSubmit={handleAddReview} className="modal-review-form">
              <textarea
                placeholder="O que achou deste filme?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <button type="submit" className={submitted ? 'btn-success' : ''}>
                {submitted ? '✓ Review enviada!' : 'Enviar Review'}
              </button>
            </form>

            {reviews.length > 0 && (
              <div className="reviews-container">
                <h4>Reviews</h4>
                {reviews.map((r, i) => (
                  <div key={i} className="review-pill">
                    <p>{r.text}</p>
                    <span>{r.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;