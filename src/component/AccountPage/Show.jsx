import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuLeft from './MenuLeft';
import SearchBar from './SearchBar';
import Table from './Table ';
import './Show.scss';
import Cookies from 'js-cookie';

const Show = () => {
  const [selected, setSelected] = useState('all');
  const [data, setData] = useState([]);
  const handleStatusChange = (account) => {
    setSelectedAccount(account);
    setShowConfirm(true);
  };
  useEffect(() => {
    fetchData(selected);
  }, [selected]);

  const fetchData = async (selection) => {
    let url;
    if (selection === 'all') {
      url = 'http://localhost:8080/admin/getAccount';
    } else if (selection === 'merchant') {
      url = 'http://localhost:8080/admin/merchantInfor';
    } else if (selection === 'user') {
      url = 'http://localhost:8080/admin/userInfor';
    }
    
      try {
       const token = Cookies.get('token'); // Lấy token từ cookie
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}` // Gửi token trong header Authorization
          }
        });
          console.log(`check`, token);
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelect = (selection) => {
    setSelected(selection);
  };

  return (
    <div className="app-container">
      <MenuLeft onSelect={handleSelect} />
      <div className="content">
        <SearchBar />
        <Table data={data}
          selected={selected}
          fetchData={fetchData} // Truyền fetchData như một prop
          onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default Show;
