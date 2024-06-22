// HistoryCart.js
import React from 'react';
import './HistoryCart.scss';

const HistoryCart = () => {
  // Dữ liệu ví dụ - bạn cần thay thế bằng dữ liệu thực tế từ API
  const orderHistory = [
    {
      orderId: '123456',
      paymentDate: '20/10/2023',
      eventName: 'Sự kiện âm nhạc hoành tráng',
      tickets: [
        {
          type: 'VIP',
          price: '500.000 VNĐ',
          quantity: 2,
          imageUrl: 'https://i.pinimg.com/564x/9d/b1/c7/9db1c74134a95361ff0ad1c1e4414186.jpg', // Ảnh sự kiện
        },
        {
          type: 'Thường',
          price: '200.000 VNĐ',
          quantity: 1,
          imageUrl: 'https://i.pinimg.com/564x/9d/b1/c7/9db1c74134a95361ff0ad1c1e4414186.jpg', // Ảnh sự kiện (có thể khác nhau)
        },
      ],
      total: '1.200.000 VNĐ', 
    },
    // ...Thêm dữ liệu cho các đơn hàng khác
  ];

  return (
    <div className="purchase-history">
      <h2>Lịch sử mua hàng</h2>
      <hr />

      {orderHistory.map((order) => (
        <div key={order.orderId} className="order-item">
          <div className="order-header">
            <span className="order-date">Ngày thanh toán: {order.paymentDate}</span>
          </div>

          <div className="order-details">
            <h3>{order.eventName}</h3>
            
            {order.tickets.map((ticket, index) => (
              <div key={index} className="ticket-item"> 
                <img className="ticket-image" src={ticket.imageUrl} alt={order.eventName} />
                <div className="ticket-info">
                  <p>Loại vé: <strong>{ticket.type}</strong></p>
                  <p>Giá: {ticket.price}</p>
                  <p>Số lượng: {ticket.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <hr />
          <div className="order-total">
            <span>Tổng cộng:</span>
            <span>{order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryCart;