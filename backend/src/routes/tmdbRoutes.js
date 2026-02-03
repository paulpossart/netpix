import Router from 'express';
import {
    searchTmdb,
    fetchVideosById
} from '../controllers/tmdbControllers.js';
import { requireAuth } from '../controllers/authControllers.js';

const router = Router();

router.get('/search/:query', requireAuth, searchTmdb);
router.get('/videos/:id', requireAuth, fetchVideosById);

export default router;