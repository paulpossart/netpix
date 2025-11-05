import passport from '../config/passport.js';
import { createUser } from '../queries/userQueries.js';
import { sanitiseUser } from '../utils/authHelpers.js';
import { isValidInput, httpErr } from '../utils/authHelpers.js';

const isProd = process.env.NODE_ENV === 'production';

export const registerUser = async (req, res, next) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (
            !isValidInput('username', username, 1, 30)
            || !isValidInput('password', password, 6, 30)
            || password !== confirmPassword
        ) {
            return next(httpErr('Invalid input', 400, 'Registration Error'));
        }

        const newUser = await createUser(username, password, confirmPassword);
        req.logIn(newUser, (err) => {
            if (err) return next(err);

            return res.status(201).json({
                message: 'User created and logged in.',
                user: sanitiseUser(req.user)
            })
        });
    } catch (err) {
        next(err);
    }
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

export const logout = (req, res, next) => {
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
            res.sendStatus(204);
        })
    })
};

export const authenticateUser = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated.' });
    }
    res.status(200).json({
        message: 'User authenticated.',
        user: sanitiseUser(req.user)
    });
};
