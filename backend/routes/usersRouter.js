import { Router } from 'express';
import { createUser, getUser, updatePassword, deleteUser } from '../queries/users.js';
import { verifyUser } from '../queries/auth.js';
import { rateCheck } from '../utils/helperFunctions.js';

const router = Router();

router.post('/', rateCheck, createUser);
router.get('/', verifyUser, getUser);
router.patch('/update-password', verifyUser, updatePassword);
//router.patch('/update-username', verifyUser, updateUsername);
router.delete('/', verifyUser, deleteUser);

export default router;
