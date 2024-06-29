import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminHeader.scss';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/product/logo.png'; 
import { FaUserCircle } from 'react-icons/fa';
import { logoutAction } from '../../redux/actions/UserAction/userActions';

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = async () => {
    await dispatch(logoutAction());
    navigate('/login'); // Chuyển hướng đến trang home sau khi đăng xuất
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
              <NavLink to="/admin/account">Account</NavLink> 
            </li>
            <li>
              <NavLink to="/admin/event">Event</NavLink> 
            </li>
            <li>
              <NavLink to="/admin/statistics">Thống kê</NavLink> 
            </li>
            <li 
              className="dropdown" 
              onMouseEnter={toggleDropdown} 
              onMouseLeave={toggleDropdown}
            >
              <span className="dropdown-toggle">Hệ thống</span> 
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <li>
                  <NavLink to="/admin/category">Category</NavLink> 
                </li>
                <li>
                  <NavLink to="/admin/role">Role</NavLink> 
                </li>
                <li>
                  <NavLink to="/admin/payment">Payment</NavLink> 
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div 
          className="user-profile dropdown"
          onMouseEnter={toggleUserDropdown} 
          onMouseLeave={toggleUserDropdown}
        >
          <FaUserCircle className="user-icon" />
          <ul className={`dropdown-menu ${isUserDropdownOpen ? 'show' : ''}`}>
            
            <li onClick={handleLogout}>
              <span>Đăng xuất</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;