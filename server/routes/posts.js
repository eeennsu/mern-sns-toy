import { Router } from 'express';
import { getPagePosts, getOnePost, createPost, updatePost, deletePost, likePost, getPostsBySearch, submitComment } from '../controllers/posts/posts.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', getPagePosts);
router.get('/detail/:id', getOnePost);
router.get('/search', getPostsBySearch);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/submitComment', auth, submitComment);

export default router;