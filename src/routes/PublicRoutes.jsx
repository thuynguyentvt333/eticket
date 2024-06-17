import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import CartPage from '../pages/CartPage/CartPage';
import HomePage from '../pages/HomePage/HomePage';
// import EventPage from '../pages/eventpage/EventPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import InforEvent from '../component/InforEvent/InforEvent';
import SearchResults from '../component/Header/searchresult';

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/eventinfor/:id" element={<InforEvent />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
