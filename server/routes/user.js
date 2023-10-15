import { Router } from 'express';
import { login, logout, signUp } from '../controllers/user/user.js';

const router = Router();

router.post('/signUp', signUp);
router.post('/login', login);
router.get('/logout', logout);

export default router;