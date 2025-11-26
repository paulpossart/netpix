vi.mock('../../src/queries/usersQueries');

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { registerUser, authenticateUser } from '../../src/controllers/usersControllers';
import { createUser } from '../../src/queries/usersQueries';
import * as helpers from '../../src/utils/helpers';

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

        vi.spyOn(helpers, 'sanitiseUser')

        await registerUser(req, res, next);

        expect(createUser).toHaveBeenCalledWith('username', 'password');
        expect(req.logIn).toHaveBeenCalled();
        expect(helpers.sanitiseUser).toHaveBeenCalledWith(req.user);
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

        vi.spyOn(helpers, 'sanitiseUser');

        authenticateUser(req, res);

        expect(req.isAuthenticated).toHaveBeenCalled();
        expect(helpers.sanitiseUser).toHaveBeenCalledWith(req.user);
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
