const request = require('supertest');
const {disconnect, connect} = require('../db/connect');
const {app} = require('../app');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});
describe('DELETE /posts', () => {
  it('should return status 401 if there is no ID', async () => {
    const response = await request(app).delete('/posts').send({id: ''});
    expect(response.status).toBe(401);
  });

  it('should return "No Active LoginToken"', async () => {
    const response = await request(app).delete('/posts').send({id: '6433c1c8487'});
    expect(response.body.message).toBe('No Active LoginToken');
  });
});

describe('GET /posts/all/user', () => {
  it('should 401 and "No Active LoginToken" if try to get all user posts while not logged in', async () => {
    const response = await request(app).get('/posts/all/user');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('No Active LoginToken');
  });
});
