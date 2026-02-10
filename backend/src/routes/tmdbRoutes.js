import Router from 'express';
import {
    searchTmdb,
    fetchVideosById,
    fetchPopular,
    fetchUpcoming,
    fetchNowPlaying,
    fetchDetailsById
} from '../controllers/tmdbControllers.js';
import { requireAuth } from '../controllers/authControllers.js';

const router = Router();

router.get('/search/:query', requireAuth, searchTmdb);
router.get('/videos/:id', requireAuth, fetchVideosById);
router.get('/popular', requireAuth, fetchPopular);
router.get('/upcoming', requireAuth, fetchUpcoming);
router.get('/now-playing', requireAuth, fetchNowPlaying);
router.get('/details/:id', requireAuth, fetchDetailsById);

export default router;