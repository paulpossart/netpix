import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/config.js';
import {
    isProd,
    isValidInput,
    signAccessToken,
    signRefreshToken,
} from '../utils/helperFunctions.js';

const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    if (
        !isValidInput('username', username, 1, 30)
        || !isValidInput('password', password, 6, 30)
    ) {
        return res.status(400).json({
            userData: false,
            message: 'invalid username or password ',
            user: null
        })
    };

    try {
        const result = await pool.query(
            `SELECT * FROM netpix.users
             WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                userData: false,
                message: 'Invalid username or password',
                user: null
            });
        };
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({
                userData: false,
                message: 'Invalid username or password',
                user: null
            });
        };

        const accessToken = signAccessToken({ sub: user.id });
        const refreshToken = signRefreshToken({ sub: user.id });

        res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200).json({
                userData: true,
                message: 'Sign in successful',
                user: {
                    username: user.username,
                    created_at: user.created_at
                }
            });
    } catch (err) {
        next(err);
    }
};

const signOut = (req, res) => {
    res
        .clearCookie('accessToken', {
            httpOnly: true,
            secure: isProd(),
            sameSite: 'lax'
        })
        .clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProd(),
            sameSite: 'lax',
        })
        .sendStatus(204);
};

const verifyUser = (req, res, next) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken && !accessToken) {
        return res.status(200).json({
            userData: false,
            message: 'No tokens available',
            user: null
        });
    };

    if (!refreshToken) {
        return res.status(401).json({
            userData: false,
            message: 'No refresh token available',
            user: null
        });
    };

    if (!accessToken) {
        return jwt.verify(refreshToken, refreshTokenSecret, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    userData: false,
                    message: 'Invalid refresh token',
                    user: null
                });
            };

            const newAccessToken = signAccessToken({ sub: payload.sub });

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000
            });

            req.userId = payload.sub;
            next()
        });
    };

    jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
        if (err) {
            return jwt.verify(refreshToken, refreshTokenSecret, (err, payload) => {
                if (err) {
                    return res.status(401).json({
                        userData: false,
                        message: 'Invalid tokens',
                        user: null
                    });
                };

                const newAccessToken = signAccessToken({ sub: payload.sub });

                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: isProd(),
                    sameSite: 'lax',
                    maxAge: 15 * 60 * 1000
                });

                req.userId = payload.sub;
                next()
            });
        }
        req.userId = payload.sub;
        next();
    });
};

export { signIn, signOut, verifyUser };
