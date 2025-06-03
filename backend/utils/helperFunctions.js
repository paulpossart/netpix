import validator from 'validator';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const safeRegex = /^[^<>{};\\]*$/;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const isProd = () => process.env.NODE_ENV === 'production';

const isValidInput = (type, input, min, max) => {
    if (typeof input !== 'string' || !validator.isLength(input, { min, max })) return false;
    if (type === 'password') return true;
    if (!input.trim() || !validator.matches(input, safeRegex)) return false;
    if (type === 'username') return true;
    return false
};

const signAccessToken = (payload) => {
    return jwt.sign(payload, accessTokenSecret, {
        expiresIn: '15m'
    });
};

const signRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenSecret, {
        expiresIn: '7d'
    });
};

const rateCheck = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: { message: 'Too many requests from this address, please try again later' }
});


export {
    isProd,
    isValidInput,
    signAccessToken,
    signRefreshToken,
    rateCheck
};