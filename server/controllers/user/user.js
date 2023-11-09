import User from '../../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const JWTSecretKey = process.env.JWT_LOGIN_SECRET_KEY;

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ "suc": false, "message": "All information must required." });
    }

    try {
        // 중복된 이메일이 있는지 없는지 확인해야 함
        const foundEmail = await User.findOne({ email });

        // 만약 이메일이 있다면? 중복되었다는 뜻
        if (foundEmail) {
            return res.status(409).json({ "suc": false, "message": "Email is already in use." });
        }

        // 만약 이메일이 없다면? 중복되지 않았다는 뜻, 비밀번호를 저장하기 전에 hash한다
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await User.create({ 
            name,
            email,
            password: hashedPassword
        });

        // 201은 정보 추가 성공 상태
        res.status(201).json({ "suc": true, "message": "User created successfully.", email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({ "suc": false, "message": "Email and password are invalid." });
    }

    try {
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(404).json({ "suc": false, "message": "Email not found." });
        }

        // 여기까지 통과했으면 이메일은 있다는 뜻이고, 이제 decoded된 비밀번호를 찾아야 한다.
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ "suc": false, "message": "Password is incorrect." });
        }

        // 여기까지 넘어오면 일치한다는 뜻이고, 이제 로그인을 시키기 위해 jwt를 발급한다
        const token = jwt.sign(
            {
                email: foundUser.email,
                password: foundUser.password
            },
            JWTSecretKey,
            {
                expiresIn: '1h'        
            }
        );

        // 발급한 토큰을 클라이언트에 응답
        res.status(200).json({ user: foundUser, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error.message });
    }
}

const logout = async (req, res) => {
    // 일단 보류, 단순하게 클라이언트에서 처리
}

export {
    signUp,
    login,
    logout,
}