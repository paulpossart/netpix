import Router from 'express';
import {
    searchTmdb,
    fetchVideosById
} from '../controllers/tmdbControllers.js';

const router = Router();

router.get('/search/:query', searchTmdb);
router.get('/videos/:id', fetchVideosById);

export default router;