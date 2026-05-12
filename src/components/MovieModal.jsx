// Importa os hooks do React para controlar estados e executar efeitos colaterais.
import { useState, useEffect } from 'react';

// Componente de modal que mostra detalhes do filme e permite adicionar reviews.
const MovieModal = ({ movie, onClose }) => {

  // Estado que armazena as reviews do filme.
  const [reviews, setReviews] = useState([]);

  // Estado para controlar o texto digitado no textarea.
  const [text, setText] = useState("");

  // Estado usado para mostrar mensagem de sucesso após enviar review.
  const [submitted, setSubmitted] = useState(false);

  // Executa quando o modal abre ou quando o filme muda.
  useEffect(() => {

    // Busca todas as reviews salvas no localStorage.
    const allReviews = JSON.parse(localStorage.getItem('movieReviews')) || {};

    // Carrega apenas as reviews do filme atual.
    setReviews(allReviews[movie.id] || []);

    // Impede o scroll da página enquanto o modal estiver aberto.
    document.body.style.overflow = 'hidden';

    // Quando o modal fecha, libera novamente o scroll.
    return () => {
      document.body.style.overflow = '';
    };
  }, [movie.id]);

  // Função chamada ao enviar uma nova review.
  const handleAddReview = (e) => {
    e.preventDefault();

    // Recupera reviews salvas.
    const allReviews = JSON.parse(localStorage.getItem('movieReviews')) || {};

    // Cria nova review com texto e data atual.
    const newReview = {
      text,
      date: new Date().toLocaleDateString('pt-BR')
    };

    // Atualiza as reviews do filme atual.
    const updatedReviews = {
      ...allReviews,
      [movie.id]: [...(allReviews[movie.id] || []), newReview]
    };

    // Salva no localStorage.
    localStorage.setItem('movieReviews', JSON.stringify(updatedReviews));

    // Atualiza o estado das reviews.
    setReviews(updatedReviews[movie.id]);

    // Limpa o textarea.
    setText("");

    // Mostra feedback visual de sucesso.
    setSubmitted(true);

    // Remove a mensagem após 2 segundos.
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    // Fecha o modal ao clicar fora dele.
    <div className="modal-overlay" onClick={onClose}>

      {/* Impede que o modal feche ao clicar dentro do conteúdo */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Botão de fechar modal */}
        <button className="close-btn" onClick={onClose} aria-label="Fechar">

          {/* Ícone SVG de "X" */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-body">

          {/* Área da imagem do filme */}
          <div className="modal-poster">
            <img
              src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=Sem+Foto'}
              alt={movie.title}
            />
          </div>

          {/* Informações do filme */}
          <div className="modal-info">

            {/* Nome do filme */}
            <h2>{movie.title}</h2>

            {/* Ano de lançamento */}
            {movie.release_date && (
              <span className="modal-year">
                {movie.release_date.slice(0, 4)}
              </span>
            )}

            {/* Nota média do filme */}
            <p className="modal-rating">
              ⭐ {movie.vote_average?.toFixed(1)}
            </p>

            {/* Sinopse */}
            <p className="modal-overview">
              {movie.overview || 'Sinopse não disponível.'}
            </p>

            {/* Formulário para enviar review */}
            <form onSubmit={handleAddReview} className="modal-review-form">

              {/* Campo de texto da review */}
              <textarea
                placeholder="O que achou deste filme?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />

              {/* Botão de envio */}
              <button
                type="submit"
                className={submitted ? 'btn-success' : ''}
              >
                {submitted
                  ? '✓ Review enviada!'
                  : 'Enviar Review'}
              </button>
            </form>

            {/* Mostra as reviews apenas se existir pelo menos uma */}
            {reviews.length > 0 && (
              <div className="reviews-container">

                <h4>Reviews</h4>

                {/* Lista de reviews */}
                {reviews.map((r, i) => (
                  <div key={i} className="review-pill">

                    {/* Texto da review */}
                    <p>{r.text}</p>

                    {/* Data da review */}
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