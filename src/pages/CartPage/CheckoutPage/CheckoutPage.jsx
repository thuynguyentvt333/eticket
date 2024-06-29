import React, { useState, useEffect } from 'react';
import './CheckoutPage.scss';
import axios from 'axios';
import Cookies from 'js-cookie';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState('');
  const token = Cookies.get('token');

  useEffect(() => {
    axios.get('http://localhost:8080/my-cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    })
    .then(response => {
      setCartItems(response.data.result);
    })
    .catch(error => {
      console.error('There was an error fetching the cart items!', error);
    });
  }, [token]);

  const handlePayment = () => {
    const cartIds = cartItems.map(item => item.cartId);
    const data = {
      cartId: cartIds,
      method: 1,
      email: email
    };

    axios.post('http://localhost:8080/api/payment/create_payment', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then(response => {
      if (response.data && response.data.result) {
        window.location.href = response.data.result;
      } else {
        alert('Payment request was successful, but no URL was returned.');
      }
    })
    .catch(error => {
      console.error('There was an error processing the payment!', error);
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get('vnp_ResponseCode');

    if (responseCode === '00') {
      alert('Thanh toán thành công, ticket sẽ được gửi vào mail trong giây lát.');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000); // Redirect to homepage after 3 seconds
    }
  }, []);

  return (
    <div className="checkout-page">
      <h2>Thanh Toán</h2>
      <div className="cart-items-container">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-details">
              <div className="item-name">{item.eventName}</div>
              <div className="item-type">{item.type_name}</div>
              <div className="item-quantity">Số lượng: {item.quantity}</div>
              <div className="item-price">{item.price * item.quantity} VNĐ</div>
            </div>
          </div>
        ))}
      </div>

      <hr/>

      <div className="payment-section">
        <h3>Thông Tin Thanh Toán</h3>
        <div className="email-input">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Nhập email của bạn" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button onClick={handlePayment} className="payment-button">Thanh Toán</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
