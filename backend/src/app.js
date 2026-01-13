import express from 'express';
import sessionMiddleware from './config/session.js';
import passport from './config/passport.js';
import helmet from 'helmet';

import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import tmdbRouter from './routes/tmdbRoutes.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/tmdb', tmdbRouter);

app.get('/', (req, res) => res.json({ backend: 'up and running' }));

app.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({
        name: err.name || 'Unknown error',
        message: err.message || 'An unexpected error occurred'
    });
});

export default app;