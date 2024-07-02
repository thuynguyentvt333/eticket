// HistoryCart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './HistoryCart.scss';

const HistoryCart = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Hàm gọi API để lấy dữ liệu lịch sử mua hàng
    const fetchOrderHistory = async () => {
      try {
        const token = Cookies.get('token'); // Lấy token từ cookie
        const response = await axios.get('http://localhost:8080/history', {
          headers: {
            Authorization: `Bearer ${token}` // Gửi token trong header
          }
        });
        if (response.data.code === 1000) {
          setOrderHistory(response.data.result.ticket);
          console.log("check: ", orderHistory)
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    // Gọi API khi component được mount lần đầu và định kỳ sau mỗi 5 phút
    fetchOrderHistory();
    const intervalId = setInterval(fetchOrderHistory, 300000); // 300000ms = 5 phút

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="purchase-history">
      <h2>Lịch sử mua hàng</h2>
      <hr />

      {orderHistory && orderHistory.length > 0 && orderHistory.map((order) => (
        <div key={order.ticketId} className="order-item">
          <div className="order-header">
            <span className="order-date">Ngày thanh toán: {order.paymentTime}</span>
          </div>

          <div className="order-details">
            {order.events.length > 0 && 
              <div>
                <h5>{order.events[0].eventName}</h5>
                <div className='time-event'>
                  <p>Ngày diễn ra: {order.events[0].edate}</p>
                  <p>Thời gian bắt đầu: {order.events[0].estart}</p>
                  <p>Thời gian kết thúc: {order.events[0].eend}</p>
                </div>
                <p>Địa điểm: {order.events[0].location}</p>
              </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryCart;
