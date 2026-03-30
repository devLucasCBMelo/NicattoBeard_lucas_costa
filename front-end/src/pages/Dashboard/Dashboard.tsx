import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './index.module.css';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title1}>
          Veja seu <span className={styles.title2}>Dashboard</span>
        </h1>
        <p>Suas informações de usuário aqui.</p>
      </div>

      <div className={styles.infos_container}>
        <div className={styles.left_side}>
          <p>
            Usuário: <span>{user?.name}</span>
          </p>
          <p>
            E-mail: <span>{user?.email}</span>
          </p>
          <p>
            Perfil: <span>{user?.role}</span>
          </p>
        </div>

        <nav className={styles.right_side}>
          <ul>
            <li>
              <Link to='/appointments'>Agendar horário</Link>
            </li>
            <li>
              <Link to='/my-appointments'>Meus Agendamentos</Link>
            </li>
            <li>
              <Link to='/specialties'>Especialidades</Link>
            </li>

            {user?.role === 'ADMIN' && (
              <li>
                <Link to='/admin/dashboard'>Dashboard Admin</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <button onClick={logout} className={styles.logout_button}>
        Sair
      </button>
    </div>
  );
}
