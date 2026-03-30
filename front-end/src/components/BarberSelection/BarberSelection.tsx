import type { Barber } from '../../types/barberTypes';
import BarberCard from '../../components/BarberCard/BarberCard';
import styles from './index.module.css';

interface BarberSelectionProps {
  barbers: Barber[];
  selectedBarberId: string;
  setSelectedBarberId: (id: string) => void;
}

export default function BarberSelection({
  barbers,
  selectedBarberId,
  setSelectedBarberId,
}: BarberSelectionProps) {
  return (
    <section className={styles.section1}>
      <h2 className={styles.section_title}>
        <span className={styles.circle_background}>1</span>{' '}
        <span className={styles.section_title_text}>Escolha o barbeiro</span>
      </h2>

      <div className={styles.barbers_list}>
        {barbers.map((barber) => {
          const isSelected = selectedBarberId === barber.id;

          return (
            <BarberCard
              key={barber.id}
              isSelected={isSelected}
              barber={barber}
              setSelectedBarberId={setSelectedBarberId}
            />
          );
        })}
      </div>
    </section>
  );
}
