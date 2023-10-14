import axiosInst from './axiosInst';

export const login_API = (userData: UserFormType) => axiosInst.post('/user/login', userData); 

export const logout_API = () => axiosInst.get('/user/logout'); 