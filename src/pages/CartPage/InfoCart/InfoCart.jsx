// InfoCart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// import CartDetailCard from '../../component/CartDetailCard/CartDetailCard';
import CartDetailCard from '../../../component/CartDetailCard/CartDetailCard';
import './InfoCart.scss'; 

const InfoCart = ({ cartItems, totalItems, totalPrice, onOrder }) => {
  return (
    <>
      <div className="content-left">
        <div className="title-left">Shopping Cart</div>
        <hr />
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
        <Link to="/" className="back-home-page">
          <FaArrowLeft /> Tiếp tục mua
        </Link>
      </div>
          <div className="content-right">
              <hr />
        <div className="title-right">Summary</div>
        <hr />
        <div className="quantity-item">{totalItems} Item</div>
        <div className="payment-methods">Phương thức thanh toán</div>
        <div className="total-price">Tổng tiền: {totalPrice} VNĐ</div>
        <button className='button-a' onClick={onOrder}>Đặt hàng</button>
      </div>
    </>
  );
};

export default InfoCart;