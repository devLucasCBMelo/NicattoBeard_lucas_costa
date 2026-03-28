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
  const NavigatetoLoginOrRegister = () => {
    navigate(targetRoute);
  };

  return (
    <div>
      <div className={styled.container}>
        <h1>NicattoBeard</h1>
        <nav className={styled.nav_container}>
          <div>
            <CiCalendar />
            <button onClick={() => navigate('/appointments')}>Agendar</button>
          </div>
          <div>
            <RiScissors2Fill />
            <button onClick={() => navigate('/my-appointments')}>
              Meus Agendamentos
            </button>
          </div>

          <div>
            <MdOutlineDashboard />
            <button>Barbeiros</button>
          </div>

          <div>
            <BsStars />
            <button onClick={() => navigate('/specialties')}>
              Especialidades
            </button>
          </div>
          {user ? (
            <div>
              <p>Olá, {user?.name}</p>
              <Link to='/dashboard'>Perfil</Link>
            </div>
          ) : (
            <button onClick={NavigatetoLoginOrRegister}>{buttonText}</button>
          )}
        </nav>
      </div>
    </div>
  );
}
