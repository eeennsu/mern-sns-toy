import mongoose from 'mongoose';
import PostMessage from '../../models/postMessage.js';

const getAllPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find({});
        
        if (!postMessages) {
            return res.status(400).json({ "message": "Not found posts." });
        }

        res.status(200).json(postMessages);

    } catch (error) {
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

    const { title, message, creator, tags, selectedFile } = req.body;

    if (!title || !message || !creator || !tags || !selectedFile) {
        return res.status(400).json({ "message": "All information must required." });
    }

    const newPost = new PostMessage({ title, message, creator, tags, selectedFile });

    try {
        const result = await newPost.save();

        console.log('newPost', result);

        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error.message });
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
        return res.status(500).json({ "message": error.message });
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
        return res.status(500).json({ "message": error.message });
    }
}

const likePost = async (req, res) => {

    const { id: _id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ "message": "Invalid id" });
    }

    try {
        const likeUpdatedPost = await PostMessage.findByIdAndUpdate(_id, { $inc: { likeCount: 1 } }, { new: true });

        res.status(200).json(likeUpdatedPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error.message });
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