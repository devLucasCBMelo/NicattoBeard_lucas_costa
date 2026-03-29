import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { IoMdCloseCircle } from 'react-icons/io';
import Header from '../../components/Header';

type Barber = {
  id: string;
  name: string;
  age: number;
  hiredAt: string;
  createdAt?: string;
  updatedAt?: string;
};

type BarberFormData = {
  name: string;
  age: string;
  hiredAt: string;
};

const initialFormData: BarberFormData = {
  name: '',
  age: '',
  hiredAt: '',
};

export default function BarbersPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<BarberFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const [editingBarberId, setEditingBarberId] = useState<string | null>(null);

  async function fetchBarbers() {
    try {
      setLoading(true);
      const response = await api.get('/barbers');
      setBarbers(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar barbeiros');
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData(initialFormData);
    setEditingBarberId(null);
  }

  function handleChangeField(field: keyof BarberFormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    if (!isAdmin) return;

    if (!formData.name.trim() || !formData.age || !formData.hiredAt) {
      alert('Preencha nome, idade e data de contratação');
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name,
        age: Number(formData.age),
        hiredAt: new Date(formData.hiredAt).toISOString(),
      };

      if (editingBarberId) {
        const response = await api.put(`/barbers/${editingBarberId}`, payload);

        setBarbers((prev) =>
          prev.map((barber) =>
            barber.id === editingBarberId ? response.data : barber
          )
        );

        alert('Barbeiro atualizado com sucesso');
      } else {
        const response = await api.post('/barbers', payload);

        setBarbers((prev) => [response.data, ...prev]);

        alert('Barbeiro criado com sucesso');
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar barbeiro');
    } finally {
      setSubmitting(false);
    }
  }

  function handleStartEdit(barber: Barber) {
    if (!isAdmin) return;

    const hiredAtFormatted = barber.hiredAt.slice(0, 10);

    setEditingBarberId(barber.id);
    setFormData({
      name: barber.name,
      age: String(barber.age),
      hiredAt: hiredAtFormatted,
    });
  }

  async function handleDeleteBarber(barberId: string) {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      'Tem certeza que deseja deletar este barbeiro?'
    );

    if (!confirmed) return;

    try {
      await api.delete(`/barbers/${barberId}`);

      setBarbers((prev) => prev.filter((barber) => barber.id !== barberId));

      if (editingBarberId === barberId) {
        resetForm();
      }

      alert('Barbeiro deletado com sucesso');
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar barbeiro');
    }
  }

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <main>
      <Header />
      <h1>Barbeiros</h1>

      {isAdmin && (
        <section>
          <h2>{editingBarberId ? 'Editar barbeiro' : 'Cadastrar barbeiro'}</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome</label>
              <input
                type='text'
                value={formData.name}
                onChange={(event) =>
                  handleChangeField('name', event.target.value)
                }
              />
            </div>

            <div>
              <label>Idade</label>
              <input
                type='number'
                value={formData.age}
                onChange={(event) =>
                  handleChangeField('age', event.target.value)
                }
              />
            </div>

            <div>
              <label>Data de contratação</label>
              <input
                type='date'
                value={formData.hiredAt}
                onChange={(event) =>
                  handleChangeField('hiredAt', event.target.value)
                }
              />
            </div>

            <button type='submit' disabled={submitting}>
              {submitting
                ? editingBarberId
                  ? 'Salvando...'
                  : 'Criando...'
                : editingBarberId
                ? 'Salvar edição'
                : 'Cadastrar barbeiro'}
            </button>

            {editingBarberId && (
              <button type='button' onClick={resetForm}>
                Cancelar edição
              </button>
            )}
          </form>
        </section>
      )}

      <hr />

      <section>
        <h2>Lista de barbeiros</h2>

        {loading ? (
          <p>Carregando barbeiros...</p>
        ) : barbers.length === 0 ? (
          <p>Nenhum barbeiro cadastrado.</p>
        ) : (
          <div>
            {barbers.map((barber) => (
              <div key={barber.id}>
                {isAdmin && (
                  <div>
                    <button
                      type='button'
                      onClick={() => handleStartEdit(barber)}
                      aria-label={`Editar ${barber.name}`}
                      title='Editar'
                    >
                      ✏️
                    </button>

                    <IoMdCloseCircle
                      type='button'
                      onClick={() => handleDeleteBarber(barber.id)}
                      aria-label={`Deletar ${barber.name}`}
                      title='Deletar'
                      fill='red'
                      size={25}
                    />
                  </div>
                )}

                <h3>{barber.name}</h3>
                <p>Idade: {barber.age}</p>
                <p>
                  Contratado em:{' '}
                  {new Date(barber.hiredAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
