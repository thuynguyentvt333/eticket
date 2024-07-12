import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import CartPage from '../pages/CartPage/CartPage';
import HomePage from '../pages/HomePage/HomePage';

import InforEvent from '../component/InforEvent/InforEvent';
import SearchResults from '../component/Header/searchresult';
import ManageEvent from '../component/ManageEvent/ManageEvent';
import AddEditEvent from '../component/ManageEvent/AddEditEvent';
import Contact from '../component/Contact/Contact';
import About from '../component/About/About';
import CheckoutPage from '../pages/CartPage/CheckoutPage/CheckoutPage';
import UserProfile from '../component/UserProfile/UserProfile';
import EventList from '../component/List/EventList';
import ResultPayment from '../pages/ResultPayment/ResultPayment';



const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/eventinfor/:id" element={<InforEvent />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/manage-event" element={<ManageEvent />} />
        <Route path="/add-event" element={<AddEditEvent />} />
        <Route path="/edit-event/:id" element={<AddEditEvent />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/events/category/:categoryId" element={<EventList />} />
        <Route path="/api/payment/vnpay_response" element={<ResultPayment />} />

      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
