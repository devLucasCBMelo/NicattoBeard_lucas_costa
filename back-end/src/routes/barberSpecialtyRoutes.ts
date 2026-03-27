import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  attachSpecialtyToBarberController,
  listBarbersWithSpecialtiesController,
  listSpecialtiesByBarberController,
} from '../controllers/barberSpecialtyController';

const barberSpecialtyRoutes = Router();

barberSpecialtyRoutes.post(
  '/barbers/:barberId/specialties/:specialtyId',
  authMiddleware,
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
