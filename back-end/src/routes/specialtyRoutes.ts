import { Router } from 'express';
import {
  createSpecialtyController,
  deleteSpecialtyController,
  listSpecialtiesController,
  updateSpecialtyController,
} from '../controllers/specialtyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const specialtyRoutes = Router();

specialtyRoutes.post('/specialties', authMiddleware, createSpecialtyController);
specialtyRoutes.get('/specialties', authMiddleware, listSpecialtiesController);
specialtyRoutes.put(
  '/specialties/:id',
  authMiddleware,
  updateSpecialtyController
);
specialtyRoutes.delete(
  '/specialties/:id',
  authMiddleware,
  deleteSpecialtyController
);

export default specialtyRoutes;
