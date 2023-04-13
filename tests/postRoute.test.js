const request = require('supertest');
const express = require('express');
const {postRoute} = require('../routes/postRoute');

const app = express();
app.use(express.json());
app.use('/posts', postRoute);

describe('DELETE /posts', () => {
  it('should return status 406 if there is no ID', async () => {
    const response = await request(app).delete('/posts').send({id: ''});
    expect(response.status).toBe(406);
  });

  it('should return ""id" length must be 24 characters long"', async () => {
    const response = await request(app).delete('/posts').send({id: '6433c1c8487'});
    expect(response.body.message).toBe('"id" length must be 24 characters long');
  });
});

describe('GET /posts/all/user', () => {
  it('should 404 and "No Active LoginToken" if try to get all user posts while not logged in', async () => {
    const response = await request('http://localhost:5050').get('/posts/all/user');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('No Active LoginToken');
  });
});
