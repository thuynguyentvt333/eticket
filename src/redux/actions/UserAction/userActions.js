import { REGISTER_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, SERVER_ERROR } from '../../actions/UserAction/userActionTypes';
import { loginUser } from '../../../services/userService';

export const registerUser = (newUser) => {
    return async (dispatch) => {
        try {
            const response = await registerNewUser(newUser);
            dispatch({ type: REGISTER_USER, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };
};

export const loginUserAction = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await loginUser(email, password);
            console.log("check res: ", response)
            const responseData = response.data;
            if (response.status=== 200) {
                dispatch({ type: LOGIN_USER_SUCCESS, payload: responseData });
            } else if (response.status === 401) {
                dispatch({ type: LOGIN_USER_FAIL, payload: responseData });
            } else {
                dispatch({ type: SERVER_ERROR, payload: responseData });
            }
        } catch (error) {
            // console.log(error);
            // dispatch({ type: SERVER_ERROR, payload: responseData });
            const errorMessage = error.response ? error.response.data : error.message;
            dispatch({ type: SERVER_ERROR, payload: errorMessage });
        }
    };
};
