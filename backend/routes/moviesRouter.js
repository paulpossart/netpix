import { Router } from 'express';
import { createMoviesById, getMovies, deleteMoviesById } from '../queries/movies.js';
import { verifyUser } from '../queries/auth.js';

const router = Router();

router.post('/:id', verifyUser, createMoviesById);
router.get('/', verifyUser, getMovies);
router.delete('/:id', verifyUser, deleteMoviesById);

export default router;