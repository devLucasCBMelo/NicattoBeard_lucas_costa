import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    try {
      await register({
        name,
        email,
        password,
        role: 'CLIENT',
      });

      alert('Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar usuário');
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type='text'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div>
          <label>E-mail</label>
          <input
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <button type='submit'>Cadastrar</button>
      </form>

      <p>
        Já tem conta? <Link to='/login'>Entrar</Link>
      </p>
    </div>
  );
}
