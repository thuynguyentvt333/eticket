import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, deleteFromCart } from '../../redux/actions/CartActioin/cartActions';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';

const CartDetailCard = ({ item }) => {
    const dispatch = useDispatch();

    const addOneProduct = (itemCart) => {
        dispatch(addToCart(itemCart));
    };

    const minusOneProduct = (itemCart) => {
        dispatch(removeFromCart(itemCart.id));
    };

    const deleteCartDetail = (id) => {
        dispatch(deleteFromCart(id));
    };

    // Tính giá tiền của sản phẩm
    const totalPrice = item.salePrice * item.quantity;

    return (
        <>
            <div className="image-product">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="name-product">{item.name}</div>
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
