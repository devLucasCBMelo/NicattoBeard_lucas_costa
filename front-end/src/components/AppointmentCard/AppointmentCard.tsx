import styles from './index.module.css';

interface Appointment {
  id: string;
  appointmentDate: string;
  status: string;
  barber: { name: string };
  specialty: { name: string };
}

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: string) => void;
  isCanceling: boolean;
}

export default function AppointmentCard({
  appointment,
  onCancel,
  isCanceling,
}: AppointmentCardProps) {
  const isCanceled = appointment.status === 'CANCELED';

  const dateObj = new Date(appointment.appointmentDate);
  const formattedDate = dateObj.toLocaleDateString('pt-BR');
  const formattedTime = dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const cardClassName = `${styles.card} ${isCanceled ? styles.canceled : ''}`;

  return (
    <div className={cardClassName}>
      <div className={styles.infoGroup}>
        <div className={styles.header}>
          <span className={styles.barberName}>{appointment.barber.name}</span>
          <span
            className={`${styles.statusLabel} ${
              isCanceled ? styles.statusCanceled : ''
            }`}
          >
            {isCanceled ? 'CANCELADO' : 'AGENDADO'}
          </span>
        </div>

        <div className={styles.details}>
          <p>
            <strong>Especialidade:</strong> {appointment.specialty.name}
          </p>
          <p>
            <strong>Data:</strong> {formattedDate} às {formattedTime}
          </p>
        </div>
      </div>

      {!isCanceled && (
        <button
          className={styles.cancelButton}
          type='button'
          onClick={() => onCancel(appointment.id)}
          disabled={isCanceling}
        >
          {isCanceling ? 'Cancelando...' : 'Cancelar Agendamento'}
        </button>
      )}
    </div>
  );
}
