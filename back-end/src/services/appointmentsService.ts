import prisma from '../database';

type CreateAppointmentInput = {
  userId: string;
  barberId: string;
  specialtyId: string;
  appointmentDate: Date;
};

function isValidAppointmentTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const isValidHour = hours >= 8 && hours < 18;
  const isVlalidMinute = minutes === 0 || minutes === 30;

  return isValidHour && isVlalidMinute;
}

export async function createAppointmentService({
  userId,
  barberId,
  specialtyId,
  appointmentDate,
}: CreateAppointmentInput) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const barber = await prisma.barber.findUnique({
    where: { id: barberId },
  });

  if (!barber) {
    throw new Error('Barbeiro não encontrado');
  }

  const specialty = await prisma.specialty.findUnique({
    where: { id: specialtyId },
  });

  if (!specialty) {
    throw new Error('Especialidade não encontrada');
  }

  const barberHasSpecialty = await prisma.barberSpecialty.findUnique({
    where: {
      barberId_specialtyId: {
        barberId,
        specialtyId,
      },
    },
  });

  if (!barberHasSpecialty) {
    throw new Error('Esse barbeiro não possui essa especialidade.');
  }

  if (!isValidAppointmentTime(appointmentDate)) {
    throw new Error(
      'O horário do agendamento deve estar entre 08:00 e 18:00, com intervalos de 30 minutos'
    );
  }

  if (appointmentDate <= new Date()) {
    throw new Error(
      'Não é possível criar agendamento em data ou horário passados'
    );
  }

  const appointmentAlreadyExists = await prisma.appointment.findUnique({
    where: {
      barberId_appointmentDate: {
        barberId,
        appointmentDate,
      },
    },
  });

  if (appointmentAlreadyExists) {
    throw new Error(
      'Já existe um agendamento para esse barbeiro nesse horário'
    );
  }

  const appointment = await prisma.appointment.create({
    data: {
      userId,
      barberId,
      specialtyId,
      appointmentDate,
    },
    include: {
      user: true,
      barber: true,
      specialty: true,
    },
  });

  return appointment;
}

export async function listMyAppointmentsService(userId: string) {
  const appointments = await prisma.appointment.findMany({
    where: {
      userId,
    },
    include: {
      barber: true,
      specialty: true,
    },
    orderBy: {
      appointmentDate: 'desc',
    },
  });

  return appointments;
}

export async function cancelAppoitmentsService(
  appointmentId: string,
  userId: string,
  userRole: 'ADMIN' | 'CLIENT'
) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment) {
    throw new Error('Agendamento não encontrado.');
  }

  if (userRole === 'CLIENT' && appointment.userId !== userId) {
    throw new Error('Você não tem permissão para cancelar o agendamento.');
  }

  const twoHoursInMs = 2 * 60 * 60 * 1000;
  const now = new Date();

  if (
    userRole === 'CLIENT' &&
    appointment.appointmentDate.getTime() - now.getTime() < twoHoursInMs
  ) {
    throw new Error(
      'O cancelamento só pode ser feito com no mínimo duas horas de antecedêndia'
    );
  }

  const updateAppointment = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      status: 'CANCELED',
      canceledAt: new Date(),
    },
    include: {
      barber: true,
      specialty: true,
    },
  });

  return updateAppointment;
}

export async function listTodayAppointmentsService() {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: {
      appointmentDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: 'SCHEDULED',
    },
    include: {
      user: true,
      barber: true,
      specialty: true,
    },
    orderBy: {
      appointmentDate: 'asc',
    },
  });

  return appointments;
}

export async function listFutureAppointmentsService() {
  const now = new Date();

  const appointments = await prisma.appointment.findMany({
    where: {
      appointmentDate: {
        gt: now,
      },
      status: 'SCHEDULED',
    },
    include: {
      user: true,
      barber: true,
      specialty: true,
    },
    orderBy: {
      appointmentDate: 'asc',
    },
  });

  return appointments;
}

export async function listAppointmentsByBarberAndDAteService(
  barberId: string,
  date: string
) {}
