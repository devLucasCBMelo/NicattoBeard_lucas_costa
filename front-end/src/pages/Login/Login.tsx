import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import styles from './index.module.css';
import manInBarbershop from '../../assets/homem_no_barbeiro.png';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    try {
      await login({ email, password });
      navigate('/appointments');
    } catch (error) {
      alert('Erro ao fazer login');
      console.log(error);
    }
  };

  return (
    <main className={styles.container}>
      <Header />
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.image_container}>
            <img
              className={styles.image}
              alt='homem cortando o cabelo na barbearia'
              src={manInBarbershop}
            />
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Login</h3>
            <div className={styles.inputs_container}>
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
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
