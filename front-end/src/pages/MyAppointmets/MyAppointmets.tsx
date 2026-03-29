import Header from '../../components/Header';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';

type Barber = {
  id: string;
  name: string;
};

type Speciality = {
  id: string;
  name: string;
};

type Appointment = {
  id: string;
  appointmentDate: string;
  status: 'SCHEDULED' | 'CANCELED';
  barber: Barber;
  specialty: Speciality;
};

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  async function fetchAppointments() {
    try {
      setLoading(true);
      const response = await api.get('/appointments/me');
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar agendamentos');
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelAppointment(appointmentId: string) {
    const confirmed = window.confirm(
      'Tem certeza que deseja cancelar este agendameto?'
    );

    if (!confirmed) return;

    try {
      setCancelingId(appointmentId);

      await api.delete(`/appointments/${appointmentId}`);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? {
                ...appointment,
                status: 'CANCELED',
                canceledAt: new Date().toISOString(),
              }
            : appointment
        )
      );
    } catch (error) {
      console.error(error);
      alert('Erro ao cancelar agendamento');
    } finally {
      setCancelingId(null);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Carregando agendamentos...</p>;
  }

  return (
    <div>
      <Header />
      <div className={styles.title_container}>
        <h1 className={styles.title1}>
          Acompanhe seus <span className={styles.title2}>Agendamentos</span>
        </h1>
        <p>Veja aqui seus agendamentos, você pode cancelá-los se quiser.</p>
      </div>

      {appointments.length === 0 ? (
        <p>Você ainda não possui agendamentos.</p>
      ) : (
        <div className={styles.appointments_list}>
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancelAppointment}
              isCanceling={cancelingId === appointment.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
