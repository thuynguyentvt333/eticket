import React, { useEffect } from 'react';
import './AdminLayout.scss';
import AdminHeader from '../component/AdminHeader/AdminHeader';
// import AdminLeftMenu from '../component/AdminLeftMenu/AdminLeftMenu';

const AdminLayout = ({ children }) => {
  return (
    // <div className='admin-container'>
        <div>
        <AdminHeader />
      {children} 
      </div>
  );
};

export default AdminLayout;
