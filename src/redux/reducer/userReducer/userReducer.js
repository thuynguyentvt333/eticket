import { REGISTER_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, SERVER_ERROR } from '../../actions/UserAction/userActionTypes';

// Trạng thái ban đầu
const initialState = {
    currentUser: null, // Thông tin của người dùng hiện tại
    isLoggedIn: false, // Trạng thái đăng nhập
    error: null
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
                currentUser: action.payload, // Lưu thông tin người dùng đã đăng ký
                isLoggedIn: true, // Đặt trạng thái đăng nhập là true
                error: null
            };

        case LOGIN_USER_SUCCESS:
            const newState = {
                ...state,
                currentUser: action.payload.DT, // Lưu thông tin người dùng đã đăng nhập
                isLoggedIn: true,
                error: null
            };
            // Lưu thông tin người dùng xuống localStorage
            localStorage.setItem('userState', JSON.stringify(newState));
            return newState;

        case LOGIN_USER_FAIL:
        case SERVER_ERROR:
            return {
                ...state,
                currentUser: null,
                isLoggedIn: false,
                error: action.payload.EM // lỗi từ server
            };

        default:
            return state;
    }
};

export default userReducer;

