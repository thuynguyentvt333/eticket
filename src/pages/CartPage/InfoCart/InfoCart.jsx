// InfoCart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';


import CartDetailCard from '../../../component/CartDetailCard/CartDetailCard';
import './InfoCart.scss'; 

const InfoCart = ({ cartItems, totalItems, totalPrice, onOrder }) => {
  const navigate = useNavigate();
  

  const onPayment = () => {
    navigate('/checkout');
  }

  const handleContinueBuy = () => {
    navigate('/');
  }

  return (
    <>
      <div className="content-left">
        <div className="title-left">Giỏ Hàng </div>
        <hr />
        {cartItems && cartItems.length > 0 ? (
          <div>
            <div className="cart-items-container">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="cart-detail-card">
                    <CartDetailCard item={item} />
                    <hr />
                  </div>
                ))
              ) : (
                <p>Giỏ hàng trống</p>
              )}
            </div>

            <div className="content-right">
              <hr />
              <div className="title-right">Tổng giá tiền</div>
              <hr />
              <div className="quantity-item">{totalItems} Item</div>
              <div className="payment-methods">Phương thức thanh toán VNPay </div>
              <div className="total-price">Tổng tiền: {totalPrice} VNĐ</div>
              <div className='btn-container'>
                <button className="back-home-page" onClick={handleContinueBuy}>
                  <FaArrowLeft /> Tiếp tục mua
                </button>
                <button className='button-a' onClick={onOrder}>Chốt số lượng vé trong giỏ hàng </button>
                <button className='button-a' onClick={onPayment}>Thanh toán</button>
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
          )
        }
      </div>
          
    </>
  );
};

export default InfoCart;