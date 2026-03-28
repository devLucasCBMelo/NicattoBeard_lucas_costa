import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Bem vindo, {user?.name}</p>
      <p>E-mail: {user?.email}</p>
      <p>Perfil: {user?.role}</p>

      <nav>
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

      <button onClick={logout}>Sair</button>
    </div>
  );
}
