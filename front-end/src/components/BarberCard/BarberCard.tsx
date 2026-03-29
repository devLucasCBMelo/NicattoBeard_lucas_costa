import type { Barber } from '../../types/barberTypes';
import styles from './index.module.css';

interface CardProps {
  barber: Barber;
  setSelectedBarberId: (id: string) => void;
}

export default function BarberCard({ barber, setSelectedBarberId }: CardProps) {
  return (
    <button
      className={styles.card_container}
      key={barber.id}
      type='button'
      onClick={() => setSelectedBarberId(barber.id)}
    >
      <strong className={styles.barber_name}>{barber.name}</strong>
      <div className={styles.barber_age}>{barber.age} anos</div>
      <div>
        {barber.specialties.map((item) => (
          <span className={styles.specialty} key={item.specialty.id}>
            {item.specialty.name}
          </span>
        ))}
      </div>
    </button>
  );
}
