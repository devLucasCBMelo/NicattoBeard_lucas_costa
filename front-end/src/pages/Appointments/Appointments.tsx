import { useEffect, useMemo, useState } from 'react';
import type { Barber } from '../../types/barberTypes';
import Header from '../../components/Header';
import { api } from '../../services/api';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import styles from './index.module.css';
import DateButton from '../../components/DateButton/DateButton';
import TimeSlotButton from '../../components/TimeSlotButton/TimeSlotButton';
import {
  buildAppointmentDate,
  formatDateToDDMMYYY,
  formatDateToYYYYMMDD,
  generateNextDays,
  generateTimeSlots,
} from '../../utils';
import BarberSelection from '../../components/BarberSelection/BarberSelection';

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
          <section className={styles.section2}>
            <h2 className={styles.section_title}>
              <span className={styles.circle_background}>2</span>{' '}
              <span className={styles.section_title_text}>Escolha a data</span>
            </h2>

            <div className={styles.section2_content}>
              <button
                type='button'
                onClick={handlePreviousDays}
                disabled={daysOffset === 0}
                className={styles.arrow_button}
              >
                <IoArrowBack className={styles.icon} />
              </button>
              <div className={styles.dates_list}>
                {availableDays.map((date) => {
                  const isSelected =
                    selectedDate &&
                    formatDateToYYYYMMDD(selectedDate) ===
                      formatDateToYYYYMMDD(date);

                  return (
                    <DateButton
                      date={date}
                      isSelected={isSelected}
                      setSelectedDate={setSelectedDate}
                      selectedBarberId={selectedBarberId}
                    />
                  );
                })}
              </div>
              <button
                type='button'
                onClick={handleNextDays}
                className={styles.arrow_button}
              >
                <IoArrowForward className={styles.icon} />
              </button>
            </div>
          </section>
        )}

        {selectedDate && (
          <section className={styles.section3}>
            <h2 className={styles.section_title}>
              <span className={styles.circle_background}>3</span>{' '}
              <span className={styles.section_title_text}>
                Escolha o horário
              </span>
            </h2>

            <div className={styles.section3_content}>
              {timeSlots.map((slot) => {
                const isUnavailable = unavailableTimes.includes(slot);
                const isSelected = selectedTime === slot;

                return (
                  <TimeSlotButton
                    key={slot}
                    isSelected={isSelected}
                    isUnavailable={isUnavailable}
                    selectedDate={selectedDate}
                    setSelectedTime={setSelectedTime}
                    slot={slot}
                  />
                );
              })}
            </div>
          </section>
        )}

        {selectedTime && (
          <section className={styles.section4}>
            <h2 className={styles.section_title}>
              <span className={styles.circle_background}>4</span>{' '}
              <span className={styles.section_title_text}>
                Escolha a especialidade
              </span>
            </h2>

            <div className={styles.section1_content}>
              <select
                value={selectedSpecialtyId}
                onChange={(event) => setSelectedSpecialtyId(event.target.value)}
                disabled={!selectedBarberId}
                className={styles.custom_select}
              >
                <option value=''>Selecione uma especialidade</option>
                {specialtiesOfSelectedBarber.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>
          </section>
        )}

        {selectedTime && selectedDate && (
          <section className={styles.section5}>
            <h2 className={styles.section_title}>
              <span className={styles.circle_background}>5</span>{' '}
              <span className={styles.section_title_text}>
                Confirmar agendamento
              </span>
            </h2>

            <div className={styles.section5_content}>
              <div className={styles.selected_container}>
                <div className={styles.selected_appointment}>
                  <p>BARBEIRO</p>
                  <strong>{selectedBarber?.name}</strong>
                </div>

                <div className={styles.selected_appointment}>
                  <p>DATA</p>
                  <strong>{formatDateToDDMMYYY(selectedDate)}</strong>
                </div>

                <div className={styles.selected_appointment}>
                  <p>HORÁRIO</p>
                  <strong>{selectedTime}</strong>
                </div>
              </div>

              <button
                type='button'
                onClick={handleCreateAppointment}
                disabled={loading}
                className={styles.confirm_button}
              >
                {loading ? 'Agendando...' : 'Confirmar Agendamento'}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
