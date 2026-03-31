import TimeSlotButton from '../../components/TimeSlotButton/TimeSlotButton';
import styles from './index.module.css';

interface TimeSelectionProps {
  timeSlots: string[];
  unavailableTimes: string[];
  selectedTime: string;
  selectedDate: Date;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function TimeSelection({
  timeSlots,
  unavailableTimes,
  selectedTime,
  selectedDate,
  setSelectedTime,
}: TimeSelectionProps) {
  return (
    <section className={styles.section3}>
      <h2 className={styles.section_title}>
        <span className={styles.circle_background}>3</span>{' '}
        <span className={styles.section_title_text}>Escolha o horário</span>
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
  );
}
