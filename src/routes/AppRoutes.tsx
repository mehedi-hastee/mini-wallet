import AuthRouteWrapper from '@components/AuthRouteWrapper';
import { ROUTES } from '@constants/routes.constants';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';
import Register from '@pages/Register';
import WithdrawForm from '@pages/WithdrawForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const AppRoutes = () => {
  
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.DASHBOARD} element={<AuthRouteWrapper element={<Dashboard />} />} />
        <Route path={ROUTES.WITHDRAW} element={<AuthRouteWrapper element={<WithdrawForm />} />} />
        
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;