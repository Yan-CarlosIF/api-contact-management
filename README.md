# API Contact Management

API REST para gerenciamento de contatos, desenvolvida com Node.js, TypeScript, Fastify, Prisma ORM, autenticação com JWT via cookies HTTP-only e criptografia de senhas com bcrypt.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [Cookies HTTP-only]
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## 📁 Estrutura do Projeto

```
📁 Contact-Manager-API
├── 📁 prisma/               # Migrations e schema do banco
├── 📁 src/
│   ├── 📁 controllers/      # Lógica de controle das rotas
│   ├── 📁 middleware/       # Middlewares para autenticação
│   ├── 📁 modules/          # Módulos definidos
│   ├── 📁 routes/           # Definições de rotas
│   └── server.ts            # Arquivo principal da API
└── .env.example             # Exemplo de variáveis de ambiente
```

## ⚙️ Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/Yan-CarlosIF/api-contact-management.git
cd api-contact-management
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

- Renomeie o `.env.example` para `.env`
- Atualize as variáveis de ambiente com suas configurações

4. Execute as migrações:

```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:

```bash
pnpm start
```

## 🔐 Autenticação

A API utiliza autenticação via JWT armazenado em cookie HTTP-only. Após o login, o token é definido no cookie e validado em rotas protegidas por middleware.

## 🔒 Segurança

- Senhas são criptografadas com bcrypt
- Tokens JWT são armazenados em cookies seguros
- Middleware de autenticação protege rotas privadas

## 📌 Funcionalidades

- Cadastro e autenticação de usuários
- Gerenciamento de contatos (CRUD)
- Proteção de rotas com autenticação via JWT
