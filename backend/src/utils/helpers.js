import bcrypt from 'bcrypt';
import validator from 'validator';
import rateLimit from 'express-rate-limit';
import { getUserByUsername } from '../queries/usersQueries.js';

const isProd = process.env.NODE_ENV === 'production';

export const isValidInput = (type, input, min, max) => {
    const safeRegex = /^[^<>{};\\]*$/;
    if (
        typeof input !== 'string'
        || !validator.isLength(input, { min, max })
    ) {
        return false;
    }
    if (type === 'password') return true;
    if (!input.trim()) return false;
    if (input.startsWith(' ') || input.endsWith(' ')) return false;
    if (type === 'username') return validator.matches(input, safeRegex);
    return false;
};

export const httpErr = (message, status, name) => {
    const err = new Error(message);
    err.status = status;
    err.name = name;
    return err;
};

export const rateCheckLogin = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: {
        message: 'Too many attempts, try again later.'
    }
});

export const rateCheckPassword = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: {
        message: 'Too many attempts, try again later.'
    }
});

export const rateCheckReg = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: {
        message: 'Too many attempts, try again later.'
    }
});

export const checkPassword = async (username, password) => {
    const user = await getUserByUsername(username);
    if (!user) return false;

    const isMatch = await bcrypt.compare(password, user.password_hash);
    return isMatch;
};

export const sanitiseUser = (user) => {
    const { password_hash, ...safeUser } = user;
    return safeUser;
};
