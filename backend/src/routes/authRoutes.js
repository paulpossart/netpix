import { Router } from 'express';
import { rateCheckLogin, rateCheckPassword } from '../utils/helpers.js';
import {
    login,
    logout,
    requireAuth,
    logoutEverywhere,
    verifyPassword
} from '../controllers/authControllers.js';

const router = Router();

router.post('/login', rateCheckLogin, login);
router.post('/logout', logout);
router.post('/logout-all', requireAuth, logoutEverywhere);
router.post(
    '/verify-password',
    rateCheckPassword,
    requireAuth,
    verifyPassword
);

export default router;
