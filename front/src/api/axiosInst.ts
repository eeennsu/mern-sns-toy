import axios from 'axios';

const { DEV, VITE_DEPLOY_SERVER_URL, VITE_LOCAL_SERVER_URL } = import.meta.env;


// Inst는 instance의 줄임말
const url = DEV ? VITE_LOCAL_SERVER_URL : VITE_DEPLOY_SERVER_URL;

const axiosInst = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInst;