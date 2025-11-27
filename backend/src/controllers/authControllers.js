import passport from '../config/passport.js';
import { logoutAll } from '../queries/sessionQueries.js';
import { sanitiseUser, httpErr, checkPassword, isValidInput } from '../utils/helpers.js';

const isProd = process.env.NODE_ENV === 'production';

export const signOff = (req, res, next, status = 200, msgContent = 'Logged out') => {
    req.logOut(err => {
        if (err) return next(err);

        req.session.destroy((err) => {
            if (err) return next(err);

            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax'
            });

            if (status === 204) return res.sendStatus(status);

            return res.status(status).json({
                message: msgContent,
            });
        });
    });
};

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

export const verifyPassword = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (
            !isValidInput('username', username, 1, 30)
            || !isValidInput('password', password, 6, 30)
        ) {
            return next(httpErr('Invalid input', 400, 'PasswordError'));
        };

        const isValid = await checkPassword(username, password);
        if (!isValid) req.session.reauthOK = false;
        else {
            req.session.reauthOK = true;
            req.session.reauthTime = Date.now();
        }
        return res.status(200).json({ isValid });
    } catch (err) {
        next(err);
    }
};

export function requireRecentReauth(req, res, next) {
    const timeout = 5 * 60 * 1000;
    if (!req.session.reauthOK) return next(httpErr('Reauthorisation required. Please enter password.', 401, 'ReauthError'));

    if (Date.now() - req.session.reauthTime > timeout) {
        return next(httpErr('Reauthorisation timeout. Please re-enter password.', 401, 'ReauthError'));
    }

    next();
}
