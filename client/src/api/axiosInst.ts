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
    // localStoreage에 profile값이 있으면 로그인상태라는 뜻이고, 이는 request의 헤더에 인증세팅을 해줘야 서버에서 auth관련 로직을 인지할 수 있다.
// Bearer Token 설정해주기
axiosInst.interceptors.request.use(
    (req) => {
        const profile = JSON.parse(localStorage.getItem('profile')!);

        if (profile) {
            const token = profile.token || profile.access_token;            // token 일반 로그인 토큰, access_token google 로그인 토큰
            req.headers.Authorization = `Bearer ${token}`;
        }

        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosInst;