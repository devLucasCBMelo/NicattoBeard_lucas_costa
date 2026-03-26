import { Router } from 'express';
import {
  createSpecialtyController,
  listSpecialtiesController,
} from '../controllers/specialtyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const specialtyRoutes = Router();

specialtyRoutes.post('/specialties', authMiddleware, createSpecialtyController);
specialtyRoutes.get('/specialties', authMiddleware, listSpecialtiesController);

export default specialtyRoutes;
