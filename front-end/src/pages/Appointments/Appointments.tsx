import { useEffect, useMemo, useState } from 'react';
import type { Barber } from '../../types/barberTypes';
import Header from '../../components/Header';
import { api } from '../../services/api';

function generateNextDays(totalDays = 7) {
  const days: Date[] = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(date);
  }

  return days;
}

function generateTimeSlots() {
  const slots: string[] = [];

  for (let hour = 8; hour < 18; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }

  return slots;
}

function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function buildAppointmentDate(date: Date, time: string) {
  const formattedDate = formatDateToYYYYMMDD(date);
  return `${formattedDate}T${time}:00`;
}

export default function AppointmentsPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);

  const availableDays = useMemo(() => generateNextDays(7), []);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const selectedBarber = useMemo(() => {
    return barbers.find((barber) => barber.id === selectedBarberId) || null;
  }, [barbers, selectedBarberId]);

  const specialtiesOfSelectedBarber = useMemo(() => {
    if (!selectedBarber) return [];

    return selectedBarber.specialties.map((item) => item.specialty);
  }, [selectedBarber]);

  useEffect(() => {
    async function fetchBarbers() {
      try {
        const response = await api.get('/barbers-with-specialties');
        setBarbers(response.data);
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar barbeiros');
      }
    }

    fetchBarbers();
  }, []);

  useEffect(() => {
    setSelectedDate(null);
    setSelectedTime('');
    setSelectedSpecialtyId('');
    setUnavailableTimes([]);
  }, [selectedBarberId]);

  useEffect(() => {
    async function fetchUnavailableTimes() {
      if (!selectedBarberId || !selectedDate) return;

      try {
        const formattedDate = formatDateToYYYYMMDD(selectedDate);
        const response = await api.get(
          `/barbers/${selectedBarberId}/appointments?date=${formattedDate}`
        );
        const bookedTimes = response.data.map(
          (appointment: { appointmentDate: string }) => {
            const date = new Date(appointment.appointmentDate);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${hours}:${minutes}`;
          }
        );

        setUnavailableTimes(bookedTimes);
      } catch (error) {
        console.error(error);
        setUnavailableTimes([]);
      }
    }

    fetchUnavailableTimes();
  }, [selectedBarberId, selectedDate]);

  async function handleCreateAppointment() {
    if (!selectedBarberId) {
      alert('Selecione um barbeiro');
      return;
    }

    if (!selectedDate) {
      alert('Selecione uma data');
      return;
    }

    if (!selectedTime) {
      alert('Selecione um horário');
      return;
    }

    if (!selectedSpecialtyId) {
      alert('Seleciona uma especialidade');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        barberId: selectedBarberId,
        specialtyId: selectedSpecialtyId,
        appointmentDate: buildAppointmentDate(selectedDate, selectedTime),
      };

      await api.post('/appointments', payload);

      alert('Agendamento criado com sucesso');
      setSelectedTime('');
      setSelectedSpecialtyId('');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar agendamento');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <h1>Agende seu horário</h1>

      <section>
        <h2>1. Escolha o barbeiro</h2>
        <div>
          {barbers.map((barber) => (
            <button
              key={barber.id}
              type='button'
              onClick={() => setSelectedBarberId(barber.id)}
            >
              <strong>{barber.name}</strong>
              <div>{barber.age} anos</div>
              <div>
                {barber.specialties.map((item) => (
                  <span key={item.specialty.id}>{item.specialty.name}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2>2. Escolha a data</h2>

        <div>
          {availableDays.map((date) => {
            const isSelected =
              selectedDate &&
              formatDateToYYYYMMDD(selectedDate) === formatDateToYYYYMMDD(date);

            return (
              <button
                key={date.toISOString()}
                type='button'
                onClick={() => setSelectedDate(date)}
                disabled={!selectedBarberId}
              >
                {date.toLocaleDateString('pt-BR', {
                  weekday: 'short',
                  day: '2-digit',
                  month: '2-digit',
                })}
                {isSelected ? ' (selecionada)' : ''}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h1>3. Escolha o horário</h1>

        <div>
          {timeSlots.map((slot) => {
            const isUnavailable = unavailableTimes.includes(slot);
            const isSelected = selectedTime === slot;

            return (
              <button
                key={slot}
                type='button'
                onClick={() => setSelectedTime(slot)}
                disabled={!selectedDate || isUnavailable}
              >
                {slot}
                {isSelected ? ' (selecionado)' : ''}
                {isUnavailable ? ' (indisponível)' : ''}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2>4. Escolha a especialidade</h2>

        <select
          value={selectedSpecialtyId}
          onChange={(event) => setSelectedSpecialtyId(event.target.value)}
          disabled={!selectedBarberId}
        >
          <option value=''>Selecione uma especialidade</option>
          {specialtiesOfSelectedBarber.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </select>
      </section>

      <section></section>

      <button
        type='button'
        onClick={handleCreateAppointment}
        disabled={loading}
      >
        {loading ? 'Agendando...' : 'Confirmar Agendamento'}
      </button>
    </div>
  );
}
