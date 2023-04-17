const request = require('supertest');
const {disconnect, connect} = require('../db/connect');
const {app} = require('../app');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});

describe('Testing users/follow endpoint', () => {
  describe('PATCH /users/follow with invalid payload', () => {
    it('should respond with status 401 if not logged in', async () => {
      const response = await request(app).patch('/users/follow');
      expect(response.statusCode).toBe(401);
    });
  });
});
