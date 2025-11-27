import { Router } from 'express';
import { rateCheck } from '../utils/helpers.js';
import {
    registerUser,
    authenticateUser,
    updatePassword,
    updateUsername,
    deleteUser
} from '../controllers/usersControllers.js';
import { requireAuth, requireRecentReauth } from '../controllers/authControllers.js';

const router = Router();

router.post('/register-user', /*rateCheck,*/ registerUser);
router.get('/authenticate-user', authenticateUser);
router.post('/update-password', requireAuth, updatePassword);
router.post(
    '/update-username',
    requireAuth,
    requireRecentReauth,
    updateUsername
);
router.delete('/delete-user', requireAuth, deleteUser);

export default router;
