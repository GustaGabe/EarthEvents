# EarthEvents 🌍

EarthEvents é uma aplicação web que permite aos usuários explorar e acompanhar eventos naturais em tempo real ao redor do mundo, utilizando dados da API EONET da NASA. A plataforma oferece uma interface moderna e intuitiva para visualizar informações sobre incêndios florestais, tempestades, vulcões, terremotos e outros eventos naturais.

## ✨ Funcionalidades

- Visualização de eventos naturais em tempo real
- Sistema de autenticação de usuários
- Favoritar eventos para acompanhamento
- Filtros por categoria e busca por texto
- Visualização detalhada de cada evento
- Interface responsiva e moderna
- Tema dark mode

## 🛠️ Stack Tecnológica

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- Lucide Icons
- Shadcn/ui

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- NASA EONET API

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- NPM ou Yarn
- Conta na NASA API (para chave de API)

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/earth-events.git
cd earth-events
```

### 2. Configuração do Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/earth_events"
NASA_API_KEY="sua-chave-api-nasa"
JWT_SECRET="seu-segredo-jwt"
```

```bash
# Executar migrações do banco de dados
npx prisma migrate dev

# Iniciar o servidor de desenvolvimento
npm run start:dev
```

### 3. Configuração do Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXTAUTH_SECRET="seu-segredo-nextauth"
NEXTAUTH_URL="http://localhost:3000"
```

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

## 🌐 Acessando a Aplicação

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 📁 Estrutura do Projeto

```
earth-events/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── providers/
│   ├── public/
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── services/
    │   ├── modules/
    │   └── prisma/
    └── package.json
```

## 🔑 Autenticação

O projeto utiliza NextAuth.js para autenticação, suportando:
- Login com Google
- Login com Email/Senha
- Proteção de rotas
- Gerenciamento de sessão

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. Principais modelos:

- User
- Favorite
- Event

## 🔄 Integração com NASA EONET

A aplicação consome a API EONET da NASA para obter dados em tempo real sobre eventos naturais. Para obter uma chave de API:

1. Acesse https://api.nasa.gov/
2. Crie uma conta
3. Solicite uma chave de API
4. Adicione a chave no arquivo .env do backend