import { CodeResponse } from '@react-oauth/google';
import { login_API } from '../api/userApis';
import { RootDispatch } from '../redux/actionTypes';
import { User } from '../redux/actionTypes/userActionType';

export const userLogin = (userData: UserFormType, codeResponse: CodeResponse | null) => async (dispatch: RootDispatch) => {
    try {
        // const { data } = await login_API(userData);
        // dispatch({ type: 'SET_LOGIN_USER', payload: data });

        dispatch({
            'type': 'SET_LOGIN_USER',
            payload: {
                email: userData.user_email,
                imgUrl: '',
                role: 'USER',
                googleResponse: codeResponse
            }
        });        
    } catch (error) {
        console.log(error);
    }
}

export const userLogout = () => async (dispatch: RootDispatch) => {
    try {

        // const { data } = await logout_API();
        // dispatch({ type: 'SET_LOGOUT_USER' });
        dispatch({ type: 'SET_LOGOUT_USER', payload: null });
    } catch (error) {
        console.log(error);
    }
}