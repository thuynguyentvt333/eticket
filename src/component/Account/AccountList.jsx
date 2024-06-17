import React, { useState, useEffect } from 'react';
import './AccountList.scss'; // Import file CSS cho component này
import { FaSearch } from 'react-icons/fa';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Tất cả'); 
  const [searchTerm, setSearchTerm] = useState('');

  // Thay thế bằng cách gọi API để lấy dữ liệu tài khoản
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/accounts'); 
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []); 

  // Lọc tài khoản theo vai trò
  const filteredAccounts = accounts.filter((account) => {
    if (selectedRole === 'Tất cả') {
      return true; 
    } else {
      return account.role.includes(selectedRole); 
    }
  }).filter((account) => {
    // Lọc theo tên tài khoản hoặc ID
    const searchValue = searchTerm.toLowerCase();
    return (
      account.accountId.toString().includes(searchValue) ||
      account.username.toLowerCase().includes(searchValue)
    );
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="account-list-container">
      <h2>Danh sách tài khoản</h2>

      <div className="filter-container">
        <div className="role-filter">
          <button 
            className={selectedRole === 'Tất cả' ? 'active' : ''} 
            onClick={() => setSelectedRole('Tất cả')}
          >
            Tất cả
          </button>
          <button
            className={selectedRole === 'merchant' ? 'active' : ''}
            onClick={() => setSelectedRole('merchant')}
          >
            Merchant
          </button>
          <button 
            className={selectedRole === 'user' ? 'active' : ''}
            onClick={() => setSelectedRole('user')}
          >
            User
          </button>
        </div>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <table className="account-table">
        <thead>
          <tr>
            <th>AccountId</th>
            <th>Username</th>
            <th>Role</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.accountId}> 
              <td>{account.accountId}</td>
              <td>{account.username}</td>
              <td>{account.role}</td>
              <td>{account.createdAt}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;