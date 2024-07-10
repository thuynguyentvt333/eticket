import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaTrashAlt,FaMinus, FaPlus } from 'react-icons/fa';
import './CartDetailCard.scss';
import icon_ticket from '../../assets/icon/icon-ticket.png';

const CartDetailCard = ({ item, onUpdateCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncreaseQuantity = () => {
    setQuantity(parseInt(quantity, 10) + 1);
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(parseInt(quantity, 10) - 1);
    }
  }

  const handleUpdateQuantity = async () => {
    const token = Cookies.get('token');
    try {
      const response = await axios.post('http://localhost:8080/cart/update', {
        cartId: item.cartId,
        updateNumber: quantity
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.code === 1000) {
        onUpdateCart();
      } else {
        console.error('Error updating cart quantity:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const handleDeleteItem = async () => {
    const token = Cookies.get('token');
    try {
      const response = await axios({
        method: 'delete',
        url: 'http://localhost:8080/cart/delete',
        data: {
          cartIds: [item.cartId]
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.code === 1000) {
        onUpdateCart(); 
      } else {
        console.error('Error deleting cart item:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  return (
    <div className="cart-detail-card">
      <div className="image-product">
        <img src={icon_ticket} alt="Ticket Icon" />
      </div>
      <div className="product-info">
        <div className="name-product">{item.eventName}</div>
        <div className="type-product">{item.typeName}</div>
      </div>
      <div className="cart-detail-quantity">
        <button className="quantity-btn" onClick={handleDecreaseQuantity}>
          <FaMinus />
        </button>
        <input
          className='inputquantity'
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
        <button className="quantity-btn" onClick={handleIncreaseQuantity}>
          <FaPlus />
        </button>
      </div>
      <div className="cart-detail-price">{item.price} VNĐ</div>
      <div className="update-actions">
        <button className='buttoncart' onClick={handleUpdateQuantity}>
          Cập nhật
        </button>
        <FaTrashAlt className="icon-update-cart" onClick={handleDeleteItem} />
      </div>
    </div>
  );
};

export default CartDetailCard;