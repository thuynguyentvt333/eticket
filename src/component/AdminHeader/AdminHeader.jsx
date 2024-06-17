import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './AdminHeader.scss';
import logo from '../../assets/product/logo.png'; 
import { FaUserCircle } from 'react-icons/fa';

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="admin-header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/admin/account">Account</NavLink> {/* Sử dụng NavLink */}
            </li>
            <li>
              <NavLink to="/admin/event">Event</NavLink> {/* Sử dụng NavLink */}
            </li>
            <li>
              <NavLink to="/admin/statistics">Thống kê</NavLink> {/* Sử dụng NavLink */}
            </li>
            <li className="dropdown" onMouseEnter={() => setIsDropdownOpen(true)} 
              onMouseLeave={() => setIsDropdownOpen(false)}>
              <span className="dropdown-toggle">Hệ thống</span> 
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <li>
                  <NavLink to="/admin/category">Category</NavLink> {/* Sử dụng NavLink */}
                </li>
                <li>
                  <NavLink to="/admin/role">Role</NavLink> {/* Sử dụng NavLink */}
                </li>
                <li>
                  <NavLink to="/admin/payment">Payment</NavLink> {/* Sử dụng NavLink */}
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="user-profile">
          <span>Name</span> <FaUserCircle className="user-icon" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;