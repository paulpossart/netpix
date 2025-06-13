import { Router } from 'express';
import { createMoviesById } from '../queries/movies.js';
import { verifyUser } from '../queries/auth.js';

const router = Router();

router.post('/:id', verifyUser, createMoviesById);

export default router;