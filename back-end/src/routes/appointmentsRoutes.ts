import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  cancelAppointmentController,
  createAppointmentController,
  listFutureAppointmentsController,
  listMyAppointmentsController,
  listTodayAppointmentsController,
} from '../controllers/appointmentsController';
import { authRoleMiddleware } from '../middlewares/authRoleMiddleware';

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

appointmentRoutes.get(
  '/appointments/today',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  listTodayAppointmentsController
);

appointmentRoutes.get(
  '/appointments/future',
  authMiddleware,
  authRoleMiddleware('ADMIN'),
  listFutureAppointmentsController
);

export default appointmentRoutes;
