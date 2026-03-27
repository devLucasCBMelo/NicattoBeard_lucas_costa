import { Request, Response } from 'express';
import {
  cancelAppoitmentsService,
  createAppointmentService,
  listFutureAppointmentsService,
  listMyAppointmentsService,
  listTodayAppointmentsService,
} from '../services/appointmentsService';

type CreateAppointmentBody = {
  barberId: string;
  specialtyId: string;
  appointmentDate: string;
};

type CancelAppointmentParams = {
  id: string;
};

export async function createAppointmentController(
  req: Request<{}, {}, CreateAppointmentBody>,
  res: Response
) {
  try {
    const { barberId, specialtyId, appointmentDate } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    if (!barberId || !specialtyId || !appointmentDate) {
      return res.status(400).json({
        message: 'barberId, specialtyId e appointmentDate são obrigatórios',
      });
    }

    const appointment = await createAppointmentService({
      userId: req.user.id,
      barberId,
      specialtyId,
      appointmentDate: new Date(appointmentDate),
    });

    return res.status(201).json(appointment);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function listMyAppointmentsController(
  req: Request,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const appointments = await listMyAppointmentsService(req.user.id);

    return res.status(200).json(appointments);
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function cancelAppointmentController(
  req: Request<CancelAppointmentParams>,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { id } = req.params;

    const appointment = await cancelAppoitmentsService(
      id,
      req.user.id,
      req.user.role
    );

    return res.status(200).json(appointment);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function listTodayAppointmentsController(
  req: Request,
  res: Response
) {
  try {
    const appointments = await listTodayAppointmentsService();

    return res.status(200).json(appointments);
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function listFutureAppointmentsController(
  req: Request,
  res: Response
) {
  try {
    const appointments = await listFutureAppointmentsService();

    return res.status(200).json(appointments);
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
