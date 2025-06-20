import { v4 as uuid4 } from 'uuid';
import bcrypt from 'bcrypt';
import pool from '../db/config.js';
import {
    isProd,
    isValidInput,
    signAccessToken,
    signRefreshToken,
} from '../utils/helperFunctions.js';

const createUser = async (req, res, next) => {
    const id = uuid4();
    const { newUsername, newPassword } = req.body;

    if (
        !isValidInput('username', newUsername, 1, 30)
        || !isValidInput('password', newPassword, 6, 30)
    ) {
        return res.status(400).json({
            userData: false,
            message: 'Invalid username or password',
            user: null
        })
    };

    try {
        const checkUsername = await pool.query(
            'SELECT * FROM netpix.users WHERE username = $1',
            [newUsername]
        );

        if (checkUsername.rows.length > 0) {
            return res.status(409).json({
                userData: false,
                message: 'Username unavailable',
                user: null
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const result = await pool.query(
            `INSERT INTO netpix.users (id, username, password_hash)
             VALUES ($1, $2, $3) RETURNING id, username, created_at`,
            [id, newUsername, hashedPassword]
        )
        const user = result.rows[0];
        const accessToken = signAccessToken({ sub: id });
        const refreshToken = signRefreshToken({ sub: id });

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
                message: 'New user succesfully created',
                user: {
                    username: user.username,
                    created_at: user.created_at
                }
            })

    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    const userId = req.userId;
    try {
        const result = await pool.query(
            `SELECT username, created_at FROM netpix.users
             WHERE id = $1`,
            [userId]
        );
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({
                userData: false,
                message: 'Invalid username or password',
                user: null
            })
        }

        res.status(200).json({
            userData: true,
            message: 'Userdata succesfully retrieved',
            user: {
                username: user.username,
                created_at: user.created_at
            }
        })
    } catch (err) {
        next(err);
    }
};

const updatePassword = async (req, res, next) => {
    const userId = req.userId;
    const { currentPassword, updatedPassword, reEnteredPassword } = req.body;

    if (!isValidInput('password', currentPassword, 6, 30)) {
        return res.status(400).json({
            success: false,
            message: 'Current password incorrect',
        })
    };

    if (
        !isValidInput('password', updatedPassword, 6, 30) ||
        updatedPassword !== reEnteredPassword
    ) {
        return res.status(400).json({
            success: false,
            message: 'New password invalid, or does not match',
        });
    };

    try {
        const result = await pool.query(
            `SELECT * FROM netpix.users
             WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Could not find user',
            });
        };

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password invalid',
            });
        };

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updatedPassword, saltRounds);

        await pool.query(
            `UPDATE netpix.users
             SET password_hash = $1
             WHERE id = $2`,
            [hashedPassword, userId]
        );

        res
            .clearCookie('accessToken', {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
            })
            .clearCookie('refreshToken', {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
            })
            .status(200).json({
                success: true,
                message: 'Password updated. Please sign in again',
            });

    } catch (err) {
        next(err);
    }
};

const updateUsername = async (req, res, next) => {
    const userId = req.userId;
    const { updatedUsername } = req.body;

    if (!isValidInput('username', updatedUsername, 1, 30)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid username',
            user: null
        })
    };

    try {
        const checkUsername = await pool.query(
            'SELECT * FROM netpix.users WHERE username = $1',
            [updatedUsername]
        );

        if (checkUsername.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Username unavailable',
                user: null
            });
        }

        const result = await pool.query(
            `UPDATE netpix.users
             SET username = $1
             WHERE id = $2
             RETURNING username, created_at`,
            [updatedUsername, userId]
        );

        const user = result.rows[0];

        res.status(200).json({
            success: true,
            message: `Username updated to: ${user.username}`,
            user: user
        });

    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        await pool.query(
            `DELETE FROM netpix.users
            WHERE id = $1`,
            [userId]
        );
        res
            .clearCookie('accessToken', {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
            })
            .clearCookie('refreshToken', {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
            })
            .status(200).json({
                success: true,
                message: 'user successfully deleted'
            });

    } catch (err) {
        next(err);
    }
}

export { createUser, getUser, updatePassword, updateUsername, deleteUser };
