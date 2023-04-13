const request = require('supertest');
const {app} = require('../app');

describe('Testing users/follow endpoint', () => {
  describe('PATCH /users/follow with invalid payload', () => {
    it('should respond with status 401 if not logged in', async () => {
      const response = await request(app).patch('/users/follow');
      expect(response.statusCode).toBe(401);
    });
  });
});
