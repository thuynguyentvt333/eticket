import { Route, Routes } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/AdminHomePage/AdminHomePage';
import AdminLayout from '../layouts/AdminLayout';
import AccountList from '../component/Account/AccountList';
const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/account" element={<AccountList/>} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
