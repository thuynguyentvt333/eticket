import React from 'react';
import { useDispatch } from 'react-redux';
import { addOneToCart, removeFromCart, deleteFromCart } from '../../redux/actions/CartActioin/cartActions';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import './CartDetailCard.scss';

const CartDetailCard = ({ item }) => {
    const dispatch = useDispatch();

    const addOneProduct = (itemCart) => {
        dispatch(addOneToCart(itemCart));
    };

    const minusOneProduct = (itemCart) => {
        dispatch(removeFromCart(itemCart.id));
    };

    const deleteCartDetail = (id) => {
        dispatch(deleteFromCart(id));
    };

    // Tính giá tiền của sản phẩm
    const totalPrice = item.price * item.quantity; // Use "price" for calculation

    return (
        <>
            <div className="image-product">
                {/* might need to display an image from the cart item here */}
                {/* Example: <img src={item.image} alt={item.name} /> */}
            </div>
            <div className="name-product">{item.eventName}</div> {/* Display the event name */}
            <div className="name-product">{item.type_name}</div> {/* Display the ticket type */}
            <div className="cart-detail-quanty">
                <FaPlus className="icon-update-cart" onClick={() => addOneProduct(item)} />
                <span>{item.quantity}</span>
                <FaMinus className="icon-update-cart" onClick={() => minusOneProduct(item)} /> 
            </div>
            <div className="cart-detail-price">{totalPrice} VNĐ</div> {/* Hiển thị giá tiền */}
            <FaTrashAlt className="icon-update-cart" onClick={() => deleteCartDetail(item.id)} />
        </>
    );
};

export default CartDetailCard;