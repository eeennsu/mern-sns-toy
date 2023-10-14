import { Role, UserAction } from '../actionTypes/userActionType';
import { CodeResponse } from '@react-oauth/google';

type UserStateType = {
    isLogin: boolean;
    role: Role;
    email: string | null;
    imgUrl: string | null;
    googleResponse: CodeResponse | null
}

const initialState: UserStateType = {
    isLogin: false,
    role: null,
    email: null,
    imgUrl: null,
    googleResponse: null,
};

const userReducer = (state: UserStateType = initialState, { type, payload }: UserAction): UserStateType => {

    switch(type) {
        case 'SET_LOGIN_USER': 
            localStorage.setItem('userGoogleData', JSON.stringify(payload.googleResponse));
            return {
                isLogin: true,              
                role: payload.role,
                email: payload.email,
                imgUrl: payload.imgUrl,
                googleResponse: payload.googleResponse
            };

        case 'SET_LOGOUT_USER':    
            localStorage.removeItem('userGoogleData');     
            return {
                isLogin: false,
                email: null,
                role: null,
                imgUrl: null,
                googleResponse: null
            };

        default: 
            return state;
    }
}

export default userReducer;