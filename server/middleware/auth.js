import jwt from 'jsonwebtoken';

// jwt 토큰이 유효한지 확인하는 미들웨어
const auth = async (req, res, next) => {
    try {        
        const authHeader = req.headers.Authorization || req.headers.authorization;

        // Bearer로 시작하지 않으면
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ "suc": false, "message": "None authorization header." });     // 401은 인증 실패 에러
        }

        const tmp = authHeader.split(' ');

        // Bearer로 시작하지만 token이 없을 수도 있는 경우
        if (tmp.length !== 2) {
            return res.status(401).json({ "suc": false, "message": "None jwt." });
        }

        const token = tmp[1];
        const isCustomAuth = token.length >= 260;        // 260 보다 크면 우리가 만든 토큰, 아니면 구글 로그인 토큰
        // jwt 검증
        if (isCustomAuth) {
            jwt.verify(
                token,
                process.env.JWT_LOGIN_SECRET_KEY,
                (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ "suc": false, "message": err.message });
                    }
    
                    req.email = decoded.email;
                }
            );
         
        } else {
            // 이미 client에서 정보를 찾았다.
            // jwt.verify(token, '',(err, decoded) => {
            //     if (err) {
            //         return res.status(401).json({ "suc": false, "message": err.message });
            //     }
                
            //     req.email = decoded.email;
            //     console.log(req.email);
            // });
        }
        console.log('auth통과, req.email', req?.email);

        next();
    } catch (error) {
        return res.status(401).json({ "suc": false, "message": error.message });
    }
}

export default auth;