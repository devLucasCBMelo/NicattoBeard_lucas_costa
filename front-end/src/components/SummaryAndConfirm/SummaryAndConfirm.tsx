import { formatDateToDDMMYYY } from '../../utils';
import styles from './index.module.css';

interface SummaryAndConfirmProps {
  barberName?: string;
  selectedDate: Date;
  selectedTime: string;
  loading: boolean;
  handleCreateAppointment: () => void;
}

export default function SummaryAndConfirm({
  barberName,
  selectedDate,
  selectedTime,
  loading,
  handleCreateAppointment,
}: SummaryAndConfirmProps) {
  return (
    <section className={styles.section5}>
      <h2 className={styles.section_title}>
        <span className={styles.circle_background}>5</span>{' '}
        <span className={styles.section_title_text}>Confirmar agendamento</span>
      </h2>

      <div className={styles.section5_content}>
        <div className={styles.selected_container}>
          <div className={styles.selected_appointment}>
            <p>BARBEIRO</p>
            <strong>{barberName}</strong>
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
  );
}
