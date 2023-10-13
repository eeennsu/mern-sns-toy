import { Router } from 'express';
import { getAllPosts, getOnePost, createPost, updatePost, deletePost, likePost } from '../controllers/posts/posts.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;