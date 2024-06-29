import React, { useState, useEffect } from 'react';
import './Paymentad.scss';
import axios from 'axios';
import Cookies from 'js-cookie';

function Paymentad() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
        try {
            const token = Cookies.get('token'); 
            const sessionId = Cookies.get('sessionId'); 

        const response = await axios.get('http://localhost:8080/admin/payment-history',{
            headers: {
              'Authorization': `Bearer ${token}`, // Gửi token trong header Authorization
              'X-Session-Id': sessionId, // Gửi session ID trong header tùy chỉnh (ví dụ: X-Session-Id)
            }
        });
       
        
        setPayments(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="container">
      <h2>Lịch sử thanh toán</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID Thanh toán</th>
            <th>Thời gian</th>
            <th>Trạng thái</th>
            <th>Số tiền</th>
            <th>ID người dùng</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{new Date(payment.paymentTime).toLocaleString()}</td>
              <td>{payment.paymentStatus}</td>
              <td>{payment.paymentAmount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</td>
              <td>{payment.uid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Paymentad;