import { Router } from 'express';
import { login } from '../controllers/user/user';

const router = Router();

router.post('/login', login);

export default router;