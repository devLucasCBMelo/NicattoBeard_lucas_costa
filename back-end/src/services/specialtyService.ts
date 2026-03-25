const prisma = require('./database');

type CreateSpecialtyInput = {
  name: string;
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
