import mongoose from 'mongoose';
import PostMessage from '../../models/PostMessage.js';

const getAllPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find({});
        
        if (!postMessages) {
            return res.status(400).json({ "message": "Not found posts." });
        }

        res.status(200).json(postMessages);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error.message });
    }
}

const getOnePost = async (req, res) => {

    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ "message": "Invalid id" });
    }

    try {
        const postMessage = await PostMessage.findById(_id);
        
        res.status(200).json(postMessage);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error.message })
    }
}

const createPost = async (req, res) => {

    const { title, message, tags, selectedFile, creator } = req.body;

    if (!title || !message || !tags || !selectedFile) {
        return res.status(400).json({ "message": "All information must required." });
    }
    
    // creator를 전달받으면 구글 유저, 아니면 일반유저

    try {
        const result = await PostMessage.create({
            title,
            message,
            creator: creator? creator : req.email,
            tags,
            selectedFile
        });

        console.log('newPost', result);

        res.status(201).json(result);     

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message });
    }
}

const updatePost = async (req, res) => {

    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ "message": "No post with that id." });
    }

    try {
        // id 필드를 변경하지
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true } );

        res.status(200).json({ id: _id, post: updatedPost });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message });
    }
}

const deletePost = async (req, res) => {
    
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ "message": "Invalid id" });
    }

    try {
        await PostMessage.findByIdAndRemove(_id);

        return res.status(200).json({ "message": "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message });
    }
}

const likePost = async (req, res) => {

    const { id: _id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ "message": "Invalid id" });
    }

    try {
        // 먼저 기존에 좋아요를 눌렀는지 확인
        const foundPost = await PostMessage.findById(_id);  
        const existLikeUser = foundPost.likes.findIndex((email) => email === String(req.email));    
        
        if (existLikeUser === -1) {
            foundPost.likes.push(req.email);
        } else {
            foundPost.likes = foundPost.likes.filter(email => email !== String(req.email));
        }
      
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, foundPost, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": error.message });
    }
}

export {
    getAllPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost,
    likePost
}