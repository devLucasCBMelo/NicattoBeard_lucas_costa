import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Header from '../../components/Header';
import styles from './index.module.css';
import TodaysFuturesAppointmentCard from '../../components/TodaysFuturesAppointmentsCard/TodaysFutureAppointmentCard';

type User = {
  id: string;
  name: string;
  email: string;
};

type Barber = {
  id: string;
  name: string;
};

type Specialty = {
  id: string;
  name: string;
};

type Appointment = {
  id: string;
  appointmentDate: string;
  status: 'SCHEDULED' | 'CANCELED';
  user: User;
  barber: Barber;
  specialty: Specialty;
};

export default function AdminDashboardPage() {
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [futureAppointments, setFutureAppointments] = useState<Appointment[]>(
    []
  );
  const [loadingToday, setLoadingToday] = useState(true);
  const [loadingFuture, setLoadingFuture] = useState(true);

  async function fetchTodayAppointments() {
    try {
      setLoadingToday(true);
      const response = await api.get('/appointments/today');
      setTodayAppointments(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar agendamentos do dia');
    } finally {
      setLoadingToday(false);
    }
  }

  async function fetchFutureAppointments() {
    try {
      setLoadingFuture(true);
      const response = await api.get('/appointments/future');
      setFutureAppointments(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar agendamentos futuros');
    } finally {
      setLoadingFuture(false);
    }
  }

  useEffect(() => {
    fetchTodayAppointments();
    fetchFutureAppointments();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.title_container}>
        <h1 className={styles.title1}>
          Dashboard do <span className={styles.title2}>ADMIN</span>
        </h1>
        <p>Acompanhe os agendamentos do dia e os futuros.</p>
      </div>

      <section className={styles.section_container}>
        <h2>Agendamentos do Dia</h2>

        <div className={styles.section_content}>
          {loadingToday ? (
            <p>Carregando agendamentos do dia...</p>
          ) : todayAppointments.length === 0 ? (
            <p>Não há agendamentos para hoje.</p>
          ) : (
            <div className={styles.appointments_list}>
              {todayAppointments.map((appointment) => (
                <TodaysFuturesAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <hr />

      <section className={styles.section_container}>
        <h2>Próximos Agendamentos</h2>

        <div className={styles.section_content}>
          {loadingFuture ? (
            <p>Carregando agendamentos futuros...</p>
          ) : futureAppointments.length === 0 ? (
            <p>Não há agendamentos futuros.</p>
          ) : (
            <div className={styles.appointments_list}>
              {futureAppointments.map((appointment) => (
                <TodaysFuturesAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
