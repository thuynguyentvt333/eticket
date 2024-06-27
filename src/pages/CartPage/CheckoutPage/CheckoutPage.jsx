// CheckoutPage.js
import React, { useState, useEffect } from 'react';
import CartDetailCard from '../../../component/CartDetailCard/CartDetailCard';
import './CheckoutPage.scss';
import axios from 'axios';
import Cookies from 'js-cookie';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState('');
    const token = Cookies.get('token');
    const [paymentStatus, setPaymentStatus] = useState(null); // Add payment status state

  useEffect(() => {
    // Fetch cart items from API with token
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
        window.location.href = response.data.result; // Redirect to the payment URL
      } else {
        alert('Payment request was successful, but no URL was returned.');
      }
    })
    .catch(error => {
      console.error('There was an error processing the payment!', error);
    });
  };

  return (
    <div className="checkout-page">
      <h1>Thanh Toán</h1>
      {cartItems.map((item, index) => (
        <CartDetailCard key={index} item={item} />
      ))}
      <div className="payment-section">
        <input 
          type="email" 
          placeholder="Nhập email của bạn" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handlePayment}>Thanh Toán</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
