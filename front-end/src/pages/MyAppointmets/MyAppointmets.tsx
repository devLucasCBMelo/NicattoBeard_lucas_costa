import Header from '../../components/Header';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';

type Barber = {
  id: string;
  name: string;
};

type Speciality = {
  id: string;
  name: string;
};

type Appointment = {
  id: string;
  appointmentDate: string;
  status: 'SCHEDULED' | 'CANCELED';
  barber: Barber;
  specialty: Speciality;
};

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  async function fetchAppointments() {
    try {
      setLoading(true);
      const response = await api.get('/appointments/me');
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar agendamentos');
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelAppointment(appointmentId: string) {
    const confirmed = window.confirm(
      'Tem certeza que deseja cancelar este agendameto?'
    );

    if (!confirmed) return;

    try {
      setCancelingId(appointmentId);

      await api.delete(`/appointments/${appointmentId}`);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? {
                ...appointment,
                status: 'CANCELED',
                canceledAt: new Date().toISOString(),
              }
            : appointment
        )
      );
    } catch (error) {
      console.error(error);
      alert('Erro ao cancelar agendamento');
    } finally {
      setCancelingId(null);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Carregando agendamentos...</p>;
  }

  return (
    <div>
      <Header />
      <h1>Meus Agendamentos</h1>

      {appointments.length === 0 ? (
        <p>Você ainda não possui agendamentos.</p>
      ) : (
        <div>
          {appointments.map((appointment) => {
            const formattedDate = new Date(
              appointment.appointmentDate
            ).toLocaleDateString('pt-BR');

            const formattedTime = new Date(
              appointment.appointmentDate
            ).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            const isCanceled = appointment.status === 'CANCELED';
            return (
              <div key={appointment.id}>
                <p>
                  <strong>Barbeiro:</strong> {appointment.barber.name}
                </p>

                <p>
                  <strong>Especialidade</strong> {appointment.specialty.name}
                </p>

                <p>
                  <strong>Data:</strong> {formattedDate}
                </p>

                <p>
                  <strong>Horário:</strong> {formattedTime}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {appointment.status === 'CANCELED' ? 'CANCELADO' : 'AGENDADO'}
                </p>

                {!isCanceled && (
                  <button
                    type='button'
                    onClick={() => handleCancelAppointment(appointment.id)}
                    disabled={cancelingId === appointment.id}
                  >
                    {cancelingId === appointment.id
                      ? 'Cancelando...'
                      : 'Cancelar agendamento'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
