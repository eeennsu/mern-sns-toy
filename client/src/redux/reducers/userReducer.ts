import { Role, UserAction } from '../actionTypes/userActionsTypes';

type UserStateType = {
    isLogin: boolean;
    role: Role;
    email: string | null;
    imgUrl: string | null;
    googleResponse: GoogleResponse | null,
    token: string | null;
}

const initialState: UserStateType = {
    isLogin: false,
    role: null,
    email: null,
    imgUrl: null,
    googleResponse: null,
    token: null
};

const userReducer = (state: UserStateType = initialState, { type, payload }: UserAction): UserStateType => {

    switch(type) {
        case 'SET_LOGIN_USER':             
            return {
                ...state,
                isLogin: true,              
                role: payload.role,
                email: payload.email,
                imgUrl: payload.imgUrl,
                googleResponse: payload.googleResponse,
                token: payload.token
            };

        case 'SET_LOGOUT_USER':    
        
            return {
                ...state,
                isLogin: false,
                email: null,
                role: null,
                imgUrl: null,
                googleResponse: null,
                token: null
            };

        default: 
            return state;
    }
}

export default userReducer;