import Router from 'express';
import { fetchPopular, fetchVideosById } from '../queries/tmdb.js';

const router = Router();

router.get('/popular', fetchPopular);
router.get('/:id', fetchVideosById);

export default router;
