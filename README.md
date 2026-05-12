# MovieSearch

O MovieSearch é uma aplicação web desenvolvida em React que funciona como um catálogo digital de cinema em tempo real.

O principal objetivo do projeto é permitir que os usuários explorem filmes populares, realizem buscas personalizadas e gerenciem suas próprias críticas de forma persistente.

A aplicação permite pesquisar filmes e visualizar informações relevantes, como:

- Ano de lançamento;
- Sinopse;
- Detalhes da obra;


O sistema foi desenvolvido com foco em experiência do usuário, consumo de APIs e atualização dinâmica de conteúdo.

---

## 🚀 Funcionalidades

- 🔍 Pesquisa de filmes em tempo real;
- 🎬 Exibição de filmes populares;
- 📝 Gerenciamento de críticas e avaliações;
- 💾 Persistência de dados das críticas;
- 📄 Visualização de detalhes dos filmes;
- 📅 Exibição do ano de lançamento;
- 📖 Exibição da sinopse dos filmes;
- ⚡ Interface dinâmica e responsiva;
- 🌐 Consumo de APIs externas;

---

## 🛠️ Tecnologias Utilizadas

<p align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/REST_API-4A90E2?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-121013?style=flat-square&logo=github&logoColor=white" />
</p>

---

## 🔌 APIs Utilizadas

### 🎥 TMDB API

Responsável por fornecer:

- Filmes populares;
- Busca de filmes;
- Sinopse;
- Data de lançamento;
- Informações gerais da obra;

[TMDB API](https://developer.themoviedb.org/)

### 📰 News API

Responsável por buscar notícias relacionadas aos filmes pesquisados.

[News API](https://newsapi.org/)

---

## 📂 Estrutura do Projeto

```bash
moviesearch/
│
├── public/
│
├── src/
│   ├── assets/          # Imagens e arquivos estáticos
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Integração com APIs
│   ├── styles/          # Estilos globais
│   ├── App.js           # Componente principal
│   └── main.js          # Inicialização da aplicação
│
├── package.json
├── README.md
└── vite.config.js
```

---

## ▶️ Como Executar o Projeto

### Clone o repositório

```bash
git clone https://github.com/HevelynLV/moviesearch.git
```

### Acesse a pasta do projeto

```bash
cd moviesearch
```

### Instale as dependências

```bash
npm install
```

### Execute o projeto

```bash
npm run dev
```
