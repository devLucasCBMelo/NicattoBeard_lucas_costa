import 'dotenv/config';
import express, { Request, Response } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import specialtyRoutes from './routes/specialtyRoutes';
import barberRoutes from './routes/barberRoutes';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import barberSpecialtyRoutes from './routes/barberSpecialtyRoutes';

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(specialtyRoutes);
app.use(barberRoutes);
app.use(userRoutes);
app.use(barberSpecialtyRoutes);

app.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'Olá Mundo!' })
);

app.get('/me', authMiddleware, async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Rota protegida acessada com sucesso',
    user: req.user,
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
