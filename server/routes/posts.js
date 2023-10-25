import { Router } from 'express';
import { getPagePosts, getOnePost, createPost, updatePost, deletePost, likePost } from '../controllers/posts/posts.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', getPagePosts);
router.get('/:id', auth, getOnePost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;