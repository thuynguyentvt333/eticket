import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

import CartDetailCard from '../../../component/CartDetailCard/CartDetailCard';
import './InfoCart.scss';

const InfoCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const token = Cookies.get('token');

  const fetchCartData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/my-cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.code === 1000) {
        setCartItems(response.data.result);

        const totalItemsCount = response.data.result.reduce((sum, item) => sum + item.quantity, 0);
        const totalPriceValue = response.data.result.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        setTotalItems(totalItemsCount);
        setTotalPrice(totalPriceValue);
      } else {
        console.error('Error fetching cart data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleContinueBuy = () => {
    navigate('/');
  };

  const handlePayment = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const cartIds = cartItems.map(item => item.cartId);
    const method = 1;

    try {
      const response = await axios.post('http://localhost:8080/api/payment/create_payment', {
        email,
        cartId: cartIds,
        method
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.code === 1000) {
        window.open(response.data.result, '_blank');
      } else {
        console.error('Error creating payment request:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating payment request:', error);
    }
  };

  return (
    <div className="info-cart">
      <h2>Giỏ Hàng</h2>
      {cartItems && cartItems.length > 0 ? (
        <div>
          <div>
            {cartItems.map((item, index) => (
              <CartDetailCard key={index} item={item} onUpdateCart={fetchCartData} />
            ))}
          </div>
          <div className="content-right">
            <hr />
            <div className="title-right">Tổng giá tiền</div>
            <hr />
            <div className="quantity-item">{totalItems} Item</div>
            <div className="payment-methods">Phương thức thanh toán VNPay</div>
            <div className="total-price">Tổng tiền: {totalPrice} VNĐ</div>
            <div className='btn-container'>
              <button className="back-home-page" onClick={handleContinueBuy}>
                <FaArrowLeft /> Tiếp tục mua
              </button>
              <button className='button-a' onClick={handlePayment}>Thanh toán</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4 className='notification'>Giỏ hàng trống</h4>
          <button className="back-home-page" onClick={handleContinueBuy}>
            <FaArrowLeft /> Tiếp tục mua
          </button>
        </div>
      )}
      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
        <ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>Nhập Email của bạn</ModalHeader>
        <ModalBody>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Gửi</Button>{' '}
          <Button color="secondary" onClick={() => setIsModalOpen(false)}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InfoCart;
