import { Route, Routes } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/AdminHomePage/AdminHomePage';
import AdminLayout from '../layouts/AdminLayout';
import Show from '../component/AccountPage/Show';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/account" element={<Show />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
