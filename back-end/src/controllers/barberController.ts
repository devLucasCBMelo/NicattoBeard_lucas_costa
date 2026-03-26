import { Request, Response } from 'express';
import {
  createBarberService,
  listBarbersService,
} from '../services/barberService';

type CreateBarberBody = {
  name: string;
  age: number;
  hiredAt: string;
};

export async function createBarberController(
  req: Request<{}, {}, CreateBarberBody>,
  res: Response
) {
  try {
    const { name, age, hiredAt } = req.body;

    if (!name || !age || !hiredAt) {
      return res.status(400).json({
        message: 'Nome, idade e data de contratação são obrigatórios',
      });
    }

    const barber = await createBarberService({
      name,
      age,
      hiredAt: new Date(hiredAt),
    });

    return res.status(201).json(barber);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function listBarbersController(req: Request, res: Response) {
  try {
    const barbers = await listBarbersService();

    return res.status(200).json(barbers);
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
