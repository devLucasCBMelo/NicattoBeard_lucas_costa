import prisma from '../database';

type CreateBarberInput = {
  name: string;
  age: number;
  hiredAt: Date;
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
