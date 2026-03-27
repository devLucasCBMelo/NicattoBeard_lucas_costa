import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { loginService, registerService } from '../services/authService';

type RegisterBody = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

type LoginBody = {
  email: string;
  password: string;
};

export async function registerController(
  req: Request<{}, {}, RegisterBody>,
  res: Response
) {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerService({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function loginController(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const result = await loginService({
      email,
      password,
    });

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      const statusCode =
        error.message === 'JWT_SECRET não configurado' ? 500 : 401;

      return res.status(statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
