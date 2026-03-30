import { formatDateToYYYYMMDD } from './formatters';

export function generateNextDays(totalDays = 7, startOffset = 0) {
  const days: Date[] = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + startOffset + i);
    days.push(date);
  }

  return days;
}

export function generateTimeSlots() {
  const slots: string[] = [];

  for (let hour = 8; hour < 18; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }

  return slots;
}

export function buildAppointmentDate(date: Date, time: string) {
  const formattedDate = formatDateToYYYYMMDD(date);
  return `${formattedDate}T${time}:00`;
}
