import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './CartPage.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
import { clearCart } from '../../redux/actions/CartActioin/cartActions';
import HistoryCart from './HistoryCart/HistoryCart';
import InfoCart from './InfoCart/InfoCart';

const CartPage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('cart'); // 'cart' or 'history'
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handlePayment = async () => {
    const apiPayload = cartItems.map((item) => ({
      createTicketId: item.id,
      quantity: item.quantity,
    }));

    const token = Cookies.get('token');

    try {
      const response = await axios.post('http://localhost:8080/cart/add', apiPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Đã thêm vé vào giỏ hàng!');
        dispatch(clearCart());
        navigate('/checkout');
      } else {
        toast.error('Thêm vào giỏ hàng thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra');
      console.error('Error:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="cart-page-container">
      <div className="sidebar">
        <button
          className={activeTab === 'cart' ? 'active' : ''}
          onClick={() => handleTabClick('cart')}
        >
          Giỏ hàng
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => handleTabClick('history')}
        >
          Lịch sử mua hàng
        </button>
      </div>
      <div className="content">
        {activeTab === 'cart' && <InfoCart onPayment={handlePayment} />}
        {activeTab === 'history' && <HistoryCart />}
      </div>
    </div>
  );
};

export default CartPage;
