import { IoMdCloseCircle } from 'react-icons/io';
import { HiOutlinePencil } from 'react-icons/hi'; // Ícone mais elegante
import { FaUserCircle } from 'react-icons/fa';
import styles from './index.module.css';

interface Barber {
  id: string;
  name: string;
  age: number;
  hiredAt: string;
}

interface HiredBarbersProps {
  barber: Barber;
  isAdmin: boolean;
  onEdit: (barber: Barber) => void;
  onDelete: (id: string) => void;
}

export default function HiredBarberCard({
  barber,
  isAdmin,
  onEdit,
  onDelete,
}: HiredBarbersProps) {
  return (
    <div className={styles.barber_card}>
      <div className={styles.card_header}>
        <div className={styles.avatar_container}>
          <FaUserCircle size={45} color='#333' />
        </div>

        <div className={styles.barber_info}>
          <h3 className={styles.barber_name}>{barber.name}</h3>
          <p className={styles.barber_age}>{barber.age} anos</p>
        </div>

        {isAdmin && (
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={() => onEdit(barber)}
              title='Editar'
            >
              <HiOutlinePencil size={20} />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(barber.id)}
              title='Deletar'
            >
              <IoMdCloseCircle size={22} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.card_footer}>
        <p className={styles.hired_date}>
          Cadastrado em: {new Date(barber.hiredAt).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
