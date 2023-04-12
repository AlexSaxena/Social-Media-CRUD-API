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
