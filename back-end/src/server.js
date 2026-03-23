require('dotenv').config({ path: '.env' });
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const express = require('express');
const prisma = require('./database');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

app.post('/users', async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });

  res.json(user);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
