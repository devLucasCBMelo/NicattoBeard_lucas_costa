# 💈Barbearia - NicattoBeard

Sistema completo de agendamento para barbearia, desenvolvido com **Node.js, Typescript, React e PostgreSQL**, com autenticação via JWT e controle de permissões por perfil.

## 📌 Visão Geral

Esteja projeto permite que clientes agendem horários com barbeiros, enquanto administradores gerenciam.

O cliente:

- Deve poder se cadastrar na aplicação.
- Agendar seus atendimentos (Selecionar barbeiro, especialidade, dia da semana e horário).
- Ver os agendamentos marcados.
- Poder cancelar seus agendamentos.

O Admin:

- Deve poder cadastrar, atualizar e deletar barbeiros.
- Deve poder cadastrar, atualizar, deletar e vincular especialidades à um barbeiro.
- Ver agendamentos do dia e agendamentos futuros

<details>
  <summary>
    <h3 style="display: inline">
      <strong>🚀 Tecnologias Utilizadas</strong>
    </h3>
  </summary>

### Back-end

- Node.js
- TypeScript
- Express
- Prisa ORM
- PostgreSQL
- JWT (autenticação)
- Bcrypt (hash de senha)

### Front-end

- React
- TypeScript
- Vite
- Axios
- Context API

### Infraestrutura

- Docker
- Docker Compose

</details>

<br>

<details>
  <summary>
    <h3 style="display: inline">
      <strong>🔐 Perfil de Usuário</strong>
    </h3>
  </summary>

    Perfil Permissões

    CLIENT: Agendar, visualizar e cancelar próprios agendamentos

    ADMIN: Gerenciar barbeiros, especialidades, vínculos e visualizar todos os agendamentos.

</details>

<br>

<details>
  <summary>
    <h3 style="display: inline">📊 Regras de Negócio</h3>
  </summary>

- Um usuário pode ter vários agendamentos
- Um barbeiro pode atender vários clientes
- Um barbeiro pode ter várias especialidades
- Não pode existir dois agendamentos no mesmo horário para o mesmo barbeiro
- Apenas o ADMIN pode: - criar/editardeletar barbeiros - criar especialidades - vincular especialidades a barbeiros
</details>

<br>

<details>
  <summary>
    <h3 style="display: inline">⚙️ Variáveis de Ambiente</h3>
  </summary>

Back-end (.env)

```
DATABASE_URL=postgresql://barber123456@localhost:5433/barber_shop
JTW_SECRET=your_secret_key
PORT=3000
```

</details>

<br>

<details>
  <summary>
    <h3 style="display: inline">🐳 Como rodar com o Docker</h3>
  </summary>

Na raiz do projeto utilize o comando no terminal:

```
docker compose up --build
```

A API ficará disponível em:

http://localhost:3000

O front-end ficará disponível em:

http://localhost:5173

O PostgreSQL ficará disponível em:

localhost:5433

</details>

<br>

<details>
  <summary>
    <h3 style="display: inline">📍 Como rodar localmente (sem Docker)</h3>
  </summary>

Na raiz do projeto utilize o comando no terminal:

**Dentro do back-end** rode os comandos:

```
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

A API ficará disponível em:

http://localhost:3000

**Dentro do front-end** rode os comandos:

```
npm install
npm run dev
```

e o front-end ficará disponível em:

http://localhost:5173

</details>

<br>

<details>
  <summary>
    <h3 style="display: inline">🔗 Principais Rotas da API</h3>
  </summary>
  <h3>🔐 Autenticação</h3>
  <h4>POST /auth/register</h4>

Cria usuário CLIENT

```
{
  "name": "Lucas",
  "email": "email@email.com",
  "password": "123456"
}
```

<h4>POST /login</h4>

Realiza o login na aplicação.

```
{
  "email": "email@email.com",
  "password": "123456"
}
```

  <hr>

  <h3>👤 Usuário</h3>
  <h4>GET /me</h4>

Retorna um usuário autenticado

  <hr>

  <h3>💈Barbeiros (ADMIN)</h3>
  <h4>POST /barbers</h4>
  <h4>PUT /barbers</h4>
  <h4>DELETE /barbers</h4>
  <h4>GET /barbers</h4>

  <hr>

  <h3>✂️ Especialidades</h3>
  <h4>GET /specialties</h4>
  <h4>POST /specialties (ADMIN)</h4>

  <hr>

  <h3>🔗 Relacionamento</h3>
  <h4>POST /barbers/:barber_id/specialties/:specialty_id</h4>

  <hr>

  <h3>📅 Agendamentos</h3>
  <h4>POST /appointments</h4>
  Cria um agendamento

```
{
  "barberId": "...",
  "specialtyId": "...",
  "appointmentDate": "2026-04-10T09:00:00"
}
```

<h4>GET /appointments/me</h4>
- Lista meus agendamentos

<h4>DELETE /appointment/:id</h4>
- Cancela um agendamento

<h4>GET /appointments/today</h4>
- Lista agendamentos do dia
<h4>GET /appointments/future<h4>
- Lista agendemanetos futuros

<h4>GET /barbers/:barberId/appointments?date=YYY-MM-DD</h4>
- Horários ocupados

</details>
