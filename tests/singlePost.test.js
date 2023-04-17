const request = require('supertest');
const {disconnect, connect} = require('../db/connect');
const {app} = require('../app');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});

describe('GET /posts/post with invalid payloads', () => {
  it('should respond with statusCode 406', async () => {
    const response = await request(app).get('/posts/post/').send({
      id: '1337Leet',
    });
    expect(response.status).toBe(401);
  });
});
