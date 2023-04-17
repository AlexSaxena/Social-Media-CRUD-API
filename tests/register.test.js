const request = require('supertest');
const {disconnect, connect} = require('../db/connect');
const {app} = require('../app');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});

describe('Test User Register Endpoints', () => {
  describe('POST /auth/register with invalid payloads', () => {
    it('should respond with statusCode 406', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'U',
        password: 'CoolPw',
        confirmPassword: 'CoolPW',
      });
      expect(response.status).toBe(406);
    });

    it('should respond that Username must be at least 4 characters', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'U',
        password: 'CoolPw',
        confirmPassword: 'CoolPW',
      });
      expect(response.body.message).toBe('Username should have at least 4 characters');
    });

    it('should respond with "Password is required"', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'User',
      });
      expect(response.body.message).toBe('Password is required');
    });

    it('should respond with "Confirm Password is required"', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'User',
        password: 'CoolPw',
      });
      expect(response.body.message).toBe('Confirm password is required');
    });
  });
});
