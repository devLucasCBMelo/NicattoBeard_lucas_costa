import prisma from '../database';

type CreateBarberInput = {
  name: string;
  age: number;
  hiredAt: Date;
};

type UpdateBarberInput = {
  id: string;
  name?: string;
  age?: number;
  hiredAt?: Date;
};

export async function createBarberService({
  name,
  age,
  hiredAt,
}: CreateBarberInput) {
  const barber = await prisma.barber.create({
    data: {
      name,
      age,
      hiredAt,
    },
  });

  return barber;
}

export async function listBarbersService() {
  const barbers = await prisma.barber.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return barbers;
}

export async function updateBarberService({
  id,
  name,
  age,
  hiredAt,
}: UpdateBarberInput) {
  const barber = await prisma.barber.update({
    where: { id },
    data: {
      name,
      age,
      hiredAt,
    },
  });

  if (!barber) {
    throw new Error('Barbeiro não encontrado');
  }

  return prisma.barber.update({
    where: { id },
    data: {
      name,
      age,
      hiredAt,
    },
  });
}

export async function deleteBarberService(id: string) {
  const barber = await prisma.barber.findUnique({
    where: { id },
  });

  if (!barber) {
    throw new Error('Barbeiro não encontrado');
  }

  await prisma.barber.delete({
    where: { id },
  });
}
