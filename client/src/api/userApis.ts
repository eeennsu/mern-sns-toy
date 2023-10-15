import axios from 'axios';
import axiosInst from './axiosInst';

export const login_API = (userData: UserLoginFormType) => axiosInst.post('/user/login', userData);

export const getGoogleInfo_API = (googleToken: string) => axios.get<GoogleUserInfo>('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
        Authorization: `Bearer ${googleToken}`
    }
});

export const logout_API = () => axiosInst.get('/user/logout'); 

export const signUp_API = (userData: RequestSignUpUserType) => axiosInst.post('/user/signUp', userData); 
