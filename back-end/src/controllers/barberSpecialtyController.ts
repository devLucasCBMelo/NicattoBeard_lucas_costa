import { Request, Response } from 'express';
import {
  attachSpecialtyToBarberService,
  listBarbersWithSpecialtiesService,
  listSpecialtiesByBarberService,
} from '../services/barberSpecialtyService';

type AttachParams = {
  barberId: string;
  specialtyId: string;
};

type BarberParams = {
  barberId: string;
};

export async function attachSpecialtyToBarberController(
  req: Request<AttachParams>,
  res: Response
) {
  try {
    const { barberId, specialtyId } = req.params;

    const result = await attachSpecialtyToBarberService({
      barberId,
      specialtyId,
    });

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function listSpecialtiesByBarberController(
  req: Request<BarberParams>,
  res: Response
) {
  try {
    const { barberId } = req.params;

    const result = await listSpecialtiesByBarberService(barberId);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function listBarbersWithSpecialtiesController(
  req: Request,
  res: Response
) {
  try {
    const result = await listBarbersWithSpecialtiesService();

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
