import { Route, Routes } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/AdminHomePage/AdminHomePage';
import AdminLayout from '../layouts/AdminLayout';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
