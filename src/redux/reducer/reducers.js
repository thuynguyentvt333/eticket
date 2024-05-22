// src/redux/reducers.js
import { combineReducers } from 'redux';
import cartReducer from './CartReducer/cartReducer';
import userReducer from './userReducer/userReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer
});

export default rootReducer;
