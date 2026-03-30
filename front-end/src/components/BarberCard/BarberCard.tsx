import { FaUserCircle } from 'react-icons/fa';
import type { Barber } from '../../types/barberTypes';
import styles from './index.module.css';

interface CardProps {
  barber: Barber;
  setSelectedBarberId: (id: string) => void;
  isSelected: boolean | null;
}

export default function BarberCard({
  barber,
  setSelectedBarberId,
  isSelected,
}: CardProps) {
  const buttonClass = `${styles.card_container} ${
    isSelected ? styles.selected : ''
  }`;

  return (
    <button
      className={buttonClass}
      key={barber.id}
      type='button'
      onClick={() => setSelectedBarberId(barber.id)}
    >
      <div className={styles.avatar_container}>
        <FaUserCircle size={45} color='#333' />
      </div>
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
