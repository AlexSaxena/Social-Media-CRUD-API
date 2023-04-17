const request = require('supertest');
const {disconnect, connect} = require('../db/connect');
const {app} = require('../app');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});

describe('Testing login endpoints', () => {
  describe('POST /auth/login with invalid payload', () => {
    it('should respond with status 400', async () => {
      const response = await request(app).post('/auth/login').send({
        username: 'hej',
        password: 'password123',
      });
      expect(response.statusCode).toBe(400);
    });

    it('should respond with "Password is required"', async () => {
      const response = await request(app).post('/auth/login').send({
        username: 'Janne',
      });
      expect(response.body.message).toBe('Password is required');
    });
  });
});
