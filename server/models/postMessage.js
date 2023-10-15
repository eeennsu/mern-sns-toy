import mongoose from 'mongoose';

// 데이터 형태에 대한 타입 세팅
const postMessageSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,        // 이미지를 문자열로 변환할 예정
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postMessageSchema);

export default PostMessage;