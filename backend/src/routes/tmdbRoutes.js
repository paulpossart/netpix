import Router from 'express';
import { searchTmdb } from '../controllers/tmdbControllers.js';

const router = Router();

router.get('/search/:query', searchTmdb);

export default router;