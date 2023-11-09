// 현대의 node js는 require 대신 import 구문을 통해 패키지를 사용한다.
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import posts from './routes/posts.js';
import user from './routes/user.js';
import crypto from 'crypto';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// cors 오류를 해결해주는 작업은 반드시 route 경로보다 위에서 작용해야 한다
app.use(cors());        

app.use('/user', user);
app.use('/posts', posts);

app.get('/', (req, res) => {
    res.send('hello my mern-toy-project server!');
});

mongoose.connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
        console.log(`Mongo DB is connected!`);
        app.listen(PORT, () => {
            console.log(`server is connected at ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('config error : ', err);
    });
    