import { Router } from 'express';
import { createMoviesById, getMovies, deleteMoviesById } from '../queries/movies.js';

const router = Router();

router.post('/:id', createMoviesById);
router.get('/', getMovies);
router.delete('/:id', deleteMoviesById);

export default router;