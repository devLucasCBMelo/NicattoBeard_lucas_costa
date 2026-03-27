import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../database';
import { UserRole } from '@prisma/client';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

type LoginInput = {
  email: string;
  password: string;
};

export async function registerService({
  name,
  email,
  password,
  role,
}: RegisterInput) {
  const userAlreadyExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userAlreadyExists) {
    throw new Error('Já existe um usuário com este e-mail');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function loginService({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('E-mail ou senha inválidos');
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    throw new Error('E-mail ou senha inválidos');
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET não configurado');
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    {
      expiresIn: '1d',
      algorithm: 'HS256',
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
