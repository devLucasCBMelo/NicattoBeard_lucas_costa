import 'dotenv/config';
import express, { Request, Response } from 'express';
import { CreateUserBody, LoginType } from './types/index';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middlewares/authMiddleware';
import specialtyRoutes from './routes/specialtyRoutes';

const prisma = require('./database');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(specialtyRoutes);

app.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'Olá Mundo!' })
);

app.post(
  '/users',
  async (req: Request<{}, {}, CreateUserBody>, res: Response) => {
    try {
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

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }
);

app.post('/login', async (req: Request<{}, {}, LoginType>, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.status(401).json({ message: 'E-mail inválido!' });
    }

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha inválida!' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: 'JWT_SECRET não configurado!' });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      secret,
      {
        expiresIn: '1d',
        algorithm: 'HS256',
      }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

app.get('/me', authMiddleware, async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Rota protegida acessada com sucesso',
    user: req.user,
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
