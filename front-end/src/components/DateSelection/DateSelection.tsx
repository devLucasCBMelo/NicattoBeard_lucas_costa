import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import DateButton from '../../components/DateButton/DateButton';
import { formatDateToYYYYMMDD } from '../../utils';
import styles from './index.module.css';

interface DateSelectionProps {
  availableDays: Date[];
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedBarberId: string;
  daysOffset: number;
  handlePreviousDays: () => void;
  handleNextDays: () => void;
}

export default function DateSelection({
  availableDays,
  selectedDate,
  setSelectedDate,
  selectedBarberId,
  daysOffset,
  handlePreviousDays,
  handleNextDays,
}: DateSelectionProps) {
  return (
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
              formatDateToYYYYMMDD(selectedDate) === formatDateToYYYYMMDD(date);

            return (
              <DateButton
                key={formatDateToYYYYMMDD(date)}
                date={date}
                isSelected={Boolean(isSelected)}
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
  );
}
