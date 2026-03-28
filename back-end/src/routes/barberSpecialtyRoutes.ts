import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  attachSpecialtyToBarberController,
  listBarbersWithSpecialtiesController,
  listSpecialtiesByBarberController,
} from '../controllers/barberSpecialtyController';
import { authRoleMiddleware } from '../middlewares/authRoleMiddleware';

const barberSpecialtyRoutes = Router();

barberSpecialtyRoutes.post(
  '/barbers/:barberId/specialties/:specialtyId',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  attachSpecialtyToBarberController
);

barberSpecialtyRoutes.get(
  '/barbers/:barberId/specialties',
  authMiddleware,
  listSpecialtiesByBarberController
);

barberSpecialtyRoutes.get(
  '/barbers-with-specialties',
  authMiddleware,
  listBarbersWithSpecialtiesController
);

export default barberSpecialtyRoutes;
