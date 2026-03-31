import { useEffect, useMemo, useState } from 'react';
import type { Barber } from '../../types/barberTypes';
import Header from '../../components/Header';
import { api } from '../../services/api';
import styles from './index.module.css';
import {
  buildAppointmentDate,
  formatDateToYYYYMMDD,
  generateNextDays,
  generateTimeSlots,
} from '../../utils';

import BarberSelection from '../../components/BarberSelection/BarberSelection';
import DateSelection from '../../components/DateSelection/DateSelection';
import TimeSelection from '../../components/TimeSelection/TimeSelection';
import SpecialtySelection from '../../components/SpecialtySelection/SpecialtySelection';
import SummaryAndConfirm from '../../components/SummaryAndConfirm/SummaryAndConfirm';

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
      setSelectedDate(null);
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
    <main className={styles.container}>
      <Header />

      <div className={styles.content}>
        <div className={styles.title_container}>
          <h1 className={styles.title1}>
            Agende seu <span className={styles.title2}>Horário</span>
          </h1>
          <p>
            Escolha seu barbeiro favorito, a data e o horário ideal para você.
          </p>
        </div>

        <BarberSelection
          barbers={barbers}
          selectedBarberId={selectedBarberId}
          setSelectedBarberId={setSelectedBarberId}
        />

        {selectedBarber && (
          <DateSelection
            availableDays={availableDays}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedBarberId={selectedBarberId}
            daysOffset={daysOffset}
            handlePreviousDays={handlePreviousDays}
            handleNextDays={handleNextDays}
          />
        )}

        {selectedDate && (
          <TimeSelection
            timeSlots={timeSlots}
            unavailableTimes={unavailableTimes}
            selectedTime={selectedTime}
            selectedDate={selectedDate}
            setSelectedTime={setSelectedTime}
          />
        )}

        {selectedTime && (
          <SpecialtySelection
            selectedSpecialtyId={selectedSpecialtyId}
            setSelectedSpecialtyId={setSelectedSpecialtyId}
            specialties={specialtiesOfSelectedBarber}
            disabled={!selectedBarberId}
          />
        )}

        {selectedTime && selectedDate && (
          <SummaryAndConfirm
            barberName={selectedBarber?.name}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            loading={loading}
            handleCreateAppointment={handleCreateAppointment}
          />
        )}
      </div>
    </main>
  );
}
