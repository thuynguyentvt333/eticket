import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './HistoryCart.scss';

const HistoryCart = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
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
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
    const intervalId = setInterval(fetchOrderHistory, 300000); // 300000ms = 5 phút

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="purchase-history">
      <h2>Lịch sử mua hàng</h2>
      <hr />
      {orderHistory && orderHistory.length > 0 ? (
        orderHistory.map((order) => (
          <div key={order.paymentId} className="order-item">
            <div className="order-header">
              <span className="order-date">Ngày thanh toán: {order.paymentTime}</span>
            </div>
            <div className="order-details">
              {order.events.map((event) => (
                <div key={event.eventId} className="event-item">
                  <h5>{event.eventName}</h5>
                  <div className='time-event'>
                    <p>Ngày diễn ra: {event.edate}</p>
                    <p>Thời gian bắt đầu: {event.estart}</p>
                    <p>Thời gian kết thúc: {event.eend}</p>
                  </div>
                  <p>Địa điểm: {event.location}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Không có lịch sử mua hàng</p>
      )}
    </div>
  );
};

export default HistoryCart;
