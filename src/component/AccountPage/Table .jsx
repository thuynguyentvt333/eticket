import React, { useState } from 'react';
import axios from 'axios';
import './Table.scss';
import Cookies from 'js-cookie';
import Popup from './Popup';

const Table = ({ data, selected, fetchData, onAccountClick }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const handleStatusChange = (account) => {
    setSelectedAccount(account);
    setShowConfirm(true);
  };

  const handleChangeStatus = async () => {
    try {
      if (selectedAccount) {
        const token = Cookies.get('token');
        const response = await axios.post(
          'http://localhost:8080/admin/account/change-status',
          {
            username: selectedAccount.username,
            role: selected === 'merchant' ? 'merchant' : 'user',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.code === 1000) {
          setShowConfirm(false);
          fetchData(selected);
        } else {
          console.error('Lỗi khi thay đổi trạng thái:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Lỗi khi gửi request:', error);
    }
  };

  const handleRowClick = async (account) => {
    onAccountClick(account);
    setSelectedAccount(account);
    setShowPopup(true);

    try {
      let response;
      if (selected === 'all') {
        response = await axios.get(
          `http://localhost:8080/admin/account/${account.id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );
      } else if (selected === 'merchant') {
        response = await axios.get(
          `http://localhost:8080/admin/merchantInfor/${account.mid}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );
      } else if (selected === 'user') {
        response = await axios.get(
          `http://localhost:8080/admin/userInfor/${account.uid}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );
      }
      setPopupData(response.data.result);
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

  const renderTableHeader = () => {
    if (selected === 'all') {
      return (
        <tr>
          <th>AccountId</th>
          <th>Username</th>
          <th>Roles</th>
        </tr>
      );
    } else if (selected === 'merchant') {
      return (
        <tr>
          <th>Merchant ID</th>
          <th>Username</th>
          <th>Address</th>
          <th>Status</th>
        </tr>
      );
    } else if (selected === 'user') {
      return (
        <tr>
          <th>User ID</th>
          <th>Username</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Status</th>
        </tr>
      );
    }
  };

  const renderTableData = () => {
    return data.map((item) => {
      const isActive = item.status === 1;

      if (selected === 'all') {
        return (
          <tr key={item.id} >
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.roles}</td>
          </tr>
        );
      } else if (selected === 'merchant') {
        return (
          <tr key={item.mid} onClick={() => handleRowClick(item)}>
            <td>{item.mid}</td>
            <td>{item.username}</td>
            <td>{item.address}</td>
            <td>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => handleStatusChange(item)}
              />
            </td>
          </tr>
        );
      } else if (selected === 'user') {
        return (
          <tr key={item.uid} onClick={() => handleRowClick(item)}>
            <td>{item.uid}</td>
            <td>{item.username}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            <td>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => handleStatusChange(item)}
              />
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <div>
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>

      {showConfirm && (
        <div className="confirm-box">
          <p>Vô hiệu hóa/Kích hoạt tài khoản này?</p>
          <div className="button-group">
            <button onClick={() => setShowConfirm(false)}>Hủy</button>
            <button onClick={handleChangeStatus}>Có</button>
          </div>
        </div>
      )}

      {showPopup && (
        <Popup data={popupData} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Table;