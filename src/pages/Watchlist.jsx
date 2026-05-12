import { useState, useEffect } from 'react';

const Watchlist = () => {
  const [reviewsEncontradas, setReviewsEncontradas] = useState([]);

  useEffect(() => {
    // Pegamos as reviews (que estão organizadas por ID do filme no seu MovieModal)
    const savedMovieReviews = JSON.parse(localStorage.getItem('movieReviews')) || {};
    
    // Pegamos a lista de filmes (para pegar poster e título)
    const savedList = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Criamos uma lista baseada APENAS nas reviews existentes
    const listaComReviews = Object.keys(savedMovieReviews).map(movieId => {
      // Tentamos achar os dados do filme (título/poster) na nossa watchlist
      const dadosDoFilme = savedList.find(m => m.id.toString() === movieId.toString());
      
      return {
        id: movieId,
        title: dadosDoFilme?.title || "Filme desconhecido",
        poster_path: dadosDoFilme?.poster_path || null,
        reviews: savedMovieReviews[movieId]
      };
    });

    setReviewsEncontradas(listaComReviews);
  }, []);

  return (
    <div className="container">
      {/* Trocado o título conforme pedido */}
      <h1>Minhas Reviews</h1>

      <div className="watchlist-feed">
        {reviewsEncontradas.length === 0 ? (
          <p className="no-reviews">Você ainda não escreveu nenhuma review.</p>
        ) : (
          reviewsEncontradas.map(item => (
            <div key={item.id} className="review-card-container" style={{display: 'flex', gap: '20px', marginBottom: '20px', background: '#1a1a1a', padding: '15px', borderRadius: '8px'}}>
              
              <div className="movie-info-side">
                {item.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} style={{width: '120px', borderRadius: '5px'}} />
                ) : (
                  <div style={{width: '120px', height: '180px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Sem Foto</div>
                )}
                <h3 style={{fontSize: '1.1rem', marginTop: '10px'}}>{item.title}</h3>
              </div>

              <div className="reviews-content-side" style={{flex: 1}}>
                <h4 style={{color: '#9466ff'}}>Meus Comentários:</h4>
                {item.reviews.map((r, index) => (
                  <div key={index} style={{background: '#252525', padding: '10px', borderRadius: '5px', marginTop: '10px', borderLeft: '4px solid #9466ff'}}>
                    <p style={{fontStyle: 'italic'}}>"{r.text}"</p>
                    <small style={{color: '#888'}}>{r.date}</small>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;