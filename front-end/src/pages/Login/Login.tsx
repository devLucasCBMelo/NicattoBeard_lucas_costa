import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import styles from './index.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao fazer login');
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <h1>Login</h1>

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.email_container}>
            <label>E-mail</label>
            <input
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className={styles.password_container}>
            <label>Senha</label>
            <input
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type='submit' className={styles.login_button}>
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
