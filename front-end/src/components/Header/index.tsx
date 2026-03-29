import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CiCalendar } from 'react-icons/ci';
import { RiScissors2Fill } from 'react-icons/ri';
import { MdOutlineDashboard } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';
import styled from './index.module.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === '/login';
  const buttonText = isLogin ? 'Cadastrar' : 'Login';
  const targetRoute = isLogin ? '/register' : '/login';

  const { user } = useAuth();

  return (
    <div>
      <div className={styled.container}>
        <h1 className={styled.logo}>NicattoBeard</h1>
        {user && (
          <nav className={styled.nav_container}>
            <button
              className={styled.button_container}
              onClick={() => navigate('/appointments')}
            >
              <CiCalendar className={styled.icon} size={25} />
              Agendar
            </button>

            <button
              className={styled.button_container}
              onClick={() => navigate('/my-appointments')}
            >
              <RiScissors2Fill className={styled.icon} size={25} />
              Meus Agendamentos
            </button>

            <button
              className={styled.button_container}
              onClick={() => navigate('/barbers')}
            >
              <MdOutlineDashboard className={styled.icon} size={25} />
              Barbeiros
            </button>

            <button
              className={styled.button_container}
              onClick={() => navigate('/specialties')}
            >
              <BsStars className={styled.icon} size={25} />
              Especialidades
            </button>
          </nav>
        )}
        {user ? (
          <div className={styled.user}>
            <p>Olá, {user?.name}</p>
            <Link to='/dashboard'>Perfil</Link>
          </div>
        ) : (
          <button
            className={styled.register_button}
            onClick={() => navigate(targetRoute)}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
