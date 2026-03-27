import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  cancelAppointmentController,
  createAppointmentController,
  listMyAppointmentsController,
} from '../controllers/appointmentsController';

const appointmentRoutes = Router();

appointmentRoutes.post(
  '/appointments',
  authMiddleware,
  createAppointmentController
);
appointmentRoutes.get(
  '/appointments/me',
  authMiddleware,
  listMyAppointmentsController
);
appointmentRoutes.delete(
  '/appointments/:id',
  authMiddleware,
  cancelAppointmentController
);

export default appointmentRoutes;
