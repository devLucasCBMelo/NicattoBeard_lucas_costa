import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
import RegisterPage from '../pages/Register/Register';
import DashboardPage from '../pages/Dashboard/Dashboard';
import { PrivateRoute } from './PrivateRoute';
import AppointmentsPage from '../pages/Appointments/Appointments';
import MyAppointmentsPage from '../pages/MyAppointmets/MyAppointmets';
import SpecialtiesPage from '../pages/Specialties/Specialties';
import { AdminRoute } from './AdminRoute';
import AdminDashboardPage from '../pages/AdminDashboard/AdminDashboard';
import BarbersPage from '../pages/Barbers/Barbers';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/my-appointments'
          element={
            <PrivateRoute>
              <MyAppointmentsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/appointments'
          element={
            <PrivateRoute>
              <AppointmentsPage />
            </PrivateRoute>
          }
        />

        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path='/specialties'
          element={
            <PrivateRoute>
              <SpecialtiesPage />
            </PrivateRoute>
          }
        />

        <Route
          path='/admin/dashboard'
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

        <Route
          path='/barbers'
          element={
            <AdminRoute>
              <BarbersPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
