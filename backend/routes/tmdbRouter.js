import Router from 'express';
import { fetchPopular, fetchUpcoming, fetchNowPlaying, fetchVideosById } from '../queries/tmdb.js';

const router = Router();

router.get('/popular', fetchPopular);
router.get('/upcoming', fetchUpcoming);
router.get('/now-playing', fetchNowPlaying);
router.get('/:id', fetchVideosById);

export default router;
