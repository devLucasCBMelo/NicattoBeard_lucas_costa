import { Request, Response } from 'express';
import {
  createSpecialtyService,
  listSpecialtiesService,
} from '../services/specialtyService';

type CreateSpecialtyBody = {
  name: string;
  description?: string;
};

export async function createSpecialtyController(
  req: Request<{}, {}, CreateSpecialtyBody>,
  res: Response
) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: 'O nome da especialidade é obrigatório.' });
    }

    const specialty = await createSpecialtyService({
      name,
      description,
    });

    return res.status(201).json(specialty);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ messsage: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function listSpecialtiesController(req: Request, res: Response) {
  try {
    const specialties = await listSpecialtiesService();
    return res.status(200).json(specialties);
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
