import { Router } from 'express';
import {
  createBarberController,
  listBarbersController,
} from '../controllers/barberController';
import { authMiddleware } from '../middlewares/authMiddleware';

const barberRoutes = Router();

barberRoutes.post('/barbers', authMiddleware, createBarberController);
barberRoutes.get('/barbers', authMiddleware, listBarbersController);

export default barberRoutes;
