import 'dotenv/config';
import express, { Request, Response } from 'express';
const prisma = require('./database');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'Olá Mundo!' })
);

app.post('/users', async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  res.json(user);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
