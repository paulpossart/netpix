import { Router } from 'express';
import { createUser, getUser } from '../queries/users.js';
import { verifyUser } from '../queries/auth.js';
import { rateCheck } from '../utils/helperFunctions.js';

const router = Router();

router.post('/', rateCheck, createUser);
router.get('/', verifyUser, getUser);

export default router;
