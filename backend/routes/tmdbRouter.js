import Router from 'express';
import { fetchPopular } from '../queries/tmdb.js';

const router = Router();

router.get('/popular', fetchPopular);

export default router;
