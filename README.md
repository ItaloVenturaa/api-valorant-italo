# Projeto Valorant - FullStack

Este é um projeto fullstack desenvolvido como parte da disciplina de Desenvolvimento Web FullStack. O objetivo é aplicar conceitos de autenticação, consumo de APIs externas, proteção de rotas, diferença de permissões de usuário e boas práticas de desenvolvimento web.

## 🌐 Tecnologias Utilizadas

### Frontend:

* React
* React Router
* Bootstrap
* Vite

### Backend:

* Node.js
* Express
* MongoDB (via Mongoose)
* JWT (Json Web Token)
* dotenv
* Axios

## ⚖️ Funcionalidades

* Autenticação com JWT (usuário comum e admin)
* Restrição de acesso a rotas (admin pode acessar mapas)
* Busca por agentes e mapas usando a API pública do Valorant
* Adição de agentes e mapas a uma lista de favoritos (tipo "carrinho")
* Remoção individual e total dos favoritos
* Cache em memória no backend (por 1 minuto)
* Compressão HTTP
* Logs simples de buscas no terminal

## 🔑 Regras de Acesso

* Usuários **comuns** podem pesquisar **somente agentes**
* Usuários **admin** podem pesquisar **agentes e mapas**
* Ao tentar pesquisar mapas sendo um usuário comum, é retornada uma mensagem de erro 403

## 🚀 Como rodar localmente

### Backend:

```bash
cd backend
npm install
cp .env.example .env # ou crie manualmente com suas variáveis
npm run dev
```

### Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Seed de usuários:

```bash
npm run seed
```

Usuários criados:

* **admin** / admin123
* **user** / user123

## 🔹 Observações

* O frontend está configurado para rodar em `http://localhost:5173`
* O backend está em `http://localhost:8000`
* O token JWT expira em 1 hora

## 🧑‍💻 Autor

**Ítalo Ventura**
Estudante de Análise e Desenvolvimento de Sistemas na UTFPR

[GitHub - ItaloVenturaa](https://github.com/ItaloVenturaa)

## 🔎 Exemplos de busca

Você pode buscar por **Agentes** ou **Mapas** do jogo Valorant.

### 🔹 Agentes disponíveis para busca:

- Jett  
- Phoenix  
- Sova  
- Reyna  
- Raze  
- Omen  
- Sage  
- Killjoy  
- Brimstone  
- Viper  
- Cypher  
- Breach  
- Skye  
- Chamber  
- Fade  
- Harbor  
- Gekko  
- Deadlock  

### 🔹 Mapas disponíveis (apenas para administradores):

- Ascent  
- Bind  
- Haven  
- Icebox  
- Breeze  
- Split  
- Lotus  
- Pearl  
- Sunset  

> ✅ Obs.: a busca não liga para maiúsculas ou minúsculas, então apenas digite os nomes corretamente.
