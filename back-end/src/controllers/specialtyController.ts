import { Request, Response } from 'express';
import {
  createSpecialtyService,
  deleteSpecialtyService,
  listSpecialtiesService,
  updateSpecialtyService,
} from '../services/specialtyService';

type CreateSpecialtyBody = {
  name: string;
  description?: string;
};

type UpdateSpecialInput = {
  name?: string;
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

export async function updateSpecialtyController(
  req: Request<{ id: string }, {}, UpdateSpecialInput>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const specialty = await updateSpecialtyService({
      id,
      name,
      description,
    });

    return res.status(200).json(specialty);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno de servidor ' });
  }
}

export async function deleteSpecialtyController(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;
    await deleteSpecialtyService(id);
    return res
      .status(200)
      .json({ message: 'Especialidade deletada com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
