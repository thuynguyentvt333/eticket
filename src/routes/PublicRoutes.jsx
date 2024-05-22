import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import CartPage from '../pages/CartPage/CartPage';
import HomePage from '../pages/HomePage/HomePage';

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
