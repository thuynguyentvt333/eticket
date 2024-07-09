import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaTrashAlt } from 'react-icons/fa';
import './CartDetailCard.scss';
import icon_ticket from '../../assets/icon/icon-ticket.png';

const CartDetailCard = ({ item, onUpdateCart }) => {
    const [quantity, setQuantity] = useState(item.quantity);

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
                onUpdateCart(); // Gọi hàm từ component cha để cập nhật lại giỏ hàng
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
                onUpdateCart(); // Gọi hàm từ component cha để cập nhật lại giỏ hàng
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
            <div className="name-product">{item.eventName}</div>
            <div className="name-product">{item.typeName}</div>
            <div className="cart-detail-quantity">
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                />
                <button onClick={handleUpdateQuantity}>Cập nhật</button>
            </div>
            <div className="cart-detail-price">{item.price} VNĐ</div>
            <FaTrashAlt className="icon-update-cart" onClick={handleDeleteItem} />
        </div>
    );
};

export default CartDetailCard;
