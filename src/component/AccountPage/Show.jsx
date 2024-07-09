import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuLeft from './MenuLeft';
// import SearchBar from './SearchBar';
import Table from './Table ';
import './Show.scss';
import Cookies from 'js-cookie';

const Show = () => {
  const [selected, setSelected] = useState('all');
  const [data, setData] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

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
      const token = Cookies.get('token');
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelect = (selection) => {
    setSelected(selection);
  };

  const handleAccountClick = async (account) => {
    setSelectedAccount(account);
    // Gọi API tương ứng dựa trên selected và account.id
     if (selected === 'merchant') {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/merchantInfor/${account.mid}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );
        console.log('Merchant details:', response.data.result);
      } catch (error) {
        console.error('Error fetching merchant details:', error);
      }
    } else if (selected === 'user') {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/userInfor/${account.uid}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );
        console.log('User details:', response.data.result);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };

  useEffect(() => {
    fetchData(selected);
  }, [selected]);

  return (
    <div className='app-container'>
      <MenuLeft onSelect={handleSelect} />
      <div className='content'>
      <Table
        data={data}
        selected={selected}
        fetchData={fetchData}
        onAccountClick={handleAccountClick}
      /></div>
    </div>
  );
};

export default Show;