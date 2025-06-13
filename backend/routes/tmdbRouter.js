import Router from 'express';
import {
    fetchPopular,
    fetchUpcoming,
    fetchNowPlaying,
    fetchVideosById,
    fetchLogoById,
    searchTmdb
} from '../queries/tmdb.js';

const router = Router();

router.get('/popular', fetchPopular);
router.get('/upcoming', fetchUpcoming);
router.get('/now-playing', fetchNowPlaying);
router.get('/video/:id', fetchVideosById);
router.get('/logo/:id', fetchLogoById);
router.get('/search/:query', searchTmdb);

export default router;
