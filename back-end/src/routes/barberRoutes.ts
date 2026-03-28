import { Router } from 'express';
import {
  createBarberController,
  deleteBarberController,
  listBarbersController,
  updateBaberController,
} from '../controllers/barberController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authRoleMiddleware } from '../middlewares/authRoleMiddleware';

const barberRoutes = Router();

barberRoutes.post(
  '/barbers',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  createBarberController
);
barberRoutes.get('/barbers', authMiddleware, listBarbersController);
barberRoutes.put(
  '/barbers/:id',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  updateBaberController
);
barberRoutes.delete(
  '/barbers/:id',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  deleteBarberController
);

export default barberRoutes;
