import { Router } from 'express';
import { signIn, signOut, passwordCheck, verifyUser } from '../queries/auth.js';
import { rateCheck } from '../utils/helperFunctions.js';

const router = Router();

router.post('/sign-in', rateCheck, signIn);
router.post('/sign-out', signOut);
router.post('/password-check', verifyUser, passwordCheck);

export default router;
