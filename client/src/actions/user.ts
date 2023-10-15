import { getGoogleInfo_API, login_API } from '../api/userApis';
import { RootDispatch } from '../redux/actionTypes';
import { GoogleResponse } from '../redux/actionTypes/userActionType';

export const userGoogleLogin = (codeResponse: GoogleResponse) => async (dispatch: RootDispatch) => {
    const { data } = await getGoogleInfo_API(codeResponse.access_token);
    localStorage.setItem('profile', JSON.stringify(codeResponse));

    console.log(data);

    dispatch({
        'type': 'SET_LOGIN_USER',
        payload: {
            email: data.email,
            imgUrl: data.picture,
            name: data.name,
            role: 'USER',
            googleResponse: codeResponse,
            token: codeResponse.access_token
        }
    }); 
}

export const userNormalLogin = (userData: UserLoginFormType) => async (dispatch: RootDispatch) => {
    try {
        const { data } = await login_API(userData);
        localStorage.setItem('profile', JSON.stringify(data));

        dispatch({
            'type': 'SET_LOGIN_USER',
            payload: {
                email: userData.email,
                imgUrl: '',
                name: data.name,
                role: 'USER',
                googleResponse: null,
                token: data.token
            }
        });        
    } catch (error) {
        console.log(error);
    }
}

export const userLogout = () => async (dispatch: RootDispatch) => {
    localStorage.removeItem('profile');

    try {
        dispatch({ type: 'SET_LOGOUT_USER', payload: null});
    } catch (error) {
        console.log(error);
    }
}
// signUp은 redux에서 필요없으므로 그냥 signUpForm에서 다룸
// export const userSignUp = (signUpData: UserSignUpFormType) => async (dispatch: RootDispatch) => {
//     try {
//         const userData: RequestSignUpUserType = {
//             name: `${signUpData.firstName} ${signUpData.lastName}`,
//             email: `${signUpData.emailID}@${signUpData.emailDomain}`,
//             password: signUpData.password
//         }
        
//         const { data } = await signUp_API(userData); 
        
         
//     } catch (error) {
//         console.log(error);
//     }
// }