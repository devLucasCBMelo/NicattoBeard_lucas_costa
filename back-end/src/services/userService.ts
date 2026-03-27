import prisma from '../database';

type UpdateUserInput = {
  id: string;
  name?: string;
  email?: string;
  role?: 'ADMIN' | 'CLIENT';
};

export async function listUsersService() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateUserService({
  id,
  name,
  email,
  role,
}: UpdateUserInput) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function deleteUserService(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  await prisma.user.delete({
    where: { id },
  });
}
