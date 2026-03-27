import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
import RegisterPage from '../pages/Register/Register';
import DashboardPage from '../pages/Dashboard/Dashboard';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

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
