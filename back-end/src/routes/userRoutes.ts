import { Router } from 'express';
import {
  deleteUserController,
  listUsersController,
  updateUserController,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRoutes = Router();

userRoutes.get('/users', authMiddleware, listUsersController);
userRoutes.put('/users/:id', authMiddleware, updateUserController);
userRoutes.delete('/users/:id', authMiddleware, deleteUserController);

export default userRoutes;
