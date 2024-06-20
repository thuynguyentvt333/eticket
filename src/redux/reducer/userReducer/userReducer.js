import Cookies from 'js-cookie';
import { REGISTER_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, SERVER_ERROR, LOGOUT_USER_SUCCESS } from '../../actions/UserAction/userActionTypes';

// Trạng thái ban đầu
const initialState = {
    currentUser: null,
    token: null,
    isLoggedIn: false,
    error: null,
    username: null,
    role: null
};

// Khởi tạo state từ localStorage (nếu có)
const initialStateFromLocalStorage = JSON.parse(localStorage.getItem('userState'));

// Reducer cho user
const userReducer = (state = initialStateFromLocalStorage || initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            // Xử lý logic đăng ký ở đây
            return {
                ...state,
                token: action.payload.token, // Lưu token
                isLoggedIn: true,
                error: null
            };

        case LOGIN_USER_SUCCESS:
            console.log("token: ", action.payload.token)
            const newState = {
                ...state,
                currentUser: action.payload,
                token: action.payload.token,
                isLoggedIn: true,
                role: action.payload.role,
                username: action.payload.username,
                error: null
            };
            // Lưu thông tin người dùng xuống localStorage
            localStorage.setItem('userState', JSON.stringify(newState));
            // Lưu token vào cookie
            Cookies.set('token', action.payload.token);
            return newState;
        
        case LOGOUT_USER_SUCCESS:
            Cookies.remove('token');
            localStorage.clear();
            return {
                ...state,
                currentUser: null,
                token: null,
                isLoggedIn: false,
                role: null,
                error: null
            };

        case LOGIN_USER_FAIL:
        
        
        case SERVER_ERROR:
            return {
                ...state,
                currentUser: null,
                isLoggedIn: false,
                error: action.payload // lỗi từ server
            };

        default:
            return state;
    }
};

export default userReducer;
