import { useState, useEffect } from 'react';


const TMDB_API_KEY = '478af884941f8697966773cbf0179b99'; 

const ProcurarFilmes = () => {
  const [filmes, setFilmes] = useState([]);
  
  // Nossos estados para os filtros
  const [buscaTexto, setBuscaTexto] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [ordenacao, setOrdenacao] = useState('popularity.desc'); // Padrão: mais populares

  // Função que constrói a URL e busca os dados
  const buscarFilmes = async () => {
    let url = '';

    // SE O USUÁRIO DIGITOU ALGO (Busca por texto tem prioridade)
    if (buscaTexto) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=pt-BR&query=${buscaTexto}`;
    } 
    // SE ELE ESTIVER USANDO OS FILTROS (Discover)
    else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=pt-BR&sort_by=${ordenacao}`;
      
      if (genero) url += `&with_genres=${genero}`;
      if (ano) url += `&primary_release_year=${ano}`;
    }

    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      setFilmes(dados.results || []);
    } catch (erro) {
      console.error("Erro ao buscar filmes:", erro);
    }
  };

  // Faz a busca automaticamente sempre que um filtro (gênero, ano ou ordenação) mudar
  useEffect(() => {
    // Só faz a busca automática se não tiver texto digitado (para evitar conflitos)
    if (!buscaTexto) {
      buscarFilmes();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genero, ano, ordenacao]); 

  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', color: '#fff' }}>
      <h1>Procurar Filmes</h1>

      {/* ÁREA DE CONTROLES E FILTROS */}
      <div style={{ background: '#141419', padding: '20px', borderRadius: '12px', marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        
        {/* 1. Campo de Texto Livre */}
        <input 
          type="text" 
          placeholder="Digite o nome do filme..." 
          value={buscaTexto}
          onChange={(e) => setBuscaTexto(e.target.value)}
          style={{ flex: '1 1 200px', padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#25252b', color: '#fff' }}
        />
        <button 
          onClick={buscarFilmes}
          style={{ padding: '10px 20px', background: '#9466ff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Pesquisar Nome
        </button>

        {/* 2. Filtro de Gênero */}
        <select 
          value={genero} 
          onChange={(e) => { setGenero(e.target.value); setBuscaTexto(''); }}
          style={{ flex: '1 1 150px', padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#25252b', color: '#fff' }}
        >
          <option value="">Todos os Gêneros</option>
          <option value="28">Ação</option>
          <option value="12">Aventura</option>
          <option value="35">Comédia</option>
          <option value="878">Ficção Científica</option>
          <option value="27">Terror</option>
          <option value="10749">Romance</option>
        </select>

        {/* 3. Filtro de Ano */}
        <input 
          type="number" 
          placeholder="Ex: 2023" 
          value={ano}
          onChange={(e) => { setAno(e.target.value); setBuscaTexto(''); }}
          style={{ flex: '1 1 100px', padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#25252b', color: '#fff' }}
        />

        {/* 4. Filtro de Ordenação */}
        <select 
          value={ordenacao} 
          onChange={(e) => { setOrdenacao(e.target.value); setBuscaTexto(''); }}
          style={{ flex: '1 1 150px', padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#25252b', color: '#fff' }}
        >
          <option value="popularity.desc">Mais Populares</option>
          <option value="vote_average.desc">Melhores Notas</option>
          <option value="primary_release_date.desc">Lançamentos Recentes</option>
        </select>
      </div>

      {/* ÁREA DE RESULTADOS (Onde os filmes aparecem) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {filmes.length > 0 ? (
          filmes.map(filme => (
            <div key={filme.id} style={{ textAlign: 'center' }}>
              <img 
                src={filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'https://via.placeholder.com/150x225?text=Sem+Foto'} 
                alt={filme.title} 
                style={{ width: '100%', borderRadius: '8px', aspectRatio: '2/3', objectFit: 'cover' }}
              />
              <h4 style={{ fontSize: '0.9rem', marginTop: '10px' }}>{filme.title}</h4>
            </div>
          ))
        ) : (
          <p>Nenhum filme encontrado com esses filtros.</p>
        )}
      </div>
    </div>
  );
};

export default ProcurarFilmes;