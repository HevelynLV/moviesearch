import { useState, useEffect } from 'react';
import MovieModal from "../components/MovieModal"; // 👈 Importando o seu modal de reviews!

// 🌐 COLOQUE SUA CHAVE DO TMDB AQUI:
const TMDB_API_KEY = '478af884941f8697966773cbf0179b99';

const Home = () => {
  const [filmesEmAlta, setFilmesEmAlta] = useState([]);
  const [filmesAclamados, setFilmesAclamados] = useState([]);
  const [filmesBreve, setFilmesBreve] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [carregando, setCarregando] = useState(true);
  
  // 🍿 NOVO ESTADO: Controla qual filme está aberto no Pop-up (Modal)
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

  useEffect(() => {
    const buscarDadosHome = async () => {
      try {
        const [resAlta, resAclamados, resBreve] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&language=pt-BR`),
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=pt-BR`),
          fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=pt-BR`)
        ]);

        const dadosAlta = await resAlta.json();
        const dadosAclamados = await resAclamados.json();
        const dadosBreve = await resBreve.json();

        setFilmesEmAlta(dadosAlta.results);
        setFilmesAclamados(dadosAclamados.results);
        setFilmesBreve(dadosBreve.results);
        setCarregando(false);
      } catch (erro) {
        console.error("Erro ao carregar a página inicial:", erro);
        setCarregando(false);
      }
    };

    if (TMDB_API_KEY !== 'SUA_CHAVE_AQUI') {
      buscarDadosHome();
    }
  }, []);

  useEffect(() => {
    if (filmesEmAlta.length === 0) return;
    const interval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, [filmesEmAlta]);

  if (carregando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050507', color: '#9466ff' }}>
        <h2 style={{ animation: 'pulse 1.5s infinite' }}>Preparando o cinema...</h2>
      </div>
    );
  }

  const filmeDestaque = filmesEmAlta[heroIndex];

  return (
    <div style={{ background: '#050507', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      
      {/* 🎬 HERO BANNER */}
      {filmeDestaque && (
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '80vh',
            minHeight: '600px',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${filmeDestaque.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            display: 'flex',
            alignItems: 'center',
            transition: 'background-image 0.8s ease-in-out'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, #050507 0%, rgba(5,5,7,0.85) 35%, transparent 100%), linear-gradient(0deg, #050507 0%, transparent 40%)' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, padding: '0 5%', maxWidth: '750px', textAlign: 'left' }}>
            <span style={{ color: '#9466ff', fontWeight: '800', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '15px', display: 'block', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Nº {heroIndex + 1} Em Alta
            </span>
            <h1 style={{ fontSize: '3.8rem', fontWeight: '900', margin: '0 0 20px 0', lineHeight: '1.1', textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
              {filmeDestaque.title}
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#e2e2e9', marginBottom: '35px', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              {filmeDestaque.overview}
            </p>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              {/* Ao clicar aqui, abre o modal para o filme gigante em destaque */}
              <button className="btn-primary" onClick={() => setFilmeSelecionado(filmeDestaque)}>Detalhes</button>
              <button className="btn-secondary" onClick={() => setFilmeSelecionado(filmeDestaque)}>⭐ Avaliar</button>
            </div>
          </div>
        </div>
      )}

      {/* 🍿 PRATELEIRAS DE CONTEÚDO */}
      <div style={{ padding: '0 5%', marginTop: '-60px', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '45px' }}>
        {renderShelf("Tendências da Semana", filmesEmAlta)}
        {renderShelf("Aclamados pela Crítica", filmesAclamados)}
        {renderShelf("Em Breve nos Cinemas", filmesBreve)}
      </div>

      {/* 🟢 RENDERIZA O MODAL SE UM FILME FOR SELECIONADO */}
      {filmeSelecionado && (
        <MovieModal 
          movie={filmeSelecionado} 
          onClose={() => setFilmeSelecionado(null)} 
        />
      )}

      {/* CSS INLINE */}
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        
        .movie-card { transition: all 0.3s ease; cursor: pointer; position: relative; background: transparent !important; }
        .movie-card:hover { transform: translateY(-8px) scale(1.02); }
        .movie-card img { transition: filter 0.3s ease; }
        .movie-card:hover img { filter: brightness(1.1); box-shadow: 0 12px 20px rgba(148, 102, 255, 0.2); }
        
        .btn-primary { padding: 14px 32px; font-size: 1.05rem; font-weight: bold; background: #9466ff; color: #fff; border: none; border-radius: 8px; cursor: pointer; transition: background 0.3s, transform 0.2s; }
        .btn-primary:hover { background: #7b4df0; transform: scale(1.05); }
        
        .btn-secondary { padding: 14px 32px; font-size: 1.05rem; font-weight: bold; background: rgba(255, 255, 255, 0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; cursor: pointer; transition: all 0.3s, transform 0.2s; backdrop-filter: blur(5px); }
        .btn-secondary:hover { background: rgba(255, 255, 255, 0.25); border-color: rgba(255,255,255,0.6); transform: scale(1.05); }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; text-shadow: 0 0 15px #9466ff; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );

  // Função auxiliar ajustada para o novo formato visual cravado
  function renderShelf(titulo, filmes) {
    return (
      <div>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          <span style={{ width: '5px', height: '22px', background: '#9466ff', borderRadius: '3px', display: 'inline-block' }}></span>
          {titulo}
        </h2>
        
        <div className="hide-scroll" style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '10px 0 20px 0' }}>
          {filmes.map(filme => (
            <div 
              key={filme.id} 
              // AQUI VAI O CLIQUE QUE ABRE O MODAL
              onClick={() => setFilmeSelecionado(filme)}
              className="movie-card"
              style={{ flex: '0 0 160px', display: 'flex', flexDirection: 'column', gap: '8px' }} 
            >
              {/* Caixinha do Pôster (completamente padronizada) */}
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', aspectRatio: '2/3', backgroundColor: '#1a1a24' }}>
                <img 
                  src={filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'https://via.placeholder.com/300x450?text=Sem+Foto'} 
                  alt={filme.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '25px 10px 10px', background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)' }}>
                  <span style={{ color: '#ffb400', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    ★ {filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
              
              {/* Título fora do card, limpo, alinhado ao centro para ficar igual os streamings */}
              <h4 style={{ fontSize: '0.95rem', margin: '0', fontWeight: '500', color: '#e2e2e9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>
                {filme.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Home;