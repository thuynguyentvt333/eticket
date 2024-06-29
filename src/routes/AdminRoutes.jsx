import { Route, Routes } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/AdminHomePage/AdminHomePage';
import AdminLayout from '../layouts/AdminLayout';
import Show from '../component/AccountPage/Show';
import ShowEventAd from '../component/EventAd/ShowEventAd';
import StatistialAd from '../component/StatistialAd/StatistialAd';
import Paymentad from '../component/Paymentad/Paymentad';
const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/account" element={<Show />} />
        <Route path="/event" element={<ShowEventAd />} />
        <Route path="/statistics" element={<StatistialAd />} />
        <Route path="/payment" element={<Paymentad />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
