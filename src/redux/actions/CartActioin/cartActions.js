import { ADD_TO_CART, REMOVE_FROM_CART, DELETE_FROM_CART, ADD_ONE_TO_CART } from './cartActionTypes';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const addOneToCart = (product) => ({
  type: ADD_ONE_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const deleteFromCart = (productId) => ({
  type: DELETE_FROM_CART,
  payload: productId,
});
