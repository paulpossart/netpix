import {Router} from 'express';
import { rateCheck } from '../utils/authHelpers.js';
import { registerUser, login, logout, authenticateUser } from '../controllers/authControllers.js';

const router = Router();

router.post('/register-user', rateCheck, registerUser);
router.post('/login', rateCheck, login);
router.post('/logout', logout);
router.get('/authenticate-user', authenticateUser)

export default router;
