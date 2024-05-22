import React, { useEffect } from 'react';
import './AdminLayout.scss';
import AdminHeader from '../component/AdminHeader/AdminHeader';
import AdminLeftMenu from '../component/AdminLeftMenu/AdminLeftMenu';

const AdminLayout = ({ children }) => {
  return (
    <div className='admin-container'>
      <div className='admin-above'>
        <AdminHeader />
      </div>
      <div className='admin-below'>
        <div className='admin-menu-left'>
          <AdminLeftMenu />
        </div>
        <div className='admin-content-children'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
