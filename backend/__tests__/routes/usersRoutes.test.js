vi.mock('../../src/queries/usersQueries');

import express from 'express';
import request from 'supertest';
import { registerUser, authenticateUser } from '../../src/controllers/usersControllers.js';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { createUser } from '../../src/queries/usersQueries.js';

let app;

describe('usersRoutes', () => {
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
