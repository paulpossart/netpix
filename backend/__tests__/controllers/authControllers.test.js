vi.mock('../../src/queries/usersQueries');

import { describe, it, expect, beforeEach, vi } from 'vitest'
import {  login, logout } from '../../src/controllers/authControllers';
import * as helpers from '../../src/utils/helpers';
import passport from '../../src/config/passport';

const isProd = process.env.NODE_ENV === 'production';

describe('login', () => {
    let req, res, next;

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        next = vi.fn();
        vi.clearAllMocks();
    });

    it('logs the user in', () => {
        req = {
            body: {
                username: 'username',
                password: 'password',
            },
            logIn: vi.fn((user, cb) => cb(null)),
            user: { id: 1, username: 'username', password_hash: 'hash' }
        };

        const testUser = { id: 1, username: 'username', password: 'password' };

        vi.spyOn(passport, 'authenticate').mockImplementation((strategy, callback) => {
            return (req, res, next) => {
                callback(null, testUser, null);
            };
        });

        vi.spyOn(helpers, 'sanitiseUser');

        login(req, res, next);

        expect(req.logIn).toHaveBeenCalledWith(testUser, expect.any(Function));
        expect(helpers.sanitiseUser).toHaveBeenCalledWith(req.user);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Log in succesful.',
            user: { id: 1, username: 'username' },
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('calls next when authenticate throws', () => {
        req = {
            body: {
                username: 'username',
                password: 'password',
            },
            logIn: vi.fn(),
        };

        vi.spyOn(passport, 'authenticate').mockImplementation((strategy, callback) => {
            return (req, res, next) => {
                callback(new Error('Login failed.'), { username: 'username' }, null);
            };
        });

        login(req, res, next);

        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Login failed.' })
        );
    });
});


describe('logout', () => {
    let req, res, next;

    beforeEach(() => {
        res = {
            clearCookie: vi.fn().mockReturnThis(),
            sendStatus: vi.fn()
        };
        next = vi.fn();
        vi.clearAllMocks();
    });

    it('sends 204 on logout', () => {
        req = {
            session: { destroy: vi.fn(cb => cb(null)) },
            logOut: vi.fn(cb => cb(null)),
        };


        logout(req, res, next);

        expect(req.logOut).toHaveBeenCalled();
        expect(req.session.destroy).toHaveBeenCalled();
        expect(res.clearCookie).toHaveBeenCalledWith('connect.sid', {
            path: '/',
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax'
        });
        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(next).not.toHaveBeenCalled();
    });

    it('calls next when req.logOut throws', () => {
        req = {
            session: { destroy: vi.fn() },
            logOut: vi.fn(cb => cb(new Error('Logout failed.'))),
        };

        logout(req, res, next);

        expect(next).toHaveBeenCalled(
            expect.objectContaining({ message: 'Logout failed.' })
        );
        expect(req.session.destroy).not.toHaveBeenCalled();
        expect(res.sendStatus).not.toHaveBeenCalled();
    });

    it('calls next when session.destroy throws', () => {
        req = {
            session: { destroy: vi.fn(cb => cb(new Error('Destroy failed.'))) },
            logOut: vi.fn(cb => cb(null)),
        };

        logout(req, res, next);

        expect(next).toHaveBeenCalled(
            expect.objectContaining({ message: 'Destroy failed.' })
        );
        expect(res.sendStatus).not.toHaveBeenCalled();
    });
});
