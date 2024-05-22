// src/components/ProductCard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/CartActioin/cartActions';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Kiểm tra nếu product không tồn tại, return null để không render component
  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card product-card">
      <img src={product.image} className="card-img-top product-card__image" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title product-card__name">{product.name}</h5>
        <p className="card-text product-card__description">{product.description}</p>
        <p className="card-text product-card__price">
          <span className="product-card__original-price">{product.originalPrice}$</span>
          <span className="product-card__sale-price">{product.salePrice}$</span>
        </p>
        <button onClick={handleAddToCart} className="btn btn-primary product-card__button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
