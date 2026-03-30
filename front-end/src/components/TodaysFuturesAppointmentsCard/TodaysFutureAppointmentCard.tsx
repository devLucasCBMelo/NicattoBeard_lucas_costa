import styles from './index.module.css';

// Reaproveitamos a tipagem que você já definiu
type User = {
  name: string;
  email: string;
};

type Barber = {
  name: string;
};

type Specialty = {
  name: string;
};

export type Appointment = {
  id: string;
  appointmentDate: string;
  status: 'SCHEDULED' | 'CANCELED';
  user: User;
  barber: Barber;
  specialty: Specialty;
};

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function TodaysFuturesAppointmentCard({
  appointment,
}: AppointmentCardProps) {
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
    <div className={styles.card_container}>
      <p className={styles.details}>
        <strong>Cliente:</strong> {appointment.user.name}
      </p>
      <p className={styles.details}>
        <strong>E-mail:</strong> {appointment.user.email}
      </p>
      <p className={styles.details}>
        <strong>Barbeiro:</strong> {appointment.barber.name}
      </p>
      <p className={styles.details}>
        <strong>Especialidade:</strong> {appointment.specialty.name}
      </p>
      <p className={styles.details}>
        <strong>Data:</strong> {formatDate(appointment.appointmentDate)}
      </p>
      <p className={styles.details}>
        <strong>Horário:</strong> {formatTime(appointment.appointmentDate)}
      </p>
      <p>
        <strong>Status:</strong>{' '}
        <span className={styles.status_label}>
          {appointment.status === 'SCHEDULED' ? 'Agendado' : 'Cancelado'}
        </span>
      </p>
    </div>
  );
}
