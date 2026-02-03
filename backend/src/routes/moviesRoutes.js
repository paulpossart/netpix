import Router from 'express';
import { createMoviesById, getMovieList, deleteMovie } from '../controllers/moviesControllers.js';
import { requireAuth } from '../controllers/authControllers.js';

const router = Router();

router.post('/:id', requireAuth, createMoviesById);
router.get('/', requireAuth, getMovieList);
router.delete('/:id', requireAuth, deleteMovie);

export default router;