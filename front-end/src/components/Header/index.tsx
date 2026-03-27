import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CiCalendar } from 'react-icons/ci';
import { RiScissors2Fill } from 'react-icons/ri';
import { MdOutlineDashboard } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === '/login';
  const buttonText = isLogin ? 'Cadastrar' : 'Login';
  const targetRoute = isLogin ? '/register' : '/login';

  const { user } = useAuth();
  const GotoLogin = () => {
    navigate(targetRoute);
  };
  return (
    <div>
      <div>
        <h1>NicattoBeard</h1>
        <nav>
          <div>
            <CiCalendar />
            <button>Agendar</button>
          </div>
          <div>
            <RiScissors2Fill />
            <button>Meus Agendamentos</button>
          </div>

          <div>
            <MdOutlineDashboard />
            <button>Barbeiros</button>
          </div>

          <div>
            <BsStars />
            <button>Especialidades</button>
          </div>
          {user ? (
            <p>`Olá, ${user?.name}`</p>
          ) : (
            <button onClick={GotoLogin}>{buttonText}</button>
          )}
        </nav>
      </div>
    </div>
  );
}
