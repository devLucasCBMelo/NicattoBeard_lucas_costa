import styles from './index.module.css';

interface TimeSlotButtonProps {
  slot: string; // Ex: "09:00"
  selectedDate: Date | null;
  setSelectedTime: (time: string) => void;
  isSelected: boolean;
  isUnavailable: boolean;
}

export default function TimeSlotButton({
  slot,
  selectedDate,
  setSelectedTime,
  isSelected,
  isUnavailable,
}: TimeSlotButtonProps) {
  let buttonClasses = styles.timeButton;

  if (isSelected) {
    buttonClasses += ` ${styles.selected}`;
  }

  const isDisabled = !selectedDate || isUnavailable;

  return (
    <button
      type='button'
      className={buttonClasses}
      onClick={() => setSelectedTime(slot)}
      disabled={isDisabled}
    >
      <strong className={styles.timeLabel}>{slot}</strong>

      {isUnavailable && (
        <span className={styles.statusText}>(indisponível)</span>
      )}
    </button>
  );
}
