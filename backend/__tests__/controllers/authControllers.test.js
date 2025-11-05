import { describe, it, expect, beforeEach, vi } from 'vitest'
import { registerUser, login, logout, authenticateUser } from '../../src/controllers/authControllers';
import { createUser } from '../../src/queries/userQueries';
import * as authHelpers from '../../src/utils/authHelpers';
import passport from '../../src/config/passport';

const isProd = process.env.NODE_ENV === 'production';

vi.mock('../../src/queries/userQueries');

describe('registerUser', () => {
    let req, res, next;

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        next = vi.fn();
        vi.clearAllMocks();
    });

    it('creates a new user and logs them in', async () => {
        req = {
            body: {
                username: 'username',
                password: 'password',
                confirmPassword: 'password'
            },
            logIn: vi.fn((user, cb) => cb(null)),
            user: { id: 1, username: 'username', password_hash: 'hash' }
        };

        createUser.mockResolvedValue({
            id: 1, username: 'username', password_hash: 'hash'
        });

        vi.spyOn(authHelpers, 'sanitiseUser').mockReturnValue({
            id: 1, username: 'username'
        });

        await registerUser(req, res, next);

        expect(createUser).toHaveBeenCalledWith('username', 'password', 'password');
        expect(req.logIn).toHaveBeenCalled();
        expect(authHelpers.sanitiseUser).toHaveBeenCalledWith(req.user);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User created and logged in.',
            user: { id: 1, username: 'username' },
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('passes the error to next on invalid username', async () => {
        const req = {
            body: {
                username: ' <username> ',
                password: 'password',
                confirmPassword: 'password',
            },
            logIn: vi.fn(),
        };

        await registerUser(req, res, next);

        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Invalid input' }));
        expect(createUser).not.toHaveBeenCalled();
        expect(req.logIn).not.toHaveBeenCalled();
    })

    it('calls next if logIn throws', async () => {
        req = {
            body: {
                username: 'username',
                password: 'password',
                confirmPassword: 'password'
            },
            logIn: vi.fn((user, cb) => cb(new Error('Login failed'))),
        };

        createUser.mockResolvedValue({
            id: 1, username: 'username', password_hash: 'hash'
        });

        await registerUser(req, res, next);

        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Login failed' })
        );
    });
});


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

        vi.spyOn(authHelpers, 'sanitiseUser').mockReturnValue({
            id: 1, username: 'username'
        });

        login(req, res, next);

        expect(req.logIn).toHaveBeenCalledWith(testUser, expect.any(Function));
        expect(authHelpers.sanitiseUser).toHaveBeenCalledWith(req.user);
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


describe('authenticateUser', () => {
    let req, res;

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        vi.clearAllMocks();
    });

    it('sends 200 and a user object on authentication', () => {
        req = {
            isAuthenticated: vi.fn(() => true),
            user: { id: 1, username: 'username', password_hash: 'hash' }
        };

        vi.spyOn(authHelpers, 'sanitiseUser').mockReturnValue({
            id: 1, username: 'username'
        });

        authenticateUser(req, res);

        expect(req.isAuthenticated).toHaveBeenCalled();
        expect(authHelpers.sanitiseUser).toHaveBeenCalledWith(req.user);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User authenticated.',
            user: { id: 1, username: 'username' }
        });
    });

    it('returns 401 when !isAuthenticated', () => {
        req = {
            isAuthenticated: vi.fn(() => false),
        };

        authenticateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Not authenticated.',
        });

    });
});
