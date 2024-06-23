import React, { useEffect } from 'react';
import './AdminLayout.scss';
import AdminHeader from '../component/AdminHeader/AdminHeader';


const AdminLayout = ({ children }) => {
  return (
        <div>
        <AdminHeader />
      {children} 
      </div>
  );
};

export default AdminLayout;
