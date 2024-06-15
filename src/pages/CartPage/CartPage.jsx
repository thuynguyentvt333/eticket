import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CartDetailCard from '../../component/CartDetailCard/CartDetailCard';
import './CartPage.scss';
import axios from 'axios';
import Cookies from 'js-cookie';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0); 

    const navigate = useNavigate();

    const handleOrder = async () => {
        console.log("check: ", cartItems)
        if (!cartItems || cartItems.length === 0) {
            toast.info('Giỏ hàng trống');
            return;
        }

        // Chuyển đổi dữ liệu giỏ hàng
        const apiPayload = cartItems.map(item => ({
            createTicketId: item.id,
            quantity: item.quantity
        }));

        // Đọc token từ cookie
        const token = Cookies.get('token');

        try {
            // Gọi API thêm giỏ hàng
            const response = await axios.post('http://localhost:8080/cart/add', apiPayload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success('Đặt hàng thành công');
                // Xử lý khi đặt hàng thành công, ví dụ như điều hướng tới trang khác
                navigate('/home');
            } else {
                toast.error('Đặt hàng thất bại');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi đặt hàng');
            console.error('Order error: ', error);
        }
    }

    return (
        <div className="cart-container">
            <div className="content-left">
                <div className="title-left">Shopping Cart</div>
                <hr />
                <div className="cart-content">
                    {cartItems && cartItems.length > 0 &&
                        cartItems.map((item, index) => (
                            <div key={index} className="cart-detail-card">
                                <CartDetailCard item={item} />
                                <hr />
                            </div>
                        ))}
                </div>
                <Link to="/" className='back-home-page'><FaArrowLeft /> Tiếp tục mua</Link> 
            </div>
            <div className="content-right">
                <div className="title-right">Summary</div>
                <hr />
                <div className="quantity-item">{totalItems} Item</div>
                <div className="payment-methods">Phương thức thanh toán</div>
                <div className="total-price">Tổng tiền: {totalPrice} VNĐ</div>
                <button onClick={() => handleOrder()}>Đặt hàng</button>
            </div>
        </div>
    )
}

export default CartPage;
