import Router from 'express';
import {
    fetchPopular,
    fetchUpcoming,
    fetchNowPlaying,
    fetchVideosById,
    fetchLogoById
} from '../queries/tmdb.js';

const router = Router();

router.get('/popular', fetchPopular);
router.get('/upcoming', fetchUpcoming);
router.get('/now-playing', fetchNowPlaying);
router.get('/video/:id', fetchVideosById);
router.get('/logo/:id', fetchLogoById);

export default router;
