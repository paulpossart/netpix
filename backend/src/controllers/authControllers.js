import passport from '../config/passport.js';
import { logoutAll } from '../queries/sessionQueries.js';
import { sanitiseUser, signOff } from '../utils/helpers.js';

const isProd = process.env.NODE_ENV === 'production';


export const login = (req, res, next) => {
    const loginMiddleware = passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({ message: info.message || 'Login failed.' });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            return res.status(200).json({
                message: 'Log in succesful.',
                user: sanitiseUser(req.user)
            });
        });
    });

    loginMiddleware(req, res, next);
};

export const logout = (req, res, next) => signOff(req, res, next, 204);

export const logoutEverywhere = async (req, res, next) => {
    
    await logoutAll(req.user.id);

    res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax'
    });
    return res.sendStatus(204);
};

export const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated.' });
    }
    next();
};
