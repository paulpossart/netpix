import { Router } from 'express';
import { rateCheck } from '../utils/helpers.js';
import {
    login,
    logout,
    requireAuth,
    logoutEverywhere,
    verifyPassword
} from '../controllers/authControllers.js';

const router = Router();

router.post('/login', /*rateCheck,*/ login);
router.post('/logout', logout);
router.post('/logout-all', requireAuth, logoutEverywhere);
router.post(
    '/verify-password',
    /*rateCheck,*/
    requireAuth,
    verifyPassword
);

export default router;
