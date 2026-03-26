import prisma from '../database';

type CreateSpecialtyInput = {
  name: string;
  description?: string;
};

type UpdateSpecialInput = {
  id: string;
  name?: string;
  description?: string;
};

export async function createSpecialtyService({
  name,
  description,
}: CreateSpecialtyInput) {
  const specialtyAlreadyExists = await prisma.specialty.findUnique({
    where: { name },
  });

  if (specialtyAlreadyExists) {
    throw new Error('Especialidade já cadastrada');
  }

  const specialty = await prisma.specialty.create({
    data: {
      name,
      description,
    },
  });

  return specialty;
}

export async function listSpecialtiesService() {
  const specialties = await prisma.specialty.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return specialties;
}

export async function updateSpecialtyService({
  id,
  name,
  description,
}: UpdateSpecialInput) {
  const specialty = await prisma.specialty.findUnique({
    where: { id },
  });

  if (!specialty) {
    throw new Error('Especialidade não encontrada');
  }

  return prisma.specialty.update({
    where: { id },
    data: {
      name,
      description,
    },
  });
}

export async function deleteSpecialtyService(id: string) {
  const specialty = await prisma.specialty.findUnique({
    where: { id },
  });

  if (!specialty) {
    throw new Error('Especialidade não encontrada');
  }

  await prisma.specialty.delete({
    where: { id },
  });
}
