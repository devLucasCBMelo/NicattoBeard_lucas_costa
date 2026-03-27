import { Request, Response } from 'express';
import {
  deleteUserService,
  listUsersService,
  updateUserService,
} from '../services/userService';

type UpdateUserBody = {
  name?: string;
  email?: string;
  role?: 'ADMIN' | 'CLIENT';
};

export async function listUsersController(req: Request, res: Response) {
  try {
    const users = await listUsersService();
    return res.status(200).json(users);
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function updateUserController(
  req: Request<{ id: string }, {}, UpdateUserBody>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await updateUserService({
      id,
      name,
      email,
      role,
    });

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function deleteUserController(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    await deleteUserService(id);

    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
