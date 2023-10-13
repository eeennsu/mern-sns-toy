import { Role, UserAction } from '../actionTypes/userActionType';

type UserStateType = {
    isLogin: boolean;
    role: Role;
}

const initialState: UserStateType = {
    isLogin: false,
    role: null,
};

const userReducer = (state: UserStateType = initialState, { type, payload }: UserAction): UserStateType => {

    switch(type) {
        case 'SET_LOGIN_USER': 

            return {
                isLogin: true,
                role: payload.role
            };

        case 'SET_LOGOUT_USER': 
        
            return {
                isLogin: false,
                role: null
            };

        default: 
            return state;
    }
}

export default userReducer;