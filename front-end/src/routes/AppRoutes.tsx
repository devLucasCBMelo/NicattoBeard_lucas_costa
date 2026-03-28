import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
import RegisterPage from '../pages/Register/Register';
import DashboardPage from '../pages/Dashboard/Dashboard';
import { PrivateRoute } from './PrivateRoute';
import AppointmentsPage from '../pages/Appointments/Appointments';
import MyAppointmentsPage from '../pages/MyAppointmets/MyAppointmets';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}
