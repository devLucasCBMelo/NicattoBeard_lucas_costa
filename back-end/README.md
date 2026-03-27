# 💈 Nicatto Beard — Back-end

API REST para gerenciamento de uma barbearia, com autenticação de usuários, cadastro de barbeiros, especialidades e agendamentos.

---

## 📌 Sobre o projeto

Este back-end foi desenvolvido em **Node.js com TypeScript**, utilizando:

- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT**
- **Bcrypt**

A aplicação permite:

- cadastro e login de usuários
- autenticação com token JWT
- gerenciamento de usuários
- cadastro e gerenciamento de barbeiros
- cadastro e gerenciamento de especialidades
- relacionamento entre barbeiros e especialidades
- criação e cancelamento de agendamentos
- visualização de agendamentos do próprio usuário
- visualização de agendamentos do dia e futuros para administrador

---

## 🛠 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- JWT (`jsonwebtoken`)
- Bcrypt
- TSX

---

## 📁 Estrutura do projeto

```bash
src/
  controllers/
  middlewares/
  routes/
  services/
  types/
  database.ts
  server.ts

prisma/
  schema.prisma
  migrations/
```

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto , você precisa ter instalado na máquina:

- **Node.js**
- **npm**
- **PostgreSQL**

## 🔐 Variáveis de ambiente

Crie um arquivo .env na raiz do back-end com o seguinte conteúdo:

```
DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/NOME_DO_BANCO
JWT_SECRET=sua_chave_secreta_aqui
```

## Como roda a aplicação

1. Instalar dependências

```
npm install
```

2. Gerar o Prisma CLiente

```
npx prisma generate
```

3. Rodar as migrations

```
npx prisma migrate dev
```

4. Iniciar o servidor em desenvolvimento

```
npm run dev
```

O servidor será iniciado em:

```
http://localhost:3000
```

---

## 👀 Visualizar o banco com Prisma Studio

Para abrir uma interface visual do banco de dados:

```
npx prisma studio
```

## Autenticação

As rotas protegidas utilizam JWT.

Após fazer login, envie o token no header:

```
Authorization: Bearer SEU_TOKEN
```
