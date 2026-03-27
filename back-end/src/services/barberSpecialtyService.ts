import prisma from '../database';

type AttachSpecialtyToBarberInput = {
  barberId: string;
  specialtyId: string;
};

export async function attachSpecialtyToBarberService({
  barberId,
  specialtyId,
}: AttachSpecialtyToBarberInput) {
  const barber = await prisma.barber.findUnique({
    where: { id: barberId },
  });

  if (!barber) {
    throw new Error('Barbeiro não encontrado!');
  }

  const specialty = await prisma.specialty.findUnique({
    where: { id: specialtyId },
  });

  if (!specialty) {
    throw new Error('Especialidade não encontrada');
  }

  const relationAlreadyExists = await prisma.barberSpecialty.findUnique({
    where: {
      barberId_specialtyId: {
        barberId,
        specialtyId,
      },
    },
  });

  if (relationAlreadyExists) {
    throw new Error('Essa especialidade já está vinculada a esse barbeiro');
  }

  const barberSpecialty = await prisma.barberSpecialty.create({
    data: {
      barberId,
      specialtyId,
    },
    include: {
      barber: true,
      specialty: true,
    },
  });

  return barberSpecialty;
}
