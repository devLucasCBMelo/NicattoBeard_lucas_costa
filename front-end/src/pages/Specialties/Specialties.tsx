import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Header from '../../components/Header';

type Specialty = {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

type Barber = {
  id: string;
  name: string;
  age: number;
  hiredAt: string;
};

type BarberSpecialtyResponse = {
  id: string;
  name: string;
  age: number;
  specialties: {
    specialty: Specialty;
  }[];
};

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState('');

  const [barberSpecialties, setBarberSpecialties] = useState<Specialty[]>([]);

  const [loading, setLoading] = useState(false);
  const [linking, setLinking] = useState(false);

  async function fetchSpecialties() {
    try {
      const response = await api.get('/specialties');
      setSpecialties(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar especialidades');
    }
  }

  async function fetchBarbers() {
    try {
      const response = await api.get('/barbers');
      setBarbers(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar barbeiros');
    }
  }

  async function fetchBarberSpecialties(barberId: string) {
    try {
      const response = await api.get(`/barbers/${barberId}/specialties`);

      const data = response.data as BarberSpecialtyResponse;

      const specialties = data.specialties.map((item) => item.specialty);

      setBarberSpecialties(specialties);
    } catch (error) {
      console.error(error);
      setBarberSpecialties([]);
    }
  }

  async function handleCreateSpecialty(event: React.SubmitEvent) {
    event.preventDefault();

    if (!name.trim()) {
      alert('Informe o nome da especialidade');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/specialties', {
        name,
        description,
      });

      setSpecialties((prev) => [response.data, ...prev]);
      setName('');
      setDescription('');

      alert('Especialidade criada com sucesso');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar especialidade');
    } finally {
      setLoading(false);
    }
  }

  async function handleLinkSpecialtyToBarber(event: React.SubmitEvent) {
    event.preventDefault();

    if (!selectedBarberId) {
      alert('Selecione um barbeiro');
      return;
    }

    if (!selectedSpecialtyId) {
      alert('Selecione uma especialidade');
      return;
    }

    try {
      setLinking(true);

      await api.post(
        `/barbers/${selectedBarberId}/specialties/${selectedSpecialtyId}`
      );

      alert('Especialidade vinculada ao barbeiro com sucesso');

      setSelectedSpecialtyId('');
      fetchBarberSpecialties(selectedBarberId);
    } catch (error) {
      console.error(error);
      alert('Erro ao vincular especialidade ao barbeiro');
    } finally {
      setLinking(false);
    }
  }

  useEffect(() => {
    fetchSpecialties();
    fetchBarbers();
  }, []);

  useEffect(() => {
    if (!selectedBarberId) {
      setBarberSpecialties([]);
      return;
    }

    fetchBarberSpecialties(selectedBarberId);
  }, [selectedBarberId]);

  return (
    <div>
      <Header />
      <h1>Especialidades</h1>

      <section>
        <h2>Criar nova especialidade</h2>

        <form onSubmit={handleCreateSpecialty}>
          <div>
            <label>Nome</label>
            <input
              type='text'
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder='Ex: Corte Degradê'
            />
          </div>

          <div>
            <label>Descrição</label>
            <input
              type='text'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder='Descrição opcional'
            />
          </div>

          <button type='submit' disabled={loading}>
            {loading ? 'Criando...' : 'Criar especialidade'}
          </button>
        </form>
      </section>

      <hr />

      <section>
        <h2>Vincular especialidade a barbeiro</h2>

        <form onSubmit={handleLinkSpecialtyToBarber}>
          <div>
            <label>Barbeiro</label>
            <select
              value={selectedBarberId}
              onChange={(event) => setSelectedBarberId(event.target.value)}
            >
              <option value=''>Selecione um barbeiro</option>

              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Especialidade</label>
            <select
              value={selectedSpecialtyId}
              onChange={(event) => setSelectedSpecialtyId(event.target.value)}
            >
              <option value=''>Selecione uma especialidade</option>

              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>

          <button type='submit' disabled={linking}>
            {linking ? 'Vinculando...' : 'Vincular'}
          </button>
        </form>
      </section>

      <hr />

      <section>
        <h2>Especialidades cadastradas</h2>

        {specialties.length === 0 ? (
          <p>Nenhuma especialidade cadastrada.</p>
        ) : (
          <ul>
            {specialties.map((specialty) => (
              <li key={specialty.id}>
                <strong>{specialty.name}</strong>
                {specialty.description ? ` - ${specialty.description}` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr />

      <section>
        <h2>Especialidades do barbeiro selecionado</h2>

        {!selectedBarberId ? (
          <p>Selecione um barbeiro para visualizar as especialidades.</p>
        ) : barberSpecialties.length === 0 ? (
          <p>Esse barbeiro ainda não possui especialidades vinculadas.</p>
        ) : (
          <ul>
            {barberSpecialties.map((specialty) => (
              <li key={specialty.id}>
                <strong>{specialty.name}</strong>
                {specialty.description ? ` - ${specialty.description}` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
