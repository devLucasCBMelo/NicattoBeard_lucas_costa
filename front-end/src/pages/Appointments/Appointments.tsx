import { useEffect, useMemo, useState } from 'react';
import type { Barber } from '../../types/barberTypes';
import Header from '../../components/Header';
import { api } from '../../services/api';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import styles from './index.module.css';

function generateNextDays(totalDays = 7, startOffset = 0) {
  const days: Date[] = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + startOffset + i);
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
  const [daysOffset, setDaysOffset] = useState(0);

  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);

  const availableDays = useMemo(() => {
    return generateNextDays(7, daysOffset);
  }, [daysOffset]);

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const selectedBarber = useMemo(() => {
    return barbers.find((barber) => barber.id === selectedBarberId) || null;
  }, [barbers, selectedBarberId]);

  const specialtiesOfSelectedBarber = useMemo(() => {
    if (!selectedBarber) return [];

    return selectedBarber.specialties.map((item) => item.specialty);
  }, [selectedBarber]);

  const handlePreviousDays = () => {
    setDaysOffset((prev) => Math.max(prev - 7, 0));
  };

  const handleNextDays = () => {
    setDaysOffset((prev) => prev + 7);
  };

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
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h1 className={styles.title1}>
            Agende seu <span className={styles.title2}>Horário</span>
          </h1>
          <p>
            Escolha seu barbeiro favorito, a data e o horário ideal para você.
          </p>
        </div>

        <section>
          <h2 className={styles.section_title}>
            <span className={styles.circle_background}>1</span>{' '}
            <span className={styles.section_title_text}>
              Escolha o barbeiro
            </span>
          </h2>
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
          <h2 className={styles.section_title}>
            <span className={styles.circle_background}>2</span>{' '}
            <span className={styles.section_title_text}>Escolha a data</span>
          </h2>

          <div>
            <button
              type='button'
              onClick={handlePreviousDays}
              disabled={daysOffset === 0}
            >
              <IoArrowBack />
            </button>
            {availableDays.map((date) => {
              const isSelected =
                selectedDate &&
                formatDateToYYYYMMDD(selectedDate) ===
                  formatDateToYYYYMMDD(date);

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
            <button type='button' onClick={handleNextDays}>
              <IoArrowForward />
            </button>
          </div>
        </section>

        <section>
          <h2 className={styles.section_title}>
            <span className={styles.circle_background}>3</span>{' '}
            <span className={styles.section_title_text}>Escolha o horário</span>
          </h2>

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
          <h2 className={styles.section_title}>
            <span className={styles.circle_background}>4</span>{' '}
            <span className={styles.section_title_text}>
              Escolha a especialidade
            </span>
          </h2>

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
    </>
  );
}
