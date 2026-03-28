import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Header from '../../components/Header';

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

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  function formatTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div>
      <Header />
      <h1>Dashboard Admin</h1>

      <section>
        <h2>Agendamentos do Dia</h2>

        {loadingToday ? (
          <p>Carregando agendamentos do dia...</p>
        ) : todayAppointments.length === 0 ? (
          <p>Não há agendamentos para hoje.</p>
        ) : (
          <div>
            {todayAppointments.map((appointment) => (
              <div key={appointment.id}>
                <p>
                  <strong>Cliente:</strong> {appointment.user.name}
                </p>
                <p>
                  <strong>E-mail:</strong> {appointment.user.email}
                </p>
                <p>
                  <strong>Barbeiro:</strong> {appointment.barber.name}
                </p>
                <p>
                  <strong>Especialidade:</strong> {appointment.specialty.name}
                </p>
                <p>
                  <strong>Data:</strong>{' '}
                  {formatDate(appointment.appointmentDate)}
                </p>
                <p>
                  <strong>Horário:</strong>{' '}
                  {formatTime(appointment.appointmentDate)}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>

                <hr />
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Próximos Agendamentos</h2>

        {loadingFuture ? (
          <p>Carregando agendamentos futuros...</p>
        ) : futureAppointments.length === 0 ? (
          <p>Não há agendamentos futuros.</p>
        ) : (
          <div>
            {futureAppointments.map((appointment) => (
              <div key={appointment.id}>
                <p>
                  <strong>Cliente:</strong> {appointment.user.name}
                </p>
                <p>
                  <strong>E-mail:</strong> {appointment.user.email}
                </p>
                <p>
                  <strong>Barbeiro:</strong> {appointment.barber.name}
                </p>
                <p>
                  <strong>Especialidade:</strong> {appointment.specialty.name}
                </p>
                <p>
                  <strong>Data:</strong>{' '}
                  {formatDate(appointment.appointmentDate)}
                </p>
                <p>
                  <strong>Horário:</strong>{' '}
                  {formatTime(appointment.appointmentDate)}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>

                <hr />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
