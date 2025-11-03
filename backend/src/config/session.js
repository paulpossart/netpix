import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import pool from './db.js';

const isProd = process.env.NODE_ENV === 'production';

const pgSession = connectPgSimple(session);
const sessionSecret = process.env.SESSION_SECRET;

const sessionStore = new pgSession({
    pool: pool,
    tableName: 'session',
    schemaName: 'netpix',
    pruneSessionInterval: 60 * 60,
});

const sessionMiddleware = session({
    store: sessionStore,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'lax',
        secure: isProd
    }
});

sessionStore.pruneSessions(err => {
    if (err) console.error('Error pruning sessions:', err);
    else console.log('Expired sessions pruned.');
});

export default sessionMiddleware;
