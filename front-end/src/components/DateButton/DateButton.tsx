import styles from './index.module.css';

interface DateButtonProps {
  date: Date;
  selectedBarberId: string | null;
  setSelectedDate: (date: Date) => void;
  isSelected: boolean | null;
}

export default function DateButton({
  date,
  selectedBarberId,
  setSelectedDate,
  isSelected,
}: DateButtonProps) {
  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  const day = date.toLocaleDateString('pt-BR', { day: '2-digit' });
  const month = date
    .toLocaleDateString('pt-BR', { month: 'short' })
    .replace('.', '');

  const buttonClass = `${styles.cardData} ${isSelected ? styles.selected : ''}`;

  return (
    <button
      type='button'
      className={buttonClass}
      onClick={() => setSelectedDate(date)}
      disabled={!selectedBarberId}
    >
      <span className={styles.weekday}>{weekday}</span>
      <strong className={styles.dayNumber}>{day}</strong>
      <span className={styles.month}>{month}</span>
    </button>
  );
}
