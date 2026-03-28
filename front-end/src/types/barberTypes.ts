export type Specialty = {
  id: string;
  name: string;
  description?: string;
};

export type BarberSpecialty = {
  barberId: string;
  specialtyId: string;
  specialty: Specialty;
};

export type Barber = {
  id: string;
  name: string;
  age: number;
  hiredAt: string;
  specialties: BarberSpecialty[];
};

export type CreateAppointmentPayload = {
  barberId: string;
  specialtyId: string;
  appointmentDate: string;
};
