import { Router } from 'express';
import {
  createBarberController,
  deleteBarberController,
  listBarbersController,
  updateBaberController,
} from '../controllers/barberController';
import { authMiddleware } from '../middlewares/authMiddleware';

const barberRoutes = Router();

barberRoutes.post('/barbers', authMiddleware, createBarberController);
barberRoutes.get('/barbers', authMiddleware, listBarbersController);
barberRoutes.put('/barbers/:id', authMiddleware, updateBaberController);
barberRoutes.delete('/barbers/:id', authMiddleware, deleteBarberController);

export default barberRoutes;
