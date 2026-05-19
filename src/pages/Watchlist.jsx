import { useState, useEffect } from 'react';

const Watchlist = () => {
  const [reviewsEncontradas, setReviewsEncontradas] = useState([]);

  useEffect(() => {
    const savedMovieReviews = JSON.parse(localStorage.getItem('movieReviews')) || {};
    
    const listaFormatada = Object.keys(savedMovieReviews).map(movieId => {
      const data = savedMovieReviews[movieId];
      
      // Verifica se é o formato antigo (só texto) ou o formato novo (com título/poster)
      const isOldFormat = Array.isArray(data);
      
      return {
        id: movieId,
        title: isOldFormat ? "Filme antigo (Sem nome)" : (data.title || "Filme desconhecido"),
        poster_path: isOldFormat ? null : (data.poster_path || null),
        reviews: isOldFormat ? data : (data.comentarios || [])
      };
    });

    setReviewsEncontradas(listaFormatada);
  }, []);

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 'bold' }}>Minhas Reviews</h1>

      <div className="watchlist-feed" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {reviewsEncontradas.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic' }}>Você ainda não escreveu nenhuma review.</p>
        ) : (
          reviewsEncontradas.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '24px', background: '#141419', padding: '20px', borderRadius: '12px', border: '1px solid #23232f', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              
              {/* PÔSTER E TÍTULO */}
              <div style={{ width: '130px', flexShrink: 0, textAlign: 'center' }}>
                {item.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} style={{ width: '100%', borderRadius: '8px', aspectRatio: '2/3', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '2/3', background: '#25252b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', border: '1px dashed #444', fontSize: '0.9rem', textAlign: 'center', padding: '5px' }}>
                    Sem Foto
                  </div>
                )}
                <h3 style={{ fontSize: '0.95rem', marginTop: '12px', color: '#fff', fontWeight: 'bold', lineHeight: '1.3' }}>
                  {item.title}
                </h3>
              </div>

              {/* COMENTÁRIOS */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#9466ff', marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                  Meus Comentários
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {item.reviews.map((r, index) => (
                    <div key={index} style={{ background: '#1d1d26', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #9466ff' }}>
                      <p style={{ fontStyle: 'italic', margin: '0 0 8px 0', fontSize: '1.05rem', color: '#e2e2e9', lineHeight: '1.4' }}>"{r.text}"</p>
                      <small style={{ color: '#666', display: 'block', textAlign: 'right', fontSize: '0.8rem' }}>{r.date}</small>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;