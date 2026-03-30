import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CiCalendar } from 'react-icons/ci';
import { RiScissors2Fill } from 'react-icons/ri';
import { MdOutlineDashboard } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';
import styles from './index.module.css';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === '/login';
  const buttonText = isLogin ? 'Cadastrar' : 'Login';
  const targetRoute = isLogin ? '/register' : '/login';

  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <h1 className={styles.logo}>Nicatto</h1>
        <h1 className={styles.logo}>Beard</h1>
      </div>
      {user && (
        <nav className={styles.nav_container}>
          <button
            className={styles.button_container}
            onClick={() => navigate('/appointments')}
          >
            <CiCalendar className={styles.icon} size={25} />
            Agendar
          </button>

          <button
            className={styles.button_container}
            onClick={() => navigate('/my-appointments')}
          >
            <RiScissors2Fill className={styles.icon} size={25} />
            Meus Agendamentos
          </button>

          {user.role === 'ADMIN' && (
            <button
              className={styles.button_container}
              onClick={() => navigate('/barbers')}
            >
              <MdOutlineDashboard className={styles.icon} size={25} />
              Barbeiros
            </button>
          )}

          <button
            className={styles.button_container}
            onClick={() => navigate('/specialties')}
          >
            <BsStars className={styles.icon} size={25} />
            Especialidades
          </button>
        </nav>
      )}
      {user ? (
        <div className={styles.user}>
          <p>Olá, {user?.name}</p>
          <Link to='/dashboard' className={styles.avatar_container}>
            <FaUserCircle size={45} color='#333' />
          </Link>
        </div>
      ) : (
        <button
          className={styles.register_button}
          onClick={() => navigate(targetRoute)}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
