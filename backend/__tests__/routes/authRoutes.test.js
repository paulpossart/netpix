vi.mock('../../src/queries/userQueries');

import express from 'express';
import request from 'supertest';
import { registerUser, authenticateUser, login, logout, } from '../../src/controllers/authControllers.js';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import passport from '../../src/config/passport';
import { createUser } from '../../src/queries/userQueries.js';

const isProd = process.env.NODE_ENV === 'production'

let app;

describe('authRoutes', () => {
  beforeEach(() => {
    app = express();
    app.use(express.json());
    vi.clearAllMocks();
  });

  describe('POST /register-user', () => {
    beforeEach(() => {
      app.post('/api/auth/register-user', (req, res, next) => {
        req.logIn = vi.fn((user, cb) => {
          req.user = user;
          cb(null);
        });
        registerUser(req, res, next);
      });
    });

    it('returns 201 and a user object on success', async () => {
      createUser.mockResolvedValue({
        id: 1, username: 'username', password_hash: 'hash'
      });

      const res = await request(app)
        .post('/api/auth/register-user')
        .send({ username: 'username', password: 'password', confirmPassword: 'password' })
        .expect(201);

      expect(res.body).toEqual({
        message: 'User created and logged in.',
        user: { id: 1, username: 'username' }
      })
    });

    it('returns 400 on invalid input', async () => {
      await request(app)
        .post('/api/auth/register-user')
        .send({ username: '<username>', password: 'password', confirmPassword: 'pass' })
        .expect(400);
    });
  });

  describe('POST/ login', () => {
    beforeEach(() => {
      app.post('/api/auth/login', (req, res, next) => {
        req.logIn = vi.fn((user, cb) => {
          req.user = user;
          cb(null);
        });
        login(req, res, next);
      });
    });

    it('sends 200 and user object on login scuccess', async () => {
      const mockUser = { id: 1, username: 'username', password_hash: 'hash' };

      vi.spyOn(passport, 'authenticate').mockImplementation((strategy, callback) => {
        return (req, res, next) => {
          callback(null, mockUser, null);
        };
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'username', password: 'password' })
        .expect(200);

      expect(res.body).toEqual({
        message: 'Log in succesful.',
        user: { id: 1, username: 'username' }
      });
    });

    it('sends 401 if !user', async () => {
      const mockInfo = { message: 'Invalid username or password' }

      vi.spyOn(passport, 'authenticate').mockImplementation((strategy, callback) => {
        return (req, res, next) => {
          callback(null, null, mockInfo);
        };
      });

      const res = await request(app)
        .post('/api/auth/login')
        .expect(401);

      expect(res.body).toEqual({ message: 'Invalid username or password' })
    });
  });

  describe('POST /logout', () => {
    let logOutMock = vi.fn(cb => cb(null));
    let destroyMock = vi.fn(cb => cb(null));
    let clearCookieMock = vi.fn();

    beforeEach(() => {
      app.post('/api/auth/logout', (req, res, next) => {
        req.logOut = logOutMock;
        req.session = { destroy: destroyMock };
        res.clearCookie = clearCookieMock;

        logout(req, res, next);
      });
    });

    it('returns 204 on logout', async () => {
      await request(app)
        .post('/api/auth/logout')
        .expect(204)

      expect(logOutMock).toHaveBeenCalled();
      expect(destroyMock).toHaveBeenCalled();
      expect(clearCookieMock).toHaveBeenCalledWith(
        'connect.sid',
        {
          path: '/',
          httpOnly: true,
          secure: isProd,
          sameSite: 'lax'
        }
      );
    });

    it('sends 500 on error', async () => {
      logOutMock.mockImplementation(cb => cb(new Error()));

      await request(app)
        .post('/api/auth/logout')
        .expect(500)
    })
  });

  describe('GET /authenticate-user', () => {
    let mockIsAuthenticated = vi.fn(() => true);
    let mockUser = { id: 1, username: 'username', password_hash: 'hash' }

    beforeEach(() => {
      app.get('/api/auth/authenticate-user', (req, res, next) => {
        req.isAuthenticated = mockIsAuthenticated;
        req.user = mockUser;

        authenticateUser(req, res, next);
      });
    });

    it('sends 200 and user object on authentication', async () => {
      const res = await request(app)
        .get('/api/auth/authenticate-user')
        .expect(200);

      expect(res.body).toEqual({
        message: 'User authenticated.',
        user: { id: 1, username: 'username' }
      });
    });

    it('sends 401 when not authenticated', async () => {
      mockIsAuthenticated = vi.fn(() => false);

      await request(app)
        .get('/api/auth/authenticate-user')
        .expect(401);
    });
  });
});
