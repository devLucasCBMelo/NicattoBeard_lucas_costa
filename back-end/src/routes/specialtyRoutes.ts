import { Router } from 'express';
import {
  createSpecialtyController,
  deleteSpecialtyController,
  listSpecialtiesController,
  updateSpecialtyController,
} from '../controllers/specialtyController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authRoleMiddleware } from '../middlewares/authRoleMiddleware';

const specialtyRoutes = Router();

specialtyRoutes.post(
  '/specialties',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  createSpecialtyController
);
specialtyRoutes.get('/specialties', authMiddleware, listSpecialtiesController);
specialtyRoutes.put(
  '/specialties/:id',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  updateSpecialtyController
);
specialtyRoutes.delete(
  '/specialties/:id',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  deleteSpecialtyController
);

export default specialtyRoutes;
